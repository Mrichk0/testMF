import { useQuery } from "react-query";
import { fetchTags } from "../utils/api";
import { Tag } from "../types/tags";

export const useTags = () => {
  return useQuery<Tag[], Error>(["tags"], fetchTags);
};
