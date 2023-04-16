import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/modals/Article";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(
    null
  );
  const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
  const [isErrorLoadingSearchResults, setIsErrorLoadingSearchResults] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();
    if (searchQuery) {
      try {
        setSearchResults(null);
        setIsErrorLoadingSearchResults(false);
        setIsLoadingSearchResults(true);
        const response = await fetch(`/api/search-news?q=${searchQuery}`);
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setIsErrorLoadingSearchResults(true);
      } finally {
        setIsLoadingSearchResults(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title key="title">Search News - NextJS News App</title>
      </Head>
      <main>
        <h1>Search News</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              name="searchQuery"
              placeholder="E.g. politics, sports ..."
            />
          </Form.Group>
          <Button
            type="submit"
            className="mb-3"
            disabled={isLoadingSearchResults}
          >
            Search
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          {isLoadingSearchResults && <Spinner animation="border" />}
          {isErrorLoadingSearchResults && (
            <p>Something went wrong. Please try again.</p>
          )}
          {searchResults?.length === 0 && (
            <p>Nothing found. Try with a different query.</p>
          )}
          {searchResults && <NewsArticlesGrid articles={searchResults} />}
        </div>
      </main>
    </>
  );
};

export default SearchPage;
