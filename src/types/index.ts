import { Tag } from "./tags";

export interface Filters {
  searchQuery?: string;
  archiveStatus: "current" | "archive" | null;
  [key: string]: boolean | string | "current" | "archive" | null | undefined;
}

export interface Year {
  years_id: {
    [key: string]: any;
  };
  year: number;
}

export interface AllContent {
  id: number;
  status: string;
  sort: number | null;
  date_created: string;
  date_updated: string | null;
  slug: string;
  start_date: string;
  end_date: string;
  archive: boolean;
  years: Year[];
  cover: string | null;
  tags: Tag[];
  category: {
    id: string;
    sort: number;
    slug: string;
    translations: {
      languages_code: string;
      category_name: string;
    }[];
  };
  audio: any | null;
  video: any | null;
  translations: {
    tags: string[] | null;
    id: number;
    allContent_id: number;
    languages_code: string;
    title: string;
    description: string;
    date_tag: string | null;
  }[];
  subcategories: {
    id: number;
    allContent_id: number;
    subcategories_id: number;
  }[];
  is_current?: boolean;
}

export interface AllContentItemProps {
  allContent: AllContent;
  onSave: (content: AllContent) => void;
  onProgramClick: (slug: string) => void;
  isSaved: boolean;
}

export interface FetchFilteredAllContentParams {
  pageParam?: number;
  categoryId: string | null;
  subcategoryIds: string[];
  filters: Filters;
  selectedYear: number | null;
}

export interface FilterState {
  filters: Filters;
  selectedCategory: string | null;
  selectedSubcategories: string[];
  selectedYear: number | null;
}

export interface FilterActions {
  handleFilterChange: (filterName: string, value: boolean) => void;
  handleArchiveChange: (value: "current" | "archive" | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedSubcategories: (subcategories: string[]) => void;
  setSelectedYear: (year: number | null) => void;
  clearAllFilters: () => void;
}

export interface UseFiltersReturn extends FilterState, FilterActions {}
