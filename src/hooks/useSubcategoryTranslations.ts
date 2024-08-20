import { useQuery, UseQueryResult } from "react-query";
import { getSubcategoryTranslations } from "../utils/api";
import { SubcategoryTranslation } from "../types";

export const useSubcategoryTranslations = (
  subcategoryIds: number[]
): UseQueryResult<SubcategoryTranslation[][], unknown> => {
  return useQuery(
    ["subcategoryTranslations", subcategoryIds],
    () =>
      Promise.all(subcategoryIds.map((id) => getSubcategoryTranslations(id))),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};
