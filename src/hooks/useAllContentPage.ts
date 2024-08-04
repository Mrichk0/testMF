import { useQuery } from "react-query";
import { fetchAllContentDetails } from "../utils/api";

interface AllContentDetails {
  translations: {
    title: string;
    description: string;
  }[];
  pageDetails?: {
    translations: {
      title: string;
      description: string;
    }[];
  };
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
