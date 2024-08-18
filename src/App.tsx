import React from "react";
import { Route, Routes, useParams } from "react-router-dom";

import Header from "./components/Header/Header";
import AllContentList from "./components/AllContent/AllContentList/AllContentList";
import DictionaryPage from "./pages/DictionaryPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import { CategoryProvider } from "./components/Header/Categories/CategoryContext";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

const DetailsPageWrapper: React.FC = () => {
  const { categorySlug, slug } = useParams();

  return <DetailsPage categorySlug={categorySlug} slug={slug} />;
};

const App: React.FC = () => {
  return (
    <CategoryProvider>
      <div className="app">
        <Header />
        <LanguageSwitcher />
        <Routes>
          <Route path="/" element={<AllContentList />} />
          <Route path="/:categorySlug" element={<AllContentList />} />
          <Route path="/:categorySlug/:slug" element={<DetailsPageWrapper />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
        </Routes>
      </div>
    </CategoryProvider>
  );
};

export default App;
