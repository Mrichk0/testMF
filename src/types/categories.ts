export interface Category {
  id: string;
  category_name: string;
  slug: string;
  translations: {
    languages_code: string;
    category_name: string;
  }[];
}

export interface Subcategory {
  id: string;
  subcategory_name: string;
  categories: SubcategoryCategory[];
}

export interface SubcategoryCategory {
  categories_id: string;
}

export interface CategoriesData {
  categories: Category[];
  subcategories: Subcategory[];
}
