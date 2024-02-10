import { mainFetcher } from "../../src/utils/AxiosInstances";

export const getHomeData = async () => {
  const artistIDs = [4659];
  const getArtists = await Promise.all(
    artistIDs.map(async (id) => {
      try {
        let artist = await mainFetcher(`/People/${id}`);
        // Comment this also - td
        // console.log(`Artist ${id}:`, artist);

        // // Replace any undefined values with null
        // artist = JSON.parse(
        //   JSON.stringify(artist, (key, value) =>
        //     value === undefined ? null : value
        //   )
        // );
        return artist;
      } catch (error) {
        console.error(`Failed to fetch artist ${id}:`, error);
        return null; // Return null instead of undefined for failed requests
      }
    })
  );

  let getLatestShows = await mainFetcher(`/Productions?page=1&size=4`);

  // if (getLatestShows === undefined) {
  //   getLatestShows = null;
  // } else if (Array.isArray(getLatestShows)) {
  //   // Replace any undefined values with null
  //   getLatestShows = JSON.parse(
  //     JSON.stringify(getLatestShows, (key, value) =>
  //       value === undefined ? null : value
  //     )
  //   );
  // }

  return {
    getArtists,
    getLatestShows,
  };
};
