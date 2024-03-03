// mui
import { useMediaQuery, useTheme } from "@mui/material";
// icons
import InfoIcon from "@mui/icons-material/Info";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
// components
import { DynamicTab, DynamicTabs } from "./DynamicTabs";
import { GeneralUserInfoTab } from "./GeneralUserInfoTab";
import { TheatricalUserInfoTab } from "./TheatricalUserInfoTab";
import { MediaUserInfoTab } from "./MediaUserInfoTab";
import { ContactUserInfoTab } from "./ContactUserInfoTab";
// utils
import { cn } from "../../utils/cn";

export function UserTabs() {
  const theme = useTheme();
  const isVertical = useMediaQuery(theme.breakpoints.up("md"));

  const tabs: DynamicTab[] = [
    {
      title: "Γενικά",
      titleIcon: <InfoIcon />,
      value: "general",
      content: <GeneralUserInfoTab />,
    },
    {
      title: "Theatrical",
      titleIcon: <TheaterComedyIcon />,
      value: "services",
      content: <TheatricalUserInfoTab />,
    },
    {
      title: "Πολυμέσα",
      value: "media",
      titleIcon: <PermMediaIcon />,
      content: <MediaUserInfoTab />,
    },
    {
      title: "Επικοινωνία",
      titleIcon: <ImportContactsIcon />,
      value: "contact",
      content: <ContactUserInfoTab />,
    },
  ];

  return (
    <div
      className={cn(
        `flex ${
          isVertical ? "flex-row" : "flex-col"
        } h-[40rem] md:h-[40rem] [perspective:1000px] mx-auto w-full items-start justify-start my-40`
      )}
    >
      <DynamicTabs
        tabs={tabs}
        vertical={isVertical}
        activeTabClassName="!bg-primary"
      />
    </div>
  );
}
