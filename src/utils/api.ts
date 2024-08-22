import axios from "axios";
import { AllContent } from "../types";
import { Category, Subcategory } from "../types/categories";
import { Tag } from "../types/tags";

const API_URL = import.meta.env.VITE_API_URL || "http://0.0.0.0:8055";

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await axios.get(`${API_URL}/items/tags`, {
      params: {
        fields: ["translations.*", "*.*"],
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const fetchCategoriesAndCourses = async (): Promise<{
  categories: Category[];
  subcategories: Subcategory[];
}> => {
  try {
    const [categoriesResponse, subcategoriesResponse] = await Promise.all([
      axios.get(`${API_URL}/items/categories`, {
        params: {
          fields: ["id", "translations.*", "slug"],
        },
      }),
      axios.get(`${API_URL}/items/subcategories`, {
        params: {
          fields: ["id", "translations.*", "categories.categories_id"],
        },
      }),
    ]);

    return {
      categories: categoriesResponse.data.data,
      subcategories: subcategoriesResponse.data.data,
    };
  } catch (error) {
    console.error("Error fetching categories and subcategories:", error);
    throw error;
  }
};

export interface FetchFilteredAllContentParams {
  pageParam?: number;
  categoryId: string | null;
  subcategoryIds: string[];
  filters: any;
  selectedYear: number | null;
}

export const fetchFilteredAllContent = async ({
  pageParam = 1,
  categoryId,
  subcategoryIds,
  filters,
  selectedYear,
}: FetchFilteredAllContentParams): Promise<{
  data: AllContent[];
  nextPage: number | undefined;
  totalItems: number;
}> => {
  const limit = 10;
  let params: any = {
    fields: [
      "id",
      "date_created",
      "translations.*",
      "archive",
      "years",
      "years.years_id.year",
      "cover",
      "category.id",
      "category.translations.*",
      "category.slug",
      "subcategories.subcategories_id",
      "subcategories.subcategories_id.translations.*",
      "subcategories.translations.*",
      "tags.tags_id.translations.*",
      "tags.tags_id",
      "tags.translations.*",
      "slug",
    ],
    sort: ["-date_created"],
    page: pageParam,
    limit: limit,
  };

  let filterConditions = [];

  if (selectedYear) {
    filterConditions.push({
      years: {
        years_id: {
          year: {
            _eq: selectedYear,
          },
        },
      },
    });
  }

  if (categoryId) {
    filterConditions.push({
      category: {
        id: {
          _eq: categoryId,
        },
      },
    });
  }

  if (subcategoryIds.length > 0) {
    filterConditions.push({
      subcategories: {
        subcategories_id: {
          _in: subcategoryIds,
        },
      },
    });
  }

  if (filters) {
    if (filters.archiveStatus === "current") {
      filterConditions.push({ archive: { _null: true } });
    } else if (filters.archiveStatus === "archive") {
      filterConditions.push({ archive: { _nnull: true } });
    }

    const activeTagIds = Object.entries(filters)
      .filter(([key, value]) => key !== "archiveStatus" && value)
      .map(([key]) => key);

    if (activeTagIds.length > 0) {
      filterConditions.push({
        tags: {
          tags_id: {
            id: {
              _in: activeTagIds,
            },
          },
        },
      });
    }
  }

  if (filterConditions.length > 0) {
    params.filter = {
      _and: filterConditions,
    };
  }

  try {
    const response = await axios.get(`${API_URL}/items/allContent`, {
      params,
    });

    return {
      data: response.data.data,
      nextPage: response.data.data.length === limit ? pageParam + 1 : undefined,
      totalItems: response.data.meta?.total_count || response.data.data.length,
    };
  } catch (error) {
    console.error("Error fetching all content:", error);
    throw error;
  }
};

export const fetchAllContentDetails = async (slug: string) => {
  try {
    const pagesResponse = await axios.get(`${API_URL}/items/allContent`, {
      params: {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: [
          "slug",
          "status",
          "translations.*",
          "template.*",
          "template.translations.*",
        ],
      },
    });

    const pagesData = pagesResponse.data.data[0];

    return pagesData;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const searchAllContent = async (
  searchQuery: string
): Promise<AllContent[]> => {
  if (searchQuery.length < 2) {
    return [];
  }

  const params = {
    fields: [
      "id",
      "translations.*",
      "category.id",
      "category.slug",
      "category.translations.*",
      "subcategories.subcategories_id.translations.*",
      "subcategories.subcategories_id",
      "subcategories.translations.*",
      "tags.tags_id.translations.*",
      "tags.tags_id",
      "tags.translations.*",
      // "start_date",
      // "end_date",
      "slug",
    ],
    filter: {
      _or: [
        {
          translations: {
            title: {
              _contains: searchQuery,
            },
          },
        },
        {
          translations: {
            description: {
              _contains: searchQuery,
            },
          },
        },
      ],
    },
    limit: 10,
  };

  try {
    const response = await axios.get(`${API_URL}/items/allContent`, { params });

    return response.data.data;
  } catch (error) {
    console.error("Error searching content:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
    }
    throw error;
  }
};
