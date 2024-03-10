import React from "react";
import { Divider } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import LoadingScene from "../LoadingScene";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

export const ContactUserInfoTab = () => {
  const { user } = useUserContext();

  if (!user) return <LoadingScene />;

  return (
    <>
      <div className="relative shadow-2xl flex flex-col gap-3 w-full h-full rounded-2xl p-10  text-white bg-gradient-to-br from-primary to-indigo-900">
        {/* Title */}
        <div className="flex gap-2 items-center text-xl md:text-4xl font-bold">
          Επικοινωνία
          <ImportContactsIcon />
        </div>
        <Divider color="white" />
        {/* Content */}
        <div className="flex justify-center">
          <iframe
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
              user.facebook!
            )}`}
            width="340"
            height="500"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Embedded Facebook Post"
          ></iframe>
        </div>
      </div>
    </>
  );
};
