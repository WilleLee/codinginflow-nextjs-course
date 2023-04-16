import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/modals/Article";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface CategoryPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const paths = categorySlugs.map((slug) => ({
    params: {
      category: slug,
    },
  }));
  return {
    paths,
    fallback: false, // 일치하는 정보가 없으면 404 페지 보여주세요.
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&category=${category}`;
  const response = await fetch(apiUrl);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {
      newsArticles: newsResponse.articles,
    },
    revalidate: 5 * 60,
  };
};

const CategoryPage = ({ newsArticles }: CategoryPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();

  const title = `Category: ${categoryName}`;

  return (
    <>
      <Head>
        <title key="title">{`${title} - NextJS News App`}</title>
      </Head>
      <main>
        <h1>{title}</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
};

export default CategoryPage;
