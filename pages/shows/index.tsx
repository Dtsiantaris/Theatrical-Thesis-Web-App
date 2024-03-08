import { GetServerSideProps } from "next";
import PaginationPage from "../../src/components/PaginationPage";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import getShowImage from "../../src/utils/getShowImage";
import Head from "next/head";
import { Production } from "../../src/types/entities/Production";
import { ShowCardProps } from "../../src/types/cards/ShowCardProps";

interface ShowsPaginationProps {
  shows: Production[];
  pageCount: number;
  page: number;
}

export const getServerSideProps: GetServerSideProps<
  ShowsPaginationProps
> = async ({ query }) => {
  if (!query.page) {
    return {
      redirect: {
        destination: "/shows?page=1",
        permanent: false,
      },
    };
  }

  const page = Number(query.page);
  const data = await mainFetcher(`/productions?page=${page - 1}&size=12`);

  if (!data) {
    return {
      notFound: true,
    };
  }
  let shows = data.results as Production[];

  shows = shows.map((show) => ({
    ...show,
    image: getShowImage(show.mediaUrl),
  }));

  const pageCount = data.totalPages;
  //TODO: pagination

  return {
    props: {
      shows,
      pageCount,
      page,
    },
  };
};

const mapProductionToShowCardProps = (
  production: Production
): ShowCardProps => {
  return {
    id: production.id,
    title: production.title,
    description: production.description,
    duration: production.duration,
    organizerId: production.organizerId.toString(),
    producer: production.producer,
    url: production.url,
    mediaUrl: getShowImage(production.mediaUrl),
  };
};

const ShowsPagination = ({ shows, page, pageCount }: ShowsPaginationProps) => {
  const showCardPropsArray = shows.map(mapProductionToShowCardProps);
  return (
    <>
      <Head>
        <title>Θεατρικές Παραστάσεις | Theatrica</title>
      </Head>
      <div className="mx-0 my-auto flex p-4 md:pl-[70px]">
        <PaginationPage
          title="Παραστάσεις"
          items={showCardPropsArray}
          pageCount={pageCount}
          page={page}
          path="/shows"
        />
      </div>
    </>
  );
};

export default ShowsPagination;
