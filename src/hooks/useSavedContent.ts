import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";
import { AllContent } from "../types";

const API_URL = "http://0.0.0.0:8055"; // Replace with your actual Directus API URL

export const useSavedContent = () => {
  const [savedContentIds, setSavedContentIds] = useLocalStorage<number[]>(
    "savedContentIds",
    []
  );
  const [savedContent, setSavedContent] = useState<AllContent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addSavedContent = (content: AllContent) => {
    setSavedContentIds((prev) => {
      if (!prev.includes(content.id)) {
        return [...prev, content.id];
      }
      return prev;
    });
  };

  const removeSavedContent = (id: number) => {
    setSavedContentIds((prev) => prev.filter((contentId) => contentId !== id));
  };

  useEffect(() => {
    const fetchSavedContent = async () => {
      if (savedContentIds.length === 0) {
        setSavedContent([]);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/items/allContent`, {
          params: {
            fields: "*.*",
            filter: {
              id: {
                _in: savedContentIds,
              },
            },
          },
        });

        setSavedContent(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching saved content:", err);
        setError("Failed to fetch saved content. Please try again later.");
        setSavedContent([]);
      }
    };

    fetchSavedContent();
  }, [savedContentIds]);

  return {
    savedContent,
    addSavedContent,
    removeSavedContent,
    savedContentIds,
    error,
  };
};
