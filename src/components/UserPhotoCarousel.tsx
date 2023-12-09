import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ConfirmationPrompt from "./ConfirmationPrompt";
import { UserPhoto } from "../types/User";
import UploadUserPhotoDialog from "./UploadUserPhotoDialog";
import { useUserMutations } from "../hooks/mutations/useUserMutations";
import { useUserQueries } from "../hooks/queries/useUserQueries";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const UserPhotoCarousel: React.FC<{ images: UserPhoto[] }> = (children) => {
  const images = children.images;
  console.log("userPhotoCarousel", images);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { deleteUserPhoto } = useUserMutations();
  const { fetchUserInfo } = useUserQueries();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleDeletePhoto = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDeletePhoto = async (id: number) => {
    await deleteUserPhoto(id);
    await fetchUserInfo();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Paper
        className="!bg-zinc-400"
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
        }}
      >
        {images[activeStep]?.label && (
          <Typography>{images[activeStep]?.label}</Typography>
        )}
      </Paper>
      {images.length > 0 && (
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={7000}
          autoplay={!isConfirmOpen}
        >
          {images.map((image, index) => (
            <div key={image.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={image.imageLocation}
                  alt={image.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      )}
      <Box
        className="!bg-zinc-400 border-b"
        sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
      >
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setIsUploadOpen(true)}
        >
          Upload
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={!images.length}
          onClick={handleDeletePhoto}
        >
          Delete
        </Button>
      </Box>
      <MobileStepper
        className="!bg-zinc-400"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1 || !images.length}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <ConfirmationPrompt
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => handleConfirmDeletePhoto(images[activeStep].id)}
        title="Confirm Deletion"
        content={`Are you sure you want to delete '${
          images[activeStep]?.label || "this image"
        }'?`}
      />
      <UploadUserPhotoDialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        isProfile={false}
      />
    </Box>
  );
};

export default UserPhotoCarousel;
