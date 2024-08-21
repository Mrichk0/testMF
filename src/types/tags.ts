export interface TagTranslation {
  id: number;
  tags_id: string;
  languages_code: string;
  tag: string;
}

export interface Tag {
  id: string;
  sort: number | null;
  tag_name: string;
  translations: TagTranslation[];
  tags_id: {
    id: string | number;
  };
}

export interface TagsResponse {
  data: Tag[];
}
