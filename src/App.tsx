import React, { Suspense } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header/Header";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import { CategoryProvider } from "./components/Header/Categories/CategoryContext";

const AllContentList = React.lazy(
  () => import("./components/AllContent/AllContentList/AllContentList")
);
const DictionaryPage = React.lazy(() => import("./pages/DictionaryPage"));
const DetailsPage = React.lazy(() => import("./pages/DetailsPage/DetailsPage"));

const DetailsPageWrapper: React.FC = () => {
  const { categorySlug, slug } = useParams<{
    categorySlug: string;
    slug: string;
  }>();

  return <DetailsPage categorySlug={categorySlug} slug={slug} />;
};

const App: React.FC = () => {
  return (
    <CategoryProvider>
      <div className="app">
        <Header />
        <LanguageSwitcher />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<AllContentList />} />
            <Route path="/:categorySlug" element={<AllContentList />} />
            <Route
              path="/:categorySlug/:slug"
              element={<DetailsPageWrapper />}
            />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </CategoryProvider>
  );
};

export default App;
