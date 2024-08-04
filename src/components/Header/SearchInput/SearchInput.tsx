import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { searchAllContent } from "../../../utils/api";
import { AllContent } from "../../../types";
import Dropdown from "../../Dropdown/Dropdown";
import styles from "./SearchInput.module.css";

const SearchInput: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AllContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { t } = useTranslation();

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.length >= 2) {
        setIsLoading(true);
        setError(null);
        try {
          const results = await searchAllContent(value);
          setSearchResults(results);
          setIsDropdownOpen(true);
        } catch (error) {
          setError(t("searchError"));
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setError(null);
        setIsDropdownOpen(false);
      }
    }, 300),
    [t]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className={styles.searchInputContainer}>
      <input
        type="text"
        placeholder={t("searchContent")}
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {isLoading && <div className={styles.loadingMessage}>{t("loading")}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <Dropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        title={t("searchResults")}
        items={searchResults}
        groupByCategory={true}
      />
    </div>
  );
};

export default SearchInput;
