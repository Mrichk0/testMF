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

export interface Filters {
  hasVideo: boolean;
  hasAudio: boolean;
  hasPhoto: boolean;
  isActual?: boolean;
}

export interface FetchFilteredAllContentParams {
  pageParam?: number;
  categoryId: string | null;
  subcategoryIds: string[];
  filters: Filters;
  selectedYear: number | null;
}
