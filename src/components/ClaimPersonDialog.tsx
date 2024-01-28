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
} from "@mui/material";
import Dropzone from "react-dropzone";
//hooks
import { useUserMutations } from "../hooks/mutations/useUserMutations";
// utils & icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Copyright from "@mui/icons-material/Copyright";
import DownloadIcon from "@mui/icons-material/Download";
import { convertToBase64 } from "../utils/fileTools";

interface ClaimPersonDialogProps {
  personId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ClaimPersonDialog: React.FC<ClaimPersonDialogProps> = ({
  personId,
  isOpen,
  onClose,
}) => {
  const { claimAccount, loading } = useUserMutations();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragAndDropError, setDragAndDropError] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0].type === "application/pdf") {
      setDragAndDropError(false);
      setSelectedFile(acceptedFiles[0]);
    } else {
      setDragAndDropError(true);
      setSelectedFile(null);
    }
  };

  const [isShaking, setIsShaking] = useState(false);

  const handleProceed = async () => {
    if (selectedFile) {
      const base64 = await convertToBase64(selectedFile);
      // Now you have the file in base64 format, you can proceed with further actions
      console.log(base64); // Replace this with your action
      await claimAccount(personId, base64);
    } else {
      setDragAndDropError(true);
      setIsShaking(true);
      // Remove the shaking effect after some time
      setTimeout(() => setIsShaking(false), 1000);
      return;
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
      className={`!text-black ${isShaking ? "animate-shake" : ""}`}
    >
      <DialogTitle className="!text-black bg-gray-100 text-base">
        <Copyright className="mr-2" />
        Claim Profile
      </DialogTitle>
      <DialogContent className="!text-black bg-gray-100 text-base !p-0">
        <div className="border rounded w-full">
          <Box
            component="div"
            bgcolor="#E3F2FD"
            className="flex flex-col items-center p-4"
          >
            <CloudUploadIcon className="mr-3" />{" "}
            <strong>Confirm Identity:</strong>
            <Dropzone onDrop={onDrop} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <section className="dropzone">
                  <div
                    {...getRootProps()}
                    className="dropzone-area border !border-gray-400 p-4 flex flex-col items-center hover:cursor-pointer"
                  >
                    <DownloadIcon />
                    <input {...getInputProps()} type="application/pdf" />

                    <p>Drag n drop some files here, or click to select files</p>
                    <em>(Only *.pdf files will be accepted)</em>
                    {dragAndDropError && (
                      <em className="text-red-500">Wrong type of file</em>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
            {selectedFile && (
              <Typography variant="subtitle1" className="mt-2">
                File selected: {selectedFile.name}
              </Typography>
            )}
          </Box>

          <Box
            component="div"
            bgcolor="#FFF3E0"
            className="flex flex-col items-center p-4"
          >
            <div>
              <VerifiedUserIcon style={{ marginRight: "10px" }} />
              <strong>Profile Ownership:</strong>
            </div>
            <span>
              Ensure that the profile you are claiming belongs to you.
            </span>
          </Box>

          <Box
            component="div"
            bgcolor="#E8F5E9"
            className="flex flex-col items-center p-4"
          >
            <div>
              <EmailIcon style={{ marginRight: "10px" }} />
              <strong>Email Notification:</strong>
            </div>
            <span>
              You will receive a confirmation email after successful submission.
            </span>
          </Box>
        </div>
      </DialogContent>
      <DialogActions className="border-t bg-gray-100">
        <Button
          onClick={onClose}
          className="!bg-red-800 !normal-case !text-base"
        >
          Cancel
        </Button>
        <Button
          onClick={handleProceed}
          className="!bg-sky-800 !normal-case !text-base"
          endIcon={loading && <CircularProgress size={24} />}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimPersonDialog;
