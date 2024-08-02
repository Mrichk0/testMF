import { useEffect } from "react";
import { useCategory } from "../components/Header/Categories/CategoryContext";

export const usePageCategory = (categoryId: string | null) => {
  const { setSelectedCategory } = useCategory();

  useEffect(() => {
    setSelectedCategory(categoryId);

    // Cleanup function to reset the category when the component unmounts
    return () => {
      setSelectedCategory(null);
    };
  }, [categoryId, setSelectedCategory]);
};
