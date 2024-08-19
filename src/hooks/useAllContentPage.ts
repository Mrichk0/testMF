import { useQuery } from "react-query";
import { fetchAllContentDetails } from "../utils/api";

interface Translation {
  id: number;
  pages_slug: string;
  languages_code: string;
  title: string;
  description: string;
}

interface TileTranslation {
  id: number;
  tiles_id: string;
  languages_code: string;
  text: string;
}

export interface Template {
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
  translations: TileTranslation[];
}

interface Page {
  slug: string;
  status: string;
  sort: number | null;
  date_created: string;
  date_updated: string;
  translations: Translation[];
  template: Template[];
}

interface AllContentDetails {
  translations: Translation[];
  pageDetails?: Page;
  template: Template[];
}

const useAllContentDetails = (slug: string | undefined) => {
  return useQuery<AllContentDetails, Error>(
    ["courseDetails", slug],
    () => fetchAllContentDetails(slug as string),
    {
      enabled: !!slug,
    }
  );
};

export default useAllContentDetails;
