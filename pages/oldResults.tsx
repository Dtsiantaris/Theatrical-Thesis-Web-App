import React, { useEffect, useState, useRef, ChangeEvent, FC } from "react";
// next
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
// mui
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Pagination,
} from "@mui/material";
// instant search
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  Configure,
  Index,
  useHits,
  usePagination,
  useSearchBox,
  useInstantSearch,
} from "react-instantsearch";

const searchClient = algoliasearch(
  "T3UJ0QPIR6",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API || ""
);

// PaginationController.js or inside your ResultsPage.js file
const PaginationController: FC<{ currentPage: number }> = ({ currentPage }) => {
  const { refine } = usePagination();

  useEffect(() => {
    // Call refine to update the page in Algolia's state
    // Note: currentPage is expected to be 1-indexed
    refine(currentPage - 1); // Adjusting since Algolia's pages are 0-indexed
  }, [currentPage, refine]);

  return null; // This component doesn't render anything
};

const ResultsPage = () => {
  const router = useRouter();
  const { refine: refinePagination } = usePagination();
  const { refine: refineSearchBox } = useSearchBox();
  const { results, status } = useInstantSearch();

  const [isSearching, setIsSearching] = useState(true);
  const [page, setPage] = useState(1);
  const [hitsPerPage, setHitsPerPage] = useState(5);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (router.query.search_query) {
      refineSearchBox(router.query.search_query as string);
    }
    if (router.query.sm) {
      setHitsPerPage(20);
    } else {
      setHitsPerPage(5);
    }
  }, [router.query, refineSearchBox]);

  useEffect(() => {
    setIsSearching(status === "loading");
    if (results) {
      const totalPages = Math.ceil(results.nbHits / hitsPerPage);
      setPage(results.page + 1);
      refinePagination(results.page);
    }
  }, [results, status, refinePagination, hitsPerPage]);

  const handlePagination = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    refinePagination(value - 1);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Αναζήτηση | Theatrica</title>
      </Head>
      <div className="pageWrapper">
        <div className="pageContent">
          <Typography
            ref={scrollRef}
            className="mb-10"
            variant="h4"
            component="h1"
          >
            Αποτελέσματα για <b>{`"${router.query.search_query}"`}</b>
          </Typography>
          <InstantSearch searchClient={searchClient} indexName="root">
            <Configure hitsPerPage={hitsPerPage} />
            <div className="mb-[5em]">
              <Index indexName="Artists">
                <CustomHits path="artists" title="Καλλιτέχνες" />
              </Index>
            </div>
            <div className="mb-[5em]">
              <Index indexName="Venues">
                <CustomHits path="venues" title="Θεατρικοί Χώροι" />
              </Index>
            </div>
            <div className="mb-[5em]">
              <Index indexName="Productions">
                <CustomHits path="shows" title="Παραστάσεις" />
              </Index>
            </div>
            <PaginationController currentPage={page} />
          </InstantSearch>
          {isSearching && <Typography variant="h5">Searching...</Typography>}
          {!isSearching && results && results.nbHits === 0 && (
            <Typography variant="h5">Δεν βρέθηκαν αποτελέσματα</Typography>
          )}
          {results && results.nbPages > 1 && (
            <Pagination
              className="flex justify-center"
              count={results.nbPages}
              page={page}
              color="secondary"
              onChange={handlePagination}
            />
          )}
        </div>
      </div>
    </>
  );
};

interface CustomHitsProps {
  path: string;
  title: string;
}

const CustomHits: FC<CustomHitsProps> = ({ path, title }) => {
  const { hits } = useHits();

  return hits.length === 0 ? null : (
    <>
      <Typography
        className="relative inline-block after:absolute after:left-0 after:-bottom-[0.2em] h-1 w-full"
        variant="h5"
        component="h2"
      >
        {title}
      </Typography>
      <TableContainer component={Paper} className="mt-7 mb-5">
        <Table>
          <TableBody>
            {hits.map((hit) => (
              <TableRow key={hit.objectID} className="last:border-b-0">
                <TableCell>
                  <Link href={`/${path}/${hit.objectID}`}>
                    {hit.title} {/* Adjust according to your data structure */}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResultsPage;
