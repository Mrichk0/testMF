import { useTranslation } from "react-i18next";

import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "uk" ? "en" : "uk";
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className={styles.btn}>
      {i18n.language === "uk" ? "EN" : "UK"}
    </button>
  );
};

export default LanguageSwitcher;
