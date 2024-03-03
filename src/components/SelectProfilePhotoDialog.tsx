import React, { useState } from "react";
// mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
// icons
import CloseIcon from "@mui/icons-material/Close";
// interfaces
import { UserPhoto } from "../types/entities/User";
// hooks
import { useUserMutations } from "../hooks/mutations/useUserMutations";
import { useUserQueries } from "../hooks/queries/useUserQueries";

interface SelectProfilePhotoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  existingPhotos: UserPhoto[];
}

const SelectProfilePhotoDialog: React.FC<SelectProfilePhotoDialogProps> = ({
  isOpen,
  onClose,
  existingPhotos,
}) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);

  const { setUserProfilePhoto, loading } = useUserMutations();
  const { fetchUserInfo } = useUserQueries();

  const handleSelectPhoto = (photoId: number) => {
    setSelectedPhotoId(photoId);
  };

  const handleConfirm = async () => {
    // Implement logic for confirming the selected photo
    if (selectedPhotoId !== null) {
      const photo = existingPhotos.find(
        (photo) => photo.id === selectedPhotoId
      );
      if (photo) {
        await setUserProfilePhoto(photo.id, photo.label);
        await fetchUserInfo();
      }
    }
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle className="text-2xl !p-0">
        <div className="bg-primary p-4 flex w-full justify-between items-center">
          <span className="text-xl text-white">Select Profile Photo</span>
          <IconButton
            className="!text-white hover:!text-secondary"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <List>
          {existingPhotos.map((photo) => (
            <ListItem
              key={photo.id}
              button
              selected={selectedPhotoId === photo.id}
              onClick={() => handleSelectPhoto(photo.id)}
              className="flex gap-5"
            >
              <Avatar
                style={{ width: "150px", height: "150px" }}
                src={photo.imageLocation}
                alt={photo.label}
              />
              <ListItemText
                primaryTypographyProps={{
                  style: {
                    fontSize: "23px",
                  },
                }}
                primary={photo.label}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions className="!p-0">
        <div className="bg-primary p-3 flex w-full justify-end gap-2 items-center">
          <Button
            onClick={onClose}
            variant="contained"
            className="text-white !bg-gray-500 hover:!bg-opacity-80"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            className="text-white !bg-secondary hover:!bg-opacity-80"
            disabled={selectedPhotoId === null}
          >
            Confirm
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SelectProfilePhotoDialog;
