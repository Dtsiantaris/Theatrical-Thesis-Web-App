import React, { useMemo, useState } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import style from "../../src/assets/jss/layouts/artistDetailsStyle";
import LoadingScene from "../../src/components/LoadingScene";
import { useRouter } from "next/router";
import { mainFetcher, tmdbFetcher } from "../../src/utils/AxiosInstances";
import Link from "next/link";
import Image from "next/image";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useFavoriteArtist from "../../src/hooks/useFavoriteArtist";
import MediaViewer from "../../src/components/MediaViewer";
import Head from "next/head";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import { Person } from "../../src/types/Person";
import { GetServerSideProps } from "next";
import ArtistCard from "../../src/components/ArtistCard";

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
    const artist = await mainFetcher(`/people/${artistId}`);
    console.log("ATTENTION: ", artist);

    // Fetch other data needed for the page, such as images, productionGroups, etc.

    return {
      props: {
        artist,
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
  artist: any; // Update the type based on your data structure
  productionGroups: any; // Update the type based on your data structure
  productionsByRole: any[]; // Update the type based on your data structure
  images: string[]; // Update the type based on your data structure
}

const useStyles = makeStyles(style);

const ArtistDetails: React.FC<ArtistDetailsProps> = ({
  artist,
  productionGroups,
  productionsByRole,
  images,
}) => {
  const router = useRouter();
  const theme = useTheme();

  const classes = useStyles();
  const mdDown = useMediaQuery("(max-width:960px)");

  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  const { isFavorite, setIsFavorite } = useFavoriteArtist(
    artist && artist.id.toString()
  );

  const stringBirthday = useMemo(() => {
    if (artist && artist.birthday) {
      return new Date(artist.birthday).toLocaleDateString("el", {
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

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleImageClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const index = Number(event.currentTarget.getAttribute("index"));
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
      <div className={`pageWrapper ${classes.wrapper}`}>
        <div className={`pageContent ${classes.container}`}>
          <section className={classes.overview}>
            {/* <ArtistCard {...artist} /> */}
            <Avatar
              alt="Artist Photo"
              variant="square"
              className={classes.avatar}
            >
              <ArtistCard {...{ ...artist, isDetails: true }} />
            </Avatar>

            <IconButton
              size="small"
              className={classes.favoriteIcon}
              onClick={handleFavorite}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body1" className={classes.bio}>
              {artist.biography || placeHolderBio}
            </Typography>
            <Typography variant="body1" className={classes.birthday}>
              <strong>Ημερομηνία Γέννησης: </strong>
              {stringBirthday || "N/A"}
            </Typography>
          </section>
          <section>
            {mediaViewerOpen && (
              <MediaViewer
                media={images}
                currentImage={mediaIndex}
                setVisibility={setMediaViewerOpen}
              />
            )}
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitle}
            >
              Φωτογραφίες
            </Typography>
            {/* <div className={classes.photographsContainer}>
              {images.length > 0 ? (
                <>
                  {images.map((url, index) => {
                    if ((mdDown && index < 4) || !mdDown) {
                      return (
                        <div
                          key={index}
                          data-index={index}
                          className={classes.photograph}
                          onClick={handleImageClick}
                        >
                          <Image
                            src={url}
                            alt={`${artist.fullName} profile picture`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      );
                    }
                  })}
                </>
              ) : (
                <Typography variant="body1">
                  Δεν υπάρχουν φωτογραφίες
                </Typography>
              )}
            </div> */}
          </section>
          <section>
            <Typography
              variant="h4"
              component="h3"
              className={classes.sectionTitle}
              style={{ marginBottom: 20 }}
            >
              Παραστάσεις
            </Typography>
            {/* {productionGroups.acting.length > 0 && (
              <Accordion
                square
                expanded={expanded === "acting"}
                onChange={handleChange("acting")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="acting-content"
                  id="acting-header"
                >
                  <Typography variant="h5" component="h3">
                    Ηθοποιός
                  </Typography>
                </AccordionSummary>
                <List className={classes.list}>
                  {productionGroups.acting.map(
                    (
                      play: {
                        productionId: any;
                        title:
                          | boolean
                          | React.ReactChild
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <ListItem key={index} className={classes.listItem}>
                        <Link href={`/shows/${play.productionId}`}>
                          <a className={classes.link}>
                            <ListItemText primary={play.title} />
                          </a>
                        </Link>
                        <Link href="/stats/2022">
                          <a
                            style={{ marginLeft: "auto" }}
                            className={classes.link}
                          >
                            <ListItemText
                              className={classes.year}
                              primary="2022"
                            />
                          </a>
                        </Link>
                      </ListItem>
                    )
                  )}
                </List>
              </Accordion>
            )}
            {Object.entries(productionGroups.rest).map(
              ([key, value], index) => (
                <Accordion
                  square
                  key={index}
                  expanded={expanded === key}
                  onChange={handleChange(key)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${key}-content`}
                    id={`${key}-heading`}
                  >
                    <Typography variant="h5" component="h3">
                      {key}
                    </Typography>
                  </AccordionSummary>
                  <List className={classes.list}>
                    {value.map(
                      (
                        play: {
                          productionId: any;
                          title: React.ReactNode; // Specify the type here
                        },
                        index: React.Key | null | undefined
                      ) => (
                        <ListItem key={index} className={classes.listItem}>
                          <Link href={`/shows/${play.productionId}`}>
                            <a className={classes.link}>
                              <ListItemText primary={play.title} />
                            </a>
                          </Link>
                          <Link href="/stats/2022">
                            <a
                              style={{ marginLeft: "auto" }}
                              className={classes.link}
                            >
                              <ListItemText
                                className={classes.year}
                                primary="2022"
                              />
                            </a>
                          </Link>
                        </ListItem>
                      )
                    )}
                  </List>
                </Accordion>
              )
            )} */}
          </section>
          <section>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitle}
            >
              Παραγωγές ανά Ρόλο
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                {/* <Pie data={productionsByRole} dataKey="value">
                  {productionsByRole.map((prod, index) => (
                    <Cell
                      key={prod.name}
                      fill={COLORS[index]}
                      stroke={theme.palette.background.default}
                      strokeWidth={2}
                    />
                  ))}
                  <Cell
                    fill="#fd2155"
                    stroke={theme.palette.background.default}
                    strokeWidth={2}
                  />
                  <LabelList dataKey="value" strokeWidth={0} fill="#000" />
                </Pie> */}
                <Tooltip
                  contentStyle={{ backgroundColor: "#373737", border: 0 }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value) => `${value} παραγωγές`}
                />
                <Legend verticalAlign="top" wrapperStyle={{ bottom: 0 }} />
              </PieChart>
            </ResponsiveContainer>
          </section>
          <section>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitle}
            >
              Social
            </Typography>
            <div className={classes.socialContainer}>
              <a
                href="https://www.twitter.com"
                className={`linksNoDecoration ${classes.social}`}
              >
                <div className={classes.socialLogo}>
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
                className={`linksNoDecoration ${classes.social}`}
              >
                <div className={classes.socialLogo}>
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
                className={`linksNoDecoration ${classes.social}`}
              >
                <div className={classes.socialLogo}>
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
