// import { useState, useEffect } from "react";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../types";

// export const useSavedContent = () => {
//   const [savedContentIds, setSavedContentIds] = useLocalStorage<number[]>(
//     "savedContentIds",
//     []
//   );
//   const [savedContent, setSavedContent] = useState<AllContent[]>([]);

//   const addSavedContent = (content: AllContent) => {
//     setSavedContentIds((prev) => {
//       if (!prev.includes(content.id)) {
//         return [...prev, content.id];
//       }
//       return prev;
//     });
//   };

//   const removeSavedContent = (id: number) => {
//     setSavedContentIds((prev) => prev.filter((contentId) => contentId !== id));
//   };

//   useEffect(() => {
//     // Here you would fetch the full content details for the saved IDs
//     // This is a placeholder for the actual API call
//     const fetchSavedContent = async () => {
//       // Simulating an API call
//       const fetchedContent = await Promise.all(
//         savedContentIds.map((id) =>
//           // Replace this with your actual API call
//           fetch(`/api/content/${id}`).then((res) => res.json())
//         )
//       );
//       setSavedContent(fetchedContent);
//     };

//     fetchSavedContent();
//   }, [savedContentIds]);

//   return { savedContent, addSavedContent, removeSavedContent, savedContentIds };
// };
// import { useState, useEffect } from "react";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../types";

// export const useSavedContent = () => {
//   const [savedContentIds, setSavedContentIds] = useLocalStorage<number[]>(
//     "savedContentIds",
//     []
//   );
//   const [savedContent, setSavedContent] = useState<AllContent[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const addSavedContent = (content: AllContent) => {
//     setSavedContentIds((prev) => {
//       if (!prev.includes(content.id)) {
//         return [...prev, content.id];
//       }
//       return prev;
//     });
//   };

//   const removeSavedContent = (id: number) => {
//     setSavedContentIds((prev) => prev.filter((contentId) => contentId !== id));
//   };

//   useEffect(() => {
//     const fetchSavedContent = async () => {
//       try {
//         // Simulating an API call
//         const fetchedContent = await Promise.all(
//           savedContentIds.map(async (id) => {
//             const response = await fetch(`/api/content/${id}`);
//             if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const text = await response.text(); // Get the response as text first
//             try {
//               return JSON.parse(text); // Try to parse it as JSON
//             } catch (e) {
//               console.error(`Failed to parse JSON for id ${id}:`, text);
//               throw new Error(`Invalid JSON received for id ${id}`);
//             }
//           })
//         );
//         setSavedContent(fetchedContent);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching saved content:", err);
//         setError("Failed to fetch saved content. Please try again later.");
//         setSavedContent([]);
//       }
//     };

//     fetchSavedContent();
//   }, [savedContentIds]);

//   return {
//     savedContent,
//     addSavedContent,
//     removeSavedContent,
//     savedContentIds,
//     error,
//   };
// };

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
