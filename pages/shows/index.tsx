import { GetServerSideProps } from "next";
import PaginationPage from "../../src/components/PaginationPage";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import getShowImage from "../../src/utils/getShowImage";
import Head from "next/head";
import { Production } from "../../src/types/apiTypes";
import { ShowCardProps } from "../../src/components/ShowCard";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.page) {
    return {
      redirect: {
        destination: "/shows?page=1",
        permanent: false,
      },
    };
  }

  const page = Number(query.page);
  const data = await mainFetcher(`/productions?page=${page - 1}&size=20`);

  //console.log("Shows Data Fam!!", data.pageSize);

  if (!data.length) {
    return {
      notFound: true,
    };
  }

  let shows = data as Production[];
  shows = shows.map((show) => ({
    ...show,
    image: getShowImage(show.mediaUrl),
  }));

  const pageCount = data.pageSize;
  //TODO: pagination

  return {
    props: {
      shows,
      pageCount,
      page,
    },
  };
};

interface ArtistsPaginationProps {
  shows: Production[]; // Assuming Production is the correct type for shows
  page: number;
}

const mapProductionToShowCardProps = (
  production: Production
): ShowCardProps => {
  return {
    id: production.id,
    title: production.title,
    media: getShowImage(production.mediaUrl),
  };
};

const ArtistsPagination = ({ shows, page }: ArtistsPaginationProps) => {
  const showCardPropsArray = shows.map(mapProductionToShowCardProps);
  return (
    <>
      <Head>
        <title>Θεατρικές Παραστάσεις | Theatrica</title>
      </Head>
      <PaginationPage
        title="Παραστάσεις"
        items={showCardPropsArray}
        // pageCount={pageCount}
        page={page}
        path="/shows"
      />
    </>
  );
};

export default ArtistsPagination;
