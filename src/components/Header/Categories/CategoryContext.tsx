import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

interface CategoryContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useLocalStorage<
    string | null
  >("selectedCategory", null);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
