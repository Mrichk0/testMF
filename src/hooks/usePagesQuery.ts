import { useQuery } from "react-query";
import axios from "axios";

interface Translation {
  id: number;
  pages_slug: string;
  languages_code: string;
  title: string;
  description: string;
}

interface TemplateTile {
  id: string;
  title: string | null;
  image: string | null;
  description: string | null;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  sort: number | null;
  page: string;
  video_url: string | null;
  type: string;
  translations: number[];
}

interface Page {
  slug: string;
  status: string;
  sort: number | null;
  date_created: string;
  date_updated: string;
  translations: Translation[];
  template: TemplateTile[];
}

const fetchPages = async (): Promise<Page[]> => {
  const { data } = await axios.get(
    "http://0.0.0.0:8055/items/pages?fields=*.*"
  );
  return data.data;
};

export const usePagesQuery = () => {
  return useQuery<Page[], Error>("pages", fetchPages);
};
