export interface AllContent {
  id: number;
  status: string;
  sort: number | null;
  date_created: string;
  date_updated: string | null;
  slug: string;
  start_date: string;
  end_date: string;
  year: number;
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
  photo: {
    id: string;
  } | null;
  translations: {
    id: number;
    allContent_id: number;
    languages_code: string;
    title: string;
    description: string;
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
