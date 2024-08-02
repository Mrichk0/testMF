import axios from "axios";
import { AllContent, Category, Subcategory, Filters } from "../types";

const API_URL = "http://0.0.0.0:8055";

interface SubcategoryTranslation {
  languages_code: string;
  subcategory_name: string;
}

export const getSubcategoryTranslations = async (
  subcategoryId: number
): Promise<SubcategoryTranslation[]> => {
  try {
    const response = await axios.get(`${API_URL}/items/subcategories`, {
      params: {
        filter: { id: { _eq: subcategoryId } },
        fields: ["id", "translations.*"],
      },
    });

    console.log("Subcategory translations response:", response.data);

    if (response.data.data && response.data.data.length > 0) {
      const subcategory = response.data.data[0];
      return subcategory.translations.map((translation: any) => ({
        languages_code: translation.languages_code,
        subcategory_name: translation.subcategory_name,
      }));
    } else {
      console.warn(
        `No translations found for subcategory with id ${subcategoryId}`
      );
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching translations for subcategory ${subcategoryId}:`,
      error
    );
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
          fields: ["id", "translations.*"],
        },
      }),
      axios.get(`${API_URL}/items/subcategories`, {
        params: {
          fields: ["id", "translations.*", "categories.categories_id"],
        },
      }),
    ]);

    console.log("API responses:", {
      categories: categoriesResponse.data,
      subcategories: subcategoriesResponse.data,
    });

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
  filters: Filters;
  selectedYear: number | null;
}

// export const fetchFilteredAllContent = async ({
//   pageParam = 1,
//   categoryId,
//   subcategoryIds,
//   filters,
//   selectedYear,
// }: FetchFilteredAllContentParams): Promise<{
//   data: AllContent[];
//   nextPage: number | undefined;
//   totalItems: number;
// }> => {
//   const limit = 10;
//   let params: any = {
//     fields: [
//       "id",
//       "translations.*",
//       "start_date",
//       "end_date",
//       "year",
//       "photo.*",
//       "video",
//       "audio",
//       "category.id",
//       "category.translations.*",
//       "subcategories.subcategories_id",
//       "subcategories.translations.*",
//       "is_current",
//       "slug",
//     ],
//     sort: ["-start_date"],
//     page: pageParam,
//     limit: limit,
//   };

//   if (
//     categoryId ||
//     subcategoryIds.length > 0 ||
//     Object.values(filters).some(Boolean) ||
//     selectedYear
//   ) {
//     params.filter = {
//       _and: [],
//     };

//     if (selectedYear) {
//       params.filter._and.push({
//         year: {
//           _eq: selectedYear,
//         },
//       });
//     }

//     if (categoryId) {
//       params.filter._and.push({
//         category: {
//           id: {
//             _eq: categoryId,
//           },
//         },
//       });
//     }

//     if (subcategoryIds.length > 0) {
//       params.filter._and.push({
//         subcategories: {
//           subcategories_id: {
//             _in: subcategoryIds,
//           },
//         },
//       });
//     }

//     if (filters.hasVideo) {
//       params.filter._and.push({ video: { _nnull: true } });
//     }
//     if (filters.hasAudio) {
//       params.filter._and.push({ audio: { _nnull: true } });
//     }
//     if (filters.hasPhoto) {
//       params.filter._and.push({ photo: { _nnull: true } });
//     }
//   }

//   if (params.filter && params.filter._and.length === 0) {
//     delete params.filter;
//   }

//   try {
//     const response = await axios.get(`${API_URL}/items/allContent`, {
//       params,
//     });

//     return {
//       data: response.data.data,
//       nextPage: response.data.data.length === limit ? pageParam + 1 : undefined,
//       totalItems: response.data.meta?.total_count || response.data.data.length,
//     };
//   } catch (error) {
//     console.error("Error fetching all content:", error);
//     throw error;
//   }
// };

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
      "translations.*",
      "start_date",
      "end_date",
      "year",
      "photo.*",
      "video",
      "audio",
      "category.id",
      "category.translations.*",
      "subcategories.subcategories_id",
      "subcategories.translations.*",
      "slug",
    ],
    sort: ["-start_date"],
    page: pageParam,
    limit: limit,
  };

  if (
    categoryId ||
    subcategoryIds.length > 0 ||
    Object.values(filters).some(Boolean) ||
    selectedYear
  ) {
    params.filter = {
      _and: [],
    };

    if (selectedYear) {
      params.filter._and.push({
        year: {
          _eq: selectedYear,
        },
      });
    }

    if (categoryId) {
      params.filter._and.push({
        category: {
          id: {
            _eq: categoryId,
          },
        },
      });
    }

    if (subcategoryIds.length > 0) {
      params.filter._and.push({
        subcategories: {
          subcategories_id: {
            _in: subcategoryIds,
          },
        },
      });
    }

    if (filters.hasVideo) {
      params.filter._and.push({ video: { _nnull: true } });
    }
    if (filters.hasAudio) {
      params.filter._and.push({ audio: { _nnull: true } });
    }
    if (filters.hasPhoto) {
      params.filter._and.push({ photo: { _nnull: true } });
    }
    if (filters.isActual !== null) {
      const now = new Date().toISOString();
      params.filter._and.push({
        end_date: filters.isActual ? { _gte: now } : { _lt: now },
      });
    }
  }

  if (params.filter && params.filter._and.length === 0) {
    delete params.filter;
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

////////////////-------------------------------
export const fetchCourseDetails = async (slug: string) => {
  try {
    const allContentResponse = await axios.get(`${API_URL}/items/allContent`, {
      params: {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: [
          "id",
          "translations.*",
          "slug",
          "category.id",
          "category.translations.*",
        ],
      },
    });

    const allContentData = allContentResponse.data.data[0];

    const pagesResponse = await axios.get(`${API_URL}/items/pages`, {
      params: {
        filter: {
          collection_slug: {
            _eq: slug,
          },
        },
        fields: ["id", "slug"],
      },
    });

    const pagesData = pagesResponse.data.data[0];

    const mergedData = {
      ...allContentData,
      pageDetails: pagesData,
    };

    return mergedData;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

/////////////////////////GOOD

// export const searchAllContent = async (
//   searchQuery: string
// ): Promise<AllContent[]> => {
//   console.log("searchAllContent called with query:", searchQuery);

//   if (searchQuery.length < 2) {
//     console.log("Search query too short, returning empty array");
//     return [];
//   }

//   // Split the query into words
//   const queryWords = searchQuery.toLowerCase().split(/\s+/);
//   console.log("Query words:", queryWords);

//   const params = {
//     fields: [
//       "id",
//       "translations.*",
//       "category.id",
//       "category.translations.*",
//       "video",
//       "is_current",
//       "start_date",
//       "end_date",
//       "slug",
//     ],
//     filter: {
//       _and: queryWords.map((word) => ({
//         _or: [
//           {
//             translations: {
//               title: {
//                 _icontains: word,
//               },
//             },
//           },
//           {
//             translations: {
//               description: {
//                 _icontains: word,
//               },
//             },
//           },
//         ],
//       })),
//     },
//     limit: 10,
//   };

//   console.log("API request params:", JSON.stringify(params, null, 2));

//   try {
//     console.log("Sending request to:", `${API_URL}/items/allContent`);
//     const response = await axios.get(`${API_URL}/items/allContent`, { params });
//     console.log("API response:", response.data);
//     return response.data.data;
//   } catch (error) {
//     console.error("Error searching content:", error);
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error details:", error.response?.data);
//     }
//     throw error;
//   }
// };
////////////////////////////////////////

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
      "category.translations.*",
      "subcategories.subcategories_id",
      "subcategories.translations.*",
      "video",
      "is_current",
      "start_date",
      "end_date",
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
