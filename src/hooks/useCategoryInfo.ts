// import { useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import { getSubcategoryTranslations } from "../utils/api";

// export const useCategoryInfo = () => {
//   const { t, i18n } = useTranslation();

//   const getCategoryInfo = useCallback(
//     async (content: any) => {
//       let categoryName = t("uncategorized");
//       if (content.category && content.category.translations) {
//         const categoryTranslation =
//           content.category.translations.find(
//             (trans: any) => trans.languages_code === i18n.language
//           ) || content.category.translations[0];

//         if (categoryTranslation) {
//           categoryName = categoryTranslation.category_name;
//         } else {
//           categoryName = content.category.slug;
//         }
//       }

//       let subcategoryNames: string[] = [];
//       if (
//         Array.isArray(content.subcategories) &&
//         content.subcategories.length > 0
//       ) {
//         for (const sub of content.subcategories) {
//           try {
//             const subTranslations = await getSubcategoryTranslations(
//               sub.subcategories_id
//             );
//             const subTranslation =
//               subTranslations.find(
//                 (trans: any) => trans.languages_code === i18n.language
//               ) || subTranslations[0];

//             if (subTranslation) {
//               subcategoryNames.push(subTranslation.subcategory_name);
//             } else {
//               subcategoryNames.push(`Subcategory ${sub.subcategories_id}`);
//             }
//           } catch (error) {
//             console.error(
//               `Error fetching subcategory ${sub.subcategories_id} translations:`,
//               error
//             );
//             subcategoryNames.push(`Subcategory ${sub.subcategories_id}`);
//           }
//         }
//       }

//       return `${categoryName}${
//         subcategoryNames.length > 0 ? ` / ${subcategoryNames.join(", ")}` : ""
//       }`;
//     },
//     [t, i18n.language]
//   );

//   return { getCategoryInfo };
// };
