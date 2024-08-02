// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Header from "./components/Header/Header";

// import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

// import styles from "./App.module.css";
// import DetailsPage from "./pages/DetailsPage";
// import AllContentList from "./components/AllContent/AllContentList/AllContentList";

// const App: React.FC = () => {
//   return (
//     <div className="app">
//       <div className={styles.headerWrapper}>
//         <Header />
//         <LanguageSwitcher />
//       </div>
//       <Routes>
//         <Route path="/" element={<AllContentList />} />
//         <Route path="/course/:slug" element={<DetailsPage />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import styles from "./App.module.css";
import DetailsPage from "./pages/DetailsPage";
import AllContentList from "./components/AllContent/AllContentList/AllContentList";
import { CategoryProvider } from "./components/Header/Categories/CategoryContext";

const App: React.FC = () => {
  return (
    <CategoryProvider>
      <div className="app">
        <div className={styles.headerWrapper}>
          <Header />
          <LanguageSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<AllContentList />} />
          <Route path="/course/:slug" element={<DetailsPage />} />
        </Routes>
      </div>
    </CategoryProvider>
  );
};

export default App;
