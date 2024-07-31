import { useTranslation } from "react-i18next";

export const useTranslatedContent = () => {
  const { i18n } = useTranslation();

  const getTranslation = (item: any, field: string) => {
    if (!item || !Array.isArray(item.translations)) {
      console.warn("Item or translations array is missing", { item, field });
      return "Translation not available";
    }

    const translation =
      item.translations.find((t: any) => t.languages_code === i18n.language) ||
      item.translations.find((t: any) => t.languages_code === "uk");

    if (!translation) {
      console.warn("Translation not found", {
        item,
        field,
        language: i18n.language,
      });
      return "Translation not available";
    }

    return translation[field] || "Field not found";
  };

  return { getTranslation };
};
