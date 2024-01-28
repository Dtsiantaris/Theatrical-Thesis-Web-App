import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PaletteIcon from "@mui/icons-material/Palette";
import { MapOutlined, MasksTwoTone } from "@mui/icons-material";

export interface Route {
  path: string;
  name: string;
  icon: JSX.Element;
  pathOnClick?: string;
  condition?: (isLoggedIn: boolean) => boolean;
}

const routes: Route[] = [
  {
    path: "/",
    name: "Αρχική",
    icon: <HomeIcon fontSize="small" />,
  },
  {
    path: "/artists",
    pathOnClick: "/artists?page=1",
    name: "Καλλιτέχνες",
    icon: <PersonIcon fontSize="small" />,
  },
  {
    path: "/shows",
    pathOnClick: "/shows?page=1",
    name: "Παραστάσεις",
    icon: <MasksTwoTone fontSize="small" />,
  },
  {
    path: "/venues",
    pathOnClick: "/venues?page=1",
    name: "Θέατρα",
    icon: <LocationCityIcon fontSize="small" />,
  },
  {
    path: "/find",
    name: "Βρες",
    icon: <MapOutlined fontSize="small" />,
  },
  {
    path: "/stats",
    pathOnClick: "/stats/2022",
    name: "Στατιστικά",
    icon: <EqualizerIcon fontSize="small" />,
  },
  {
    path: "/compare",
    name: "Σύκριση",
    icon: <CompareArrowsIcon fontSize="small" />,
  },
  {
    path: "/saved",
    name: "Αποθηκευμένα",
    icon: <BookmarksIcon fontSize="small" />,
    condition: (isLoggedIn) => isLoggedIn,
  },
  {
    path: "/color",
    name: "Χρώματα",
    icon: <PaletteIcon fontSize="small" />,
  },
];

export default routes;
