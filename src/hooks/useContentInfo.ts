// import { useCallback } from "react";
// import { useTranslation } from "react-i18next";

// export const useContentInfo = () => {
//   const { t } = useTranslation();

//   const getContentInfo = useCallback(
//     (content: any) => {
//       const contentTypes = [];
//       if (content.video) contentTypes.push(t("video"));
//       if (content.photo) contentTypes.push(t("photo"));
//       if (content.audio) contentTypes.push(t("audio"));
//       return contentTypes.join(", ");
//     },
//     [t]
//   );

//   return { getContentInfo };
// };
