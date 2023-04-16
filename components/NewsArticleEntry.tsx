import { NewsArticle } from "@/modals/Article";
import Image from "next/image";
import { Card } from "react-bootstrap";
import placeholderImage from "@/assets/images/newsarticle_placeholder.png";
import styles from "@/styles/newsArticleEntry.module.css";

interface NewsArticleEntryProps {
  article: NewsArticle;
}

const NewsArticleEntry = ({
  article: { title, description, url, urlToImage, publishedAt, author },
}: NewsArticleEntryProps) => {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  return (
    <a href={url} target="_blank">
      <Card className="h-100">
        <Image
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          alt="news article image"
          className={`card-img-top ${styles.image}`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </a>
  );
};

export default NewsArticleEntry;
