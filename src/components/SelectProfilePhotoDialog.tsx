import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Avatar,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { UserPhoto } from "../types/User";
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
      <DialogTitle className="text-2xl">Select Profile Photo</DialogTitle>
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
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="secondary"
          disabled={selectedPhotoId === null}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectProfilePhotoDialog;
