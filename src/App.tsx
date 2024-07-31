import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CourseList from "./components/AllContent/AllContentList/AllContentList";
import YearsList from "./components/YearsList/YearsList";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

import styles from "./App.module.css";
import DetailsPage from "./pages/DetailsPage";

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <div className={styles.header}>
        <Header />
        <LanguageSwitcher />
      </div>

      <YearsList />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:slug" element={<DetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
