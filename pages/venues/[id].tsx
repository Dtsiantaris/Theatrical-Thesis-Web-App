import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
// interfaces
import { Production } from "../../src/types/Production";
import { GoogleGeocodingResult } from "../../src/types/GoogleGeoResult";
import { Venue } from "../../src/types/Venue";
// hooks
import { useUserMutations } from "../../src/hooks/mutations/useUserMutations";
import {
  fetchVenueById,
  fetchVenueLocation,
  fetchVenueProductionsByVenueId,
} from "../../src/hooks/queries/useVenueQueries";
// components
import ContentSlider from "../../src/components/ContentSlider";
import ShowCard from "../../src/components/ShowCard";
import LoadingScene from "../../src/components/LoadingScene";
// utils & icons
import { Button, makeStyles, Typography } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import Copyright from "@mui/icons-material/Copyright";
import Image from "next/image";
import Head from "next/head";
// styles
import style from "../../src/assets/jss/layouts/venueDetailsStyle";
import EditVenueDialog from "../../src/components/EditVenueDIalog";
import { useUserContext } from "../../src/contexts/UserContext";

export const getStaticPaths: GetStaticPaths = async () => {
  const venueIDs: string[] = [];
  const paths = venueIDs.map((id) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !("id" in params)) {
    return {
      notFound: true,
    };
  }
  const id = Number(params.id as string);
  const venue = await fetchVenueById(id);

  if (!venue) {
    return {
      notFound: true,
    };
  }

  const productions = await fetchVenueProductionsByVenueId(id);
  const location = await fetchVenueLocation(venue.title);

  return {
    props: { venue, productions, location },
    revalidate: 900,
  };
};

const useStyles = makeStyles(style);

interface VenueDetailsProps {
  venue: Venue;
  productions: Production[];
  location: GoogleGeocodingResult;
}

const VenueDetails = ({ venue, productions, location }: VenueDetailsProps) => {
  const classes = useStyles();
  const router = useRouter();

  const [isClaimed, setIsClaimed] = useState(venue.isClaimed);
  const [venueRef, setVenueRef] = useState(venue);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { claimVenue } = useUserMutations();
  const { user } = useUserContext();

  const isClaimedByUser = user?.claimedVenues.some(
    (ven) => ven.id === venueRef.id
  );

  const handleClaim = async () => {
    const res = await claimVenue(venueRef.id);
    setIsClaimed(res);
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleVenueUpdate = async () => {
    setIsEditDialogOpen(false);
    const res = await fetchVenueById(venueRef.id);
    if (res) setVenueRef(res);
  };

  if (router.isFallback) {
    return <LoadingScene fullScreen />;
  }

  return (
    <>
      <Head>
        <title>{venueRef.title} | Theatrica</title>
      </Head>
      <div className={`pageWrapper ${classes.pageWrapper}`}>
        <div className={classes.imageGridWrapper}>
          <div className={classes.imageGrid}>
            <div className={classes.imageBlur}>
              <Image src="/TheaterImage.jpg" alt="Header image" layout="fill" />
            </div>
            <Image
              src="/TheaterImage.jpg"
              alt="Header image"
              width={575}
              height={420}
            />
            <div className={classes.imageBlur}>
              <Image src="/TheaterImage.jpg" alt="Header image" layout="fill" />
            </div>
          </div>
        </div>
        <div
          className={`pageContent ${classes.content}`}
          style={{ maxWidth: 1250 }}
        >
          <div style={{ marginTop: -100, marginBottom: "5em" }}>
            <Typography variant="h2" component="h1">
              {venueRef.title}
            </Typography>
            {location && (
              <Typography
                variant="body2"
                component="h2"
              >{`${location.address_components[1].long_name} ${location.address_components[0].long_name}, ${location.address_components[2].long_name}`}</Typography>
            )}
            {!isClaimed ? (
              <Button
                className="!normal-case !bg-sky-500 !mt-3"
                startIcon={<Copyright />}
                onClick={handleClaim}
              >
                Claim this Venue
              </Button>
            ) : undefined}
            {isClaimedByUser ? (
              <Button
                className="!normal-case !bg-sky-500 !mt-3"
                startIcon={<Copyright />}
                onClick={handleEdit}
              >
                Edit this Venue
              </Button>
            ) : undefined}
          </div>
          <section>
            <Typography className={classes.sectionTitle} variant="h3">
              Πληροφορίες
            </Typography>
            <Typography className={classes.paragraph} variant="body1">
              Το θέατρο βρίσκεται στην περιοχή του «Ψυρρή», επί της οδού Σαρρή.
              Η περιοχή πήρε το όνομά της από το παρατσούκλι του φερώνυμου
              καταπατητή της παλιάς Αθήνας και αποτελούσε κέντρο συγκέντρωσης
              βιοτεχνικών μονάδων κατά την περίοδο 1950 – 1970.
            </Typography>
            <Typography className={classes.paragraph} variant="body1">
              Η περιοχή του «Ψυρρή», είναι ένα κλασικό παράδειγμα ανάπλασης, στο
              πλαίσιο της λογικής που συνδέει την ανάπτυξη κέντρων διασκέδασης,
              εστιατορίων και χώρων πολιτισμού, όπου ξεκίνησε στις αρχές της
              δεκαετίας του ’90 και περνώντας μέσα από τη διεξαγωγή των
              Ολυμπιακών Αγώνων συνεχίζεται μέχρι σήμερα, όχι μόνο στην περιοχή
              του «Ψυρρή», αλλά και στην ευρύτερη περιοχή του λεγόμενου
              ιστορικού κέντρου της πόλης.
            </Typography>
            <Typography className={classes.paragraph} variant="body1">
              Θεατρικοί χώροι, αίθουσες τέχνης, εστιατόρια, καφενεία και
              μπαράκια ήρθαν να εγκατασταθούν στους δρόμους της περιοχής του
              «Ψυρρή» αντικαθιστώντας παλιά σπίτια και βιοτεχνικές μονάδες.
            </Typography>
          </section>
          <section>
            <ContentSlider title="Παραστάσεις" decoratedTitle>
              {productions?.map((item) => (
                <ShowCard
                  id={item.id}
                  title={item.title}
                  media={item.mediaUrl}
                  key={item.id}
                />
              ))}
            </ContentSlider>
          </section>
          {location && (
            <section>
              <Typography className={classes.sectionTitle} variant="h3">
                Χάρτης
              </Typography>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?q=place_id:${location.place_id}&key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API}`}
              />
            </section>
          )}
          <section>
            <Typography variant="h3" className={classes.sectionTitle}>
              Επικοινωνία
            </Typography>
            <div className={classes.socialContainer}>
              {/* TODO - edw prepei sta dedomena poy pernoyme apo to api na exei kai links efoson uparxoun gia ta socials kai na ta xrhsimopoioun parakatw */}
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
              <div className={`linksNoDecoration ${classes.social}`}>
                <div className={classes.socialLogo}>
                  <PhoneIcon fontSize="large" />
                </div>
                <Typography variant="body1">211 000 0000</Typography>
              </div>
            </div>
          </section>
        </div>
      </div>

      <EditVenueDialog
        isOpen={isEditDialogOpen}
        title={venueRef.title}
        address={venueRef.address}
        id={venueRef.id}
        onClose={() => setIsEditDialogOpen(false)}
        onConfirm={handleVenueUpdate}
      />
    </>
  );
};

export default VenueDetails;
