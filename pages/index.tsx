import {
  makeStyles,
  Hidden,
  Divider,
  Typography,
  InputBase,
} from "@mui/material";
import ContentSlider from "../src/components/ContentSlider";
import ArtistCard from "../src/components/ArtistCard";
import ShowCard from "../src/components/ShowCard";
import { mainFetcher } from "../src/utils/AxiosInstances";
import getShowImage from "../src/utils/getShowImage";
import Head from "next/head";
import NewsCard from "../src/components/NewsCard";
import { v2 as cloudinary } from "cloudinary";
import { newsFetcher } from "../src/utils/AxiosInstances";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import ScrollPrompt from "../src/components/ScrollPrompt";
import HeroGraph from "../src/components/HeroGraph";
import { getHomeData } from "./api/getHomeData";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const getStaticProps = async () => {
  cloudinary.config({
    cloud_name: "dpddl5vyr",
    secure: true,
  });

  const articlesResponse = await newsFetcher(
    encodeURI("/everything?q=παράσταση θέατρο&sortBy=publishedAt&pageSize=3")
  );
  const articles = articlesResponse?.articles;

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
  let latestShows = (await getHomeData()).getLatestShows;
  // Comment this too
  //console.log("Static Artists: ", artists);
  //console.log("Static shows: ", latestShows);

  // try {
  //   console.log(artists);
  //   console.log(latestShows);
  // } catch (error) {
  //   console.error(error);
  // }

  //let artists = getArtists.filter(Boolean);

  // ffffff
  // Check latestShowsResponse.
  // const latestShows = getLatestShows?.map((show) => ({
  //   id: show.id,
  //   title: show.title,
  //   image: getShowImage(show.mediaURL),
  // }));

  return {
    props: { artists, latestShows, articles },
    revalidate: 60 * 15,
  };
};

function Home({ artists, latestShows, articles }) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue) router.push(`/results?search_query=${searchValue}`);
  };

  async function handleRes() {
    // const latestShows = await mainFetcher(`/Productions?page=1&size=4`);
    // const artists = await mainFetcher(`/People/8158`);
    // Giati exoume function poy apla kanei console.log??
    //console.log("Artists inside useEffect:", artists);
    //console.log("LatestShows inside useEffect:", latestShows);
  }

  useEffect(() => {
    handleRes();
  }, []);

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
        <div className="w-[103%] h-full">
          <HeroGraph />
        </div>
      </div>
      <div className="mb-6 sm:ml-14 md:py-5">
        <div className="max-w-[1250px] mx-0 my-auto flex flex-col sect">
          <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center gap-[10px] px-0 py-5">
            <Typography variant="h1" style={{ marginTop: "auto" }}>
              Theatrical Analytics
            </Typography>
            <Typography variant="body2">
              Αναζητήστε καλλιτέχνες, παραστάσεις και θέατρα, δείτε στατιστικά
              και συγκρίνετε χρονικές περιόδους ή βρείτε μια παράσταση στην
              περιοχή σας!
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-1 p-3 max-w-[182px] bg-purple-200 rounded-2xl border-1 border-purple-200 mt-3 shadow-sm">
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
            <div className="px-10 py-5 flex flex-wrap gap-12 justify-center md:justify-around">
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
              {artists.map((artist, index) => (
                <ArtistCard
                  id={artist.id}
                  fullName={artist.fullName}
                  image={artist.image}
                  key={index}
                  delay={index}
                />
              ))}
            </ContentSlider>
          </section>
          <Hidden smDown>
            <Divider className="h-1 mx-12 my-0" flexItem />
          </Hidden>
          <section className="bg-primary-dark md:bg-transparent md:px-16 my-40 md:my-25 py-30 md:py-0">
            <ContentSlider title="Παραστάσεις" description="Νέες Κυκλοφορίες">
              {latestShows.results.map((item) => (
                <ShowCard
                  id={item.id}
                  title={item.title}
                  media={item.image}
                  key={item.id}
                />
              ))}
            </ContentSlider>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
