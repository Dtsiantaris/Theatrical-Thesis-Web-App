import React, { useMemo, useState } from "react";
// next
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
// mui
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  AccordionSummary,
  Accordion,
} from "@mui/material";
// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// components
import LoadingScene from "../../src/components/LoadingScene";
import MediaViewer from "../../src/components/MediaViewer";
import ArtistCard from "../../src/components/ArtistCard";
// hooks
import useFavoriteArtist from "../../src/hooks/useFavoriteArtist";
// utils
import { mainFetcher, tmdbFetcher } from "../../src/utils/AxiosInstances";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
// inetrfaces
import { Person } from "../../src/types/entities/Person";
import { Production } from "../../src/types/entities/Production";
import ContentSlider from "../../src/components/ContentSlider";
import ShowCard from "../../src/components/ShowCard";
import { Role } from "../../src/types/entities/Role";

const placeHolderBio =
  "Quisque tincidunt porta neque, vitae aliquet quam hendrerit id. Nulla facilisi. Sed hendrerit elit eu vulputate auctor. Mauris ac tincidunt dui. Suspendisse nec sagittis neque, et efficitur nisl. Proin molestie mollis tortor, id sodales risus. Phasellus mi ante, viverra vel euismod eget, vulputate vel libero. Curabitur sem tellus, posuere id est eu, auctor imperdiet mauris. Morbi euismod facilisis dolor, in vestibulum mauris mattis non. Donec sit amet tempor augue, a elementum nisl.";

const COLORS = [
  "#71FFFA",
  "#fff642",
  "#ed66ff",
  "#91ff55",
  "#fd2155",
  "#fff9f9",
];

export const getServerSideProps: GetServerSideProps<
  ArtistDetailsProps
> = async ({ params }) => {
  try {
    const artistId = params?.id; // Extract artist ID from route parameters
    if (!artistId) {
      throw new Error("Artist ID not provided in route");
    }

    // Fetch artist data based on the artistId (e.g., using mainFetcher)
    const artist = (await mainFetcher(`/people/${artistId}`)) as Person;
    // console.log(
    //   "================================ ARTIST ===================================="
    // );
    // console.log(artist);

    const productions = (await mainFetcher(`/people/${artistId}/productions`))
      .results as { production: Production; role: Role }[];
    console.log(
      "================================ PRODUCTIONS ===================================="
    );
    console.log(productions);
    // Fetch other data needed for the page, such as images, productionGroups, etc.

    return {
      props: {
        artist,
        productions,
      },
    };
  } catch (error) {
    // Handle errors here, e.g., by redirecting to an error page
    return {
      redirect: {
        destination: "/error", // Replace with your error page
        permanent: false,
      },
    };
  }
};

// export const getStaticPaths = async () => {
//   const artists: Person[] = await mainFetcher("/People");

//   const paths = artists.map((artist) => ({
//     params: { id: artist.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

