import React, { FC } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
} from "react-instantsearch";
import Head from "next/head";

const searchClient = algoliasearch(
  "T3UJ0QPIR6",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API || ""
);

// Component to render each hit
const Hit: FC<{ hit: any }> = ({ hit }) => (
  <div>
    <h2>{hit.title}</h2>
    {/* Add more details from your hit as needed */}
  </div>
);

function ResultsPage() {
  return (
    <div className="search-container">
      <Head>
        <title>Search Results</title>
      </Head>
      <InstantSearch searchClient={searchClient} indexName="root">
        <div className="search-panel">
          <div className="search-panel__results">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default ResultsPage;
