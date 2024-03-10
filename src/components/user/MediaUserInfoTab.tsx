import { useState } from "react";
// next
import Image from "next/image";
// mui
import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
// icons
import PermMediaIcon from "@mui/icons-material/PermMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
// hooks
import { useUserContext } from "../../contexts/UserContext";
import { useUserMutations } from "../../hooks/mutations/useUserMutations";
import { useUserQueries } from "../../hooks/queries/useUserQueries";
// components
import LoadingScene from "../LoadingScene";
import MediaViewer from "../MediaViewer";
import ContentSlider from "../ContentSlider";
import ConfirmationPrompt from "../ConfirmationPrompt";
import UploadUserPhotoDialog from "../UploadUserPhotoDialog";

export const MediaUserInfoTab = () => {
  const { user } = useUserContext();

  const { fetchUserInfo } = useUserQueries();
  const { deleteUserPhoto } = useUserMutations();

  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeImageId, setActiveImageId] = useState(0);

  const handleDeletePhoto = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDeletePhoto = async (id: number) => {
    await deleteUserPhoto(id);
    await fetchUserInfo();
  };

  const handleImageClick = (index: number) => {
    setMediaIndex(index);
    setMediaViewerOpen(true);
  };

  if (!user) return <LoadingScene />;
  return (
    <>
      <div className="relative shadow-2xl flex flex-col gap-3 w-full h-full rounded-2xl p-10  text-white bg-gradient-to-br from-primary to-indigo-900">
        {/* Title */}
        <div className="flex gap-2 items-center text-xl md:text-4xl font-bold justify-between">
          <div className="flex items-center gap-2">
            Πολυμέσα
            <PermMediaIcon />
          </div>
          <div>
            <Tooltip
              slotProps={{
                tooltip: {
                  className: "!bg-secondary",
                },
                arrow: {
                  className: "!text-secondary",
                },
              }}
              title="Προσθήκη Εικόνας"
              arrow
            >
              <IconButton
                className="!rounded-full !bg-secondary !text-white"
                onClick={() => setIsUploadOpen(true)}
              >
                <AddPhotoAlternateRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Divider color="white" />
        {/* Content */}
        <div>
          {mediaViewerOpen && (
            <MediaViewer
              media={user.userImages.map((image) => image.imageLocation)}
              currentImage={mediaIndex}
              setVisibility={setMediaViewerOpen}
            />
          )}
          {user.userImages.length > 0 ? (
            <>
              <ContentSlider decoratedTitle title="Εικόνες του χρήστη">
                {user.userImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className="relative hover:scale-105 hover:border-secondary hover:cursor-pointer transition-transform border rounded-md border-transparent"
                      style={{ width: "200px", height: "200px" }} // Set width and height of the div
                    >
                      <Image
                        data-index={index}
                        src={image.imageLocation}
                        alt={`User Image ${index}`}
                        layout="fill" // Cover the whole parent
                        objectFit="cover" // Maintain aspect ratio and cover the whole space
                        className="rounded-md"
                      />
                      {/* Delete Icon */}
                      <div className="absolute -right-1 -top-1">
                        <Tooltip
                          slotProps={{
                            tooltip: {
                              className: "!bg-secondary",
                            },
                            arrow: {
                              className: "!text-secondary",
                            },
                          }}
                          title="Διαγραγή Εικόνας"
                          arrow
                        >
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageId(image.id);
                              handleDeletePhoto();
                            }}
                          >
                            <DeleteIcon className="!text-red-600 rounded-full" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
              </ContentSlider>
            </>
          ) : (
            <Typography variant="h2">Δεν υπάρχουν φωτογραφίες</Typography>
          )}
          <ConfirmationPrompt
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => handleConfirmDeletePhoto(activeImageId)}
            title="Confirm Deletion"
            content={`Are you sure you want to delete '${
              user.userImages.find((i) => i.id === activeImageId)?.label ||
              "this image"
            }'?`}
          />
          <UploadUserPhotoDialog
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
          />
        </div>
      </div>
    </>
  );
};
