import { ChangeEvent, FormEvent, useState } from "react";
// next
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// mui
import { Hidden, Divider, Typography, InputBase } from "@mui/material";
// mui icons
import SearchIcon from "@mui/icons-material/Search";
// components
import ContentSlider from "../src/components/ContentSlider";
import ArtistCard from "../src/components/ArtistCard";
import ShowCard from "../src/components/ShowCard";
import NewsCard from "../src/components/NewsCard";
import HeroGraph from "../src/components/HeroGraph";
import ScrollPrompt from "../src/components/ScrollPrompt";
// api
import { getHomeData } from "./api/getHomeData";
// interfaces
import { NewsCardProps } from "../src/types/cards/NewsCardProps";
import { HomePageProps } from "../src/types/pages/HomePageProps";
// utils
import { v2 as cloudinary } from "cloudinary";
import { newsFetcher } from "../src/utils/AxiosInstances";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const getStaticProps = async () => {
  cloudinary.config({
    cloud_name: "dpddl5vyr",
    secure: true,
  });

  const articlesResponse = await newsFetcher(
    encodeURI("/everything?q=παράσταση θέατρο&sortBy=publishedAt&pageSize=3")
  );
  const articles = articlesResponse?.articles as NewsCardProps["article"][];

  articles?.forEach((article) => {
    article.urlToImage = cloudinary.url(encodeURI(article.urlToImage), {
      type: "fetch",
      width: 320,
      fetch_format: "auto",
      crop: "scale",
      quality: "auto",
    });
  });

  //const { getArtists, getLatestShows } = getHomeData();

  let artists = (await getHomeData()).getArtists;
  // console.log("================ARTISTS================");
  // console.log(artists);
  let latestShows = (await getHomeData()).getLatestShows.results;
  // console.log("================SHOWS================");
  // console.log(latestShows);

  return {
    props: { artists, latestShows, articles },
    revalidate: 60 * 15,
  };
};

const Home = ({ artists, latestShows, articles }: HomePageProps) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) router.push(`/results?search_query=${searchValue}`);
  };

  return (
    <>
      <Head>
        <title>Theatrica</title>
        <meta
          name="description"
          content="Αναζητήστε καλλιτέχνες, παραστάσεις και θέατρα, δείτε στατιστικά και συγκρίνετε χρονικές περιόδους ή βρείτε μια παράσταση στην περιοχή σας!"
        />
      </Head>
      <div className="pt-14 overflow-hidden absolute top-0 left-0 w-full h-full -z-10 opacity-70">
        <div className="w-[105%] h-full">
          <HeroGraph />
        </div>
      </div>
      <div className="mb-6 sm:ml-14 md:py-5">
        <div className="max-w-[1250px] mx-0 my-auto flex flex-col sect">
          <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center gap-[10px] px-0 py-5">
            {/* Logo full */}
            <div className="bg-gray-50 bg-opacity-20 mt-auto w-fit p-5 rounded-xl shadow-xl">
              <Image
                src="logos/logo-full.svg"
                alt="Logo"
                width={40}
                height={40}
                className="mt-auto w-[30rem]"
              />
              <Typography variant="body2">
                Αναζητήστε καλλιτέχνες, παραστάσεις και θέατρα, δείτε στατιστικά
                και συγκρίνετε χρονικές περιόδους ή βρείτε μια παράσταση στην
                περιοχή σας!
              </Typography>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-1 p-3 max-w-[350px] bg-white rounded-2xl border-1 border-purple-200 mt-3 shadow-sm">
                <SearchIcon />
                <InputBase
                  type="text"
                  placeholder="Αναζήτηση..."
                  value={searchValue}
                  onChange={handleChange}
                />
              </div>
            </form>
            <div className="mt-auto">
              <ScrollPrompt />
            </div>
          </div>
          <section className="bg-primary-dark md:bg-transparent md:px-16 my-40 md:my-25 py-30 md:py-0">
            <Typography
              className="px-0 py-5 md:p-0"
              variant="h3"
              component="h2"
            >
              Νεότερες Ειδήσεις
            </Typography>
            <div className="px-10 py-5 flex flex-wrap gap-5 justify-center md:justify-around">
              {articles.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))}
            </div>
          </section>
          <Hidden smDown>
            <Divider className="h-1 mx-12 my-0" flexItem />
          </Hidden>
          <section className="bg-primary-dark md:bg-transparent md:px-16 my-40 md:my-25 py-30 md:py-0">
            <ContentSlider
              title="Καλλιτέχνες"
              description="Δημοφιλείς Ηθοποιοί"
            >
              {/* TODO: make this a component like show card and maybe use it in artists/index too */}
              {artists.map((artist, index) => (
                <div
                  key={index}
                  className="bg-gray-400 border-2 border-transparent hover:border-secondary hover:scale-105 hover:cursor-pointer transition-all rounded-xl"
                >
                  <Link href={`/artists/${artist.id}`}>
                    <div className="flex flex-col justify-center items-center transition-all">
                      <ArtistCard
                        id={artist.id}
                        fullname={artist.fullname}
                        image={
                          artist?.images && artist.images.length > 0
                            ? artist.images[0].imageUrl
                            : undefined
                        }
                        systemId={artist.systemID}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </ContentSlider>
          </section>
          <Hidden smDown>
            <Divider className="h-1 mx-12 my-0" flexItem />
          </Hidden>
          <section className="bg-primary-dark md:bg-transparent md:px-16 my-40 md:my-25 py-30 md:py-0">
            <ContentSlider title="Παραστάσεις" description="Νέες Κυκλοφορίες">
              {latestShows.map((item) => (
                <ShowCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  mediaUrl={item.mediaUrl}
                  description={item.description}
                  duration={item.duration}
                  organizerId={item.organizerId}
                  producer={item.producer}
                  url={item.url}
                />
              ))}
            </ContentSlider>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
