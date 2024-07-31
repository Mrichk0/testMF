// export interface Category {
//   id: string;
//   translations: {
//     name: string;
//   }[];
// }

// export interface Subcategory {
//   id: string;
//   translations: {
//     name: string;
//   }[];
//   categories: { categories_id: string }[];
// }

// export interface Filters {
//   hasVideo: boolean;
//   hasAudio: boolean;
//   hasPhoto: boolean;
//   isActual: boolean | null;
// }

// export interface Course {
//   id: number;
//   status: string;
//   sort: number | null;
//   date_created: string;
//   date_updated: string | null;
//   slug: string;
//   start_date: string;
//   end_date: string;
//   year: number;
//   category: Category;
//   audio: string | null;
//   video: string | null;
//   photo: Photo | null;
//   translations: Translation[];
//   subcategories: Subcategory[];
// }

// export interface AllContent {
//   id: number;
//   slug: string;
//   start_date: string;
//   end_date: string;
//   year: number;
//   category: {
//     id: string;
//     translations: { languages_code: string; title: string }[];
//   };
//   subcategories: {
//     subcategories_id: number;
//     translations: { languages_code: string; title: string }[];
//   }[];
//   audio: string | null;
//   video: string | null;
//   photo: { id: string } | null;
//   translations: {
//     languages_code: string;
//     title: string;
//     description: string;
//   }[];
//   is_current: boolean;
// }

// export interface AllContent {
//   id: number;
//   slug: string;
//   translations: {
//     languages_code: string;
//     title: string;
//     description: string;
//   }[];
//   category?: {
//     id: string;
//     translations: {
//       languages_code: string;
//       title: string;
//     }[];
//   };
//   subcategories?: {
//     subcategories_id: number;
//     translations: {
//       languages_code: string;
//       title: string;
//     }[];
//   }[];
//   video: string | null;
//   photo: string | null;
//   audio: string | null;
//   is_current: boolean;
//   start_date: string;
//   end_date: string;
// }

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
    translations: number[];
  };
  audio: any | null;
  video: any | null;
  photo: {
    id: string;
    // ... other photo fields
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
}

export interface FetchFilteredAllContentParams {
  pageParam?: number;
  categoryId: string | null;
  subcategoryIds: string[];
  filters: Filters;
  selectedYear: number | null;
}
