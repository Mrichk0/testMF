import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";

const API_URL = "http://0.0.0.0:8055";

export const useSavedContent = () => {
  const [savedContentIds, setSavedContentIds] = useLocalStorage<number[]>(
    "savedContentIds",
    []
  );
  const [savedContent, setSavedContent] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addSavedContent = (content: any) => {
    if (!content || typeof content.id === "undefined") {
      console.error("Invalid content object:", content);
      return;
    }
    setSavedContentIds((prev) => {
      if (!prev.includes(content.id)) {
        return [...prev, content.id];
      }
      return prev;
    });
    setSavedContent((prev) => [...prev, content]);
  };

  const removeSavedContent = (id: number) => {
    setSavedContentIds((prev) => prev.filter((contentId) => contentId !== id));
    setSavedContent((prev) => prev.filter((content) => content.id !== id));
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
