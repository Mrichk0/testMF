import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";
import useAllContentDetails from "../../hooks/useAllContentPage";
import SaveContentButton from "../../components/Buttons/SaveButton/SaveContentButton";
import { useTranslation } from "react-i18next";

interface DetailsPageProps {
  categorySlug?: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ categorySlug }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const { data: detailsPage, error, isLoading } = useAllContentDetails(slug);

  React.useEffect(() => {
    if (!categorySlug || !slug) {
      navigate("/");
    }
  }, [categorySlug, slug, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!detailsPage) return <div>No data available</div>;

  const { translations, pageDetails } = detailsPage;

  return (
    <div className={styles.details}>
      <button onClick={() => navigate("/")}>{t("join us")}</button>
      <SaveContentButton content={detailsPage} />
      <h1>{translations[0]?.title}</h1>
      <p>{translations[0]?.description}</p>
      {pageDetails && (
        <div>
          <h2>Additional Info</h2>
          <p>{pageDetails.translations[0]?.title}</p>
          <p>{pageDetails.translations[0]?.description}</p>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
