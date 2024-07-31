import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from "../utils/api";

const DetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [detailsPage, setDetailsPage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourseDetails(slug);
        setDetailsPage(data);
      } catch (err) {
        setError("Error fetching course details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  console.log("courseDetails:", setDetailsPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{detailsPage.translations[0].title}</h1>
      <p>{detailsPage.translations[0].description}</p>
      {detailsPage.pageDetails && (
        <div>
          <h2>Additional Info</h2>
          <p>{detailsPage.pageDetails.translations[0].title}</p>
          <p>{detailsPage.pageDetails.translations[0].description}</p>
        </div>
      )}
      {/* Render other fields as needed */}
    </div>
  );
};

export default DetailsPage;
