import { useUserContext } from "../../contexts/UserContext";
// mui
import { Divider } from "@mui/material";
// icons
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
// components
import LoadingScene from "../LoadingScene";
import ContentSlider from "../ContentSlider";
import VenueCard from "../VenueCard";

export const TheatricalUserInfoTab = () => {
  const { user } = useUserContext();

  if (!user) return <LoadingScene />;
  return (
    <>
      <div className="relative shadow-2xl flex flex-col gap-3 w-full h-full rounded-2xl p-10  text-white bg-gradient-to-br from-primary to-indigo-900">
        {/* Title */}
        <div className="flex gap-2 items-center text-xl md:text-4xl font-bold">
          Theatrical Info
          <TheaterComedyIcon />
        </div>
        <Divider color="white" />
        {/* Content */}
        {/* Claimed Events */}
        <ContentSlider title="Θεατρικοί χώροι" decoratedTitle>
          {user.claimedVenues.map((venue, index) => (
            <VenueCard key={index} {...venue} />
          ))}
        </ContentSlider>
      </div>
    </>
  );
};