//FIXME: wtf
interface ArtistDetailsProps {
  artist: Person; // Update the type based on your data structure
  productions: { production: Production; role: Role }[]; // Update the type based on your data structure
  // productionsByRole: any[]; // Update the type based on your data structure
  // images: string[]; // Update the type based on your data structure
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({
  artist,
  productions,
  // productionsByRole,
}) => {
  // placeholder:
  const testBio = `Γεννήθηκε στις 31 Ιουλίου 1972 στις Σέρρες, όπου και μεγάλωσε. Στην ηλικία των 18 ετών εγκαταστάθηκε στη Θεσσαλονίκη και πέρασε στο τμήμα Νομικής του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης.
  Έπειτα μετακόμισε στην Αθήνα για να σπουδάσει Υποκριτική στη Δραματική Σχολή Αθηνών του Γιώργου Θεοδοσιάδη την περίοδο 1995 με 1998. Ομιλεί αγγλικά, γερμανικά, γαλλικά και ισπανικά.`;
  const testDesc =
    "Ο Γιώργος Καπουτζίδης (Σέρρες, 31 Ιουλίου 1972) είναι Έλληνας σεναριογράφος, ηθοποιός, παρουσιαστής, και στιχουργός. Έχει γράψει τα σίριαλ Στο Παρά 5, Σαββατογεννημένες και Εθνική Ελλάδος. Η καταγωγή του είναι από το Λιβαδοχώρι Σερρών.";

  const router = useRouter();
  const theme = useTheme();

  const mdDown = useMediaQuery("(max-width:960px)");

  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  const { isFavorite, setIsFavorite } = useFavoriteArtist(
    artist && artist.id.toString()
  );

  const stringBirthday = useMemo(() => {
    if (artist && artist.birthdate) {
      return new Date(artist.birthdate).toLocaleDateString("el", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    return "";
  }, [artist]);

  if (router.isFallback) {
    return <LoadingScene fullScreen />;
  }

  // if (!artist.images[0]) {
  //   artist.images.push("kapoutzidis")
  // }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleImageClick = (index: number) => {
    setMediaIndex(index);
    setMediaViewerOpen(true);
  };

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Head>
        <title>{artist.fullname} | Theatrica</title>
      </Head>
      <div className="pageWrapper md:px-0 py-5">
        <div className="pageContent flex flex-col overflow-x-auto ">
          <section className="mb-[4em] flex flex-col ">
            <div className="relative flex flex-col md:!flex-row !no-wrap gap-2">
              {/* Image */}
              <div className="flex flex-col gap-1">
                <Avatar
                  alt="Artist Photo"
                  src={artist.images[0].imageUrl}
                  variant="square"
                  className="bg-transparent text-white !w-full !h-72 md:!w-80 md:!h-72 mt-1 col-span-2 md:col-span-1 justify-self-center !rounded-md !shadow-lg"
                ></Avatar>
                {/* Name and birthdate */}
                <span>
                  <Typography variant="h3">{artist.fullname}</Typography>
                  <div className="flex flex-wrap items-center">
                    {artist?.roles && artist.roles.length ? (
                      artist.roles.map((role, index) => (
                        <React.Fragment key={index}>
                          <Typography
                            variant="body1"
                            component="span"
                            className="italic !text-sm"
                          >
                            {role}
                          </Typography>
                          {artist.roles && index < artist?.roles.length - 1 && (
                            <Typography
                              variant="body1"
                              component="span"
                              className="!mx-2 !font-bold"
                            >
                              •
                            </Typography>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <Typography
                        variant="body1"
                        component="span"
                        className="italic !text-xs"
                      >
                        Δεν υπάρχουν διαθέσιμοι ρόλοι
                      </Typography>
                    )}
                  </div>
                  <Typography
                    variant="body1"
                    className="row-start-4 sm:row-start-3"
                  >
                    <strong>Ημερομηνία Γέννησης: </strong>
                    {stringBirthday || "N/A"}
                  </Typography>
                </span>
              </div>
              {/* description and bio */}
              <div className="flex flex-col gap-3 p-2">
                {/* Description */}
                <Typography
                  variant="body1"
                  className="col-start-1 col-span-2 row-start-3 sm:col-start-2 sm:col-span-2 sm:row-start-2"
                >
                  {testDesc}
                </Typography>
                <div>
                  <Typography variant="h4">Βιογραφικό:</Typography>
                  <Typography variant="body1" className="italic">
                    {testBio}
                  </Typography>
                </div>
              </div>
              <IconButton
                size="small"
                className="hover:bg-transparent !absolute -bottom-2 md:-top-2 md:bottom-auto -right-5"
                onClick={handleFavorite}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </div>
          </section>
          <section>
            {mediaViewerOpen && (
              <MediaViewer
                media={artist.images.map((image) => image.imageUrl)}
                currentImage={mediaIndex}
                setVisibility={setMediaViewerOpen}
              />
            )}
            {/* Images */}
            {artist.images.length > 0 ? (
              <>
                <ContentSlider decoratedTitle title="Φωτογραφίες">
                  {artist.images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className="hover:cursor-pointer hover:scale-105 hover:absolute hover:border-2 border-secondary transition-transform rounded-md shadow-md w-[8rem] h-[8rem] flex justify-center overflow-hidden"
                      >
                        <Image
                          data-index={index}
                          src={image.imageUrl}
                          alt={`${artist.fullname} profile picture`}
                          style={{ objectFit: "cover" }}
                          width={128}
                          height={128}
                        />
                      </div>
                    );
                  })}
                </ContentSlider>
              </>
            ) : (
              <Typography variant="body1">Δεν υπάρχουν φωτογραφίες</Typography>
            )}
          </section>
          <section>
            {productions ? (
              <ContentSlider decoratedTitle title="Παραστάσεις">
                {productions.map((item, index) => (
                  <ShowCard
                    key={index}
                    id={item.production.id}
                    title={item.production.title}
                    mediaUrl={item.production.mediaUrl}
                    description={item.production.description}
                    duration={item.production.duration}
                    organizerId={item.production.organizerId.toString()}
                    producer={item.production.producer}
                    url={item.production.url}
                  />
                ))}
              </ContentSlider>
            ) : (
              <Typography>Δεν υπάρχουν διαθέσιμες παραγωγές</Typography>
            )}
          </section>
          <section>
            <Typography
              variant="h4"
              component="h2"
              className="font-medium relative pl-2 border-l-4 border-secondary"
            >
              Social
            </Typography>
            <div className="flex flex-wrap py-5 sm:px-0 sm:py-0">
              <a
                href="https://www.twitter.com"
                className="linksNoDecoration flex items-center py-4 pr-6"
              >
                <div className="mr-3 w-8 h-8">
                  <Image
                    src="/TwitterLogo.svg"
                    width={32}
                    height={32}
                    alt="Twitter Logo"
                  />
                </div>
                <Typography variant="body1">Twitter</Typography>
              </a>
              <a
                href="https://www.facebook.com"
                className="linksNoDecoration flex items-center py-4 pr-6"
              >
                <div className="mr-3 w-8 h-8">
                  <Image
                    src="/FacebookLogo.svg"
                    width={32}
                    height={32}
                    alt="Facebook Logo"
                  />
                </div>
                <Typography variant="body1">Facebook</Typography>
              </a>
              <a
                href="https://www.instagram.com"
                className="linksNoDecoration flex items-center py-4 pr-6"
              >
                <div className="mr-3 w-8 h-8">
                  <Image
                    src="/InstagramLogo.svg"
                    width={32}
                    height={32}
                    alt="Instagram Logo"
                  />
                </div>
                <Typography variant="body1">Instagram</Typography>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ArtistDetails;
