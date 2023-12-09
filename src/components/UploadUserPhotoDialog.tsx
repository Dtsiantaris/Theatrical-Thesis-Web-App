import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
// utils & icons
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LabelIcon from "@mui/icons-material/Label";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useUserMutations } from "../hooks/mutations/useUserMutations";
import { useUserQueries } from "../hooks/queries/useUserQueries";

interface UploadPhotoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isProfile: boolean;
}

const UploadUserPhotoDialog: React.FC<UploadPhotoDialogProps> = ({
  isOpen,
  onClose,
  isProfile,
}) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [label, setLabel] = useState("");

  const { uploadUserPhoto, loading } = useUserMutations();
  const { fetchUserInfo } = useUserQueries();

  const handleUpload = async () => {
    await uploadUserPhoto(photoUrl, label, isProfile);
    await fetchUserInfo();
    onClose(); // Close dialog after "upload"
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle>
        <PhotoCameraIcon className="mr-2" />
        Upload Photo
      </DialogTitle>
      <DialogContent>
        <Box component="div" className="flex flex-col items-center p-4">
          <TextField
            fullWidth
            label="Photo URL"
            variant="outlined"
            className="mb-4"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <TextField
            fullWidth
            label="Label"
            variant="outlined"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          {isProfile && (
            <Typography variant="subtitle1" className="mt-2">
              <CheckCircleOutlineIcon className="mr-1" />
              This is a profile photo.
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          color="primary"
          endIcon={loading && <CircularProgress size={24} />}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadUserPhotoDialog;
