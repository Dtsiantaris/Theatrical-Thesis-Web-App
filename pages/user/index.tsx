import React, { useEffect, useState } from "react";
//hooks
import { useUserContext } from "../../src/contexts/UserContext";
import { useUserMutations } from "../../src/hooks/mutations/useUserMutations";
import { useUserQueries } from "../../src/hooks/queries/useUserQueries";
// components
import UserPhotoCarousel from "../../src/components/UserPhotoCarousel";
import UploadUserPhotoDialog from "../../src/components/UploadUserPhotoDialog";
import AddRolesDialog from "../../src/components/AddUserRoleDialog";
import AddUserPhoneDialog from "../../src/components/AddUserPhoneDialog";
import AddBioDialog from "../../src/components/AddBioDialog";
import ClaimedEventsList from "../../src/components/ClaimedEventsDialog";
import ClaimedVenuesList from "../../src/components/ClaimedVenuesDialog";
// utils & icons
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Switch,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
  Chip,
} from "@mui/material";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PermIdentity from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";

import CloseIcon from "@mui/icons-material/Close";
import { Facebook as FacebookIcon } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SaveIcon from "@mui/icons-material/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddCard from "@mui/icons-material/AddCard";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EventIcon from "@mui/icons-material/Event";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PhoneIcon from "@mui/icons-material/Phone";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SelectProfilePhotoDialog from "../../src/components/SelectProfilePhotoDialog";
import { VerifiedChip } from "../../src/components/user/VerifiedChip";

const UserProfile = () => {
  const { user } = useUserContext();
  const { fetchUserInfo, loading } = useUserQueries();
  const {
    toggle2FA,
    updateSocial,
    removeRole,
    loading: loadingMutation,
  } = useUserMutations();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  // State to track if any changes have been made to the input fields
  const [changesMade, setChangesMade] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isUploadProfileDialogOpen, setIsUploadProfileDialogOpen] =
    useState(false);

  const [isSelectProfilePhotoOpen, setIsSelectProfilePhotoOpen] =
    useState(false);

  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isAddPhoneDialogOpen, setIsAddPhoneDialogOpen] = useState(false);
  const [isAddBioDialogOpen, setIsAddBioDialogOpen] = useState(false);

  const [isClaimedEventsListOpen, setIsClaimedEventsListOpen] = useState(false);
  const [isClaimedVenuesListOpen, setIsClaimedVenuesListOpen] = useState(false);
  // Initial state values for input fields
  const [initialFacebookLink, setInitialFacebookLink] = useState("");
  const [initialInstagramLink, setInitialInstagramLink] = useState("");
  const [initialYoutubeLink, setInitialYoutubeLink] = useState("");

  // set inputs fields as controlled components
  useEffect(() => {
    if (user) {
      setTwoFactorEnabled(user._2FA_enabled);
      setFacebookLink(user.facebook || "");
      setInstagramLink(user.instagram || "");
      setYoutubeLink(user.youtube || "");
    }
  }, [user, twoFactorEnabled]);

  useEffect(() => {
    async function fetchData() {
      await fetchUserInfo();
    }
    // You can use fetchData directly if it doesn't change, or include it in the dependency array.
    fetchData();

    if (user) {
      setTwoFactorEnabled(user._2FA_enabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twoFactorEnabled]);

  useEffect(() => {
    // Set initial input field values
    if (user) {
      console.log("hi there", user);
      setInitialFacebookLink(user.facebook || "");
      setInitialInstagramLink(user.instagram || "");
      setInitialYoutubeLink(user.youtube || "");
      console.log("initial called");
    }
  }, [user]); // This effect runs only once when the component mounts or when the user changes

  // Check if there have been changes to the input fields
  useEffect(() => {
    setChangesMade(
      initialFacebookLink !== facebookLink ||
        initialInstagramLink !== instagramLink ||
        initialYoutubeLink !== youtubeLink
    );
  }, [
    facebookLink,
    instagramLink,
    youtubeLink,
    initialFacebookLink,
    initialInstagramLink,
    initialYoutubeLink,
  ]);

  const handleTwoFactorSwitch = async () => {
    const newTwoFactorStatus = !twoFactorEnabled;

    try {
      await toggle2FA();
      setTwoFactorEnabled(newTwoFactorStatus);
      await fetchUserInfo();
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      // If there is an error, set the switch back to its previous state.
      setTwoFactorEnabled(!newTwoFactorStatus);
    }
  };

  const handleSave = async () => {
    const facebookFlag = initialFacebookLink !== facebookLink;
    const instagramFlag = initialInstagramLink !== instagramLink;
    const youtubeFlag = initialYoutubeLink !== youtubeLink;

    try {
      if (facebookFlag) {
        await updateSocial(facebookLink, "facebook");
      }
      if (instagramFlag) {
        await updateSocial(instagramLink, "instagram");
      }
      if (youtubeFlag) {
        await updateSocial(youtubeLink, "youtube");
      }
    } finally {
      await fetchUserInfo();
    }
  };

  const handleOpenPaymentDialog = () => {
    const url =
      "https://theatricalapi.jollybay-0ad0b06b.germanywestcentral.azurecontainerapps.io/api/stripe/create-checkout-session";
    const popup = window.open(
      url,
      "PaymentWindow",
      `width=600,height=800,
      top=${window.screenTop + (window.outerHeight - 800) / 2},
      left=${window.screenLeft + (window.outerWidth - 600) / 2}`
    );

    if (popup) {
      setIsPaymentDialogOpen(true); // Show overlay
      const checkPopupClosed = setInterval(async () => {
        if (!popup || popup.closed) {
          clearInterval(checkPopupClosed);
          setIsPaymentDialogOpen(false); // Hide overlay when popup is closed
          await fetchUserInfo();
        }
      }, 500);
    }
  };

  const handleRemoveRole = async (role: string) => {
    await removeRole(role);
    await fetchUserInfo();
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-wrap pl-16 pr-2 md:no-wrap md:p-0 justify-center gap-4 md:mt-10">
        {/* Personal Information Card */}
        <Card className="w-full md:w-96">
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              className="flex items-center justify-between mb-4"
            >
              <div>
                <AccountBoxIcon className="mr-1" />
                User Profile
              </div>
              <Button
                variant="contained"
                color="secondary"
                disabled={!changesMade}
                startIcon={<SaveIcon />}
                endIcon={
                  (loading || loadingMutation) && <CircularProgress size={24} />
                }
                onClick={handleSave}
                className="mt-4 w-[12rem]"
              >
                Save Changes
              </Button>
            </Typography>
            <List>
              <ListItem>
                {user.profilePhoto && user.profilePhoto.imageLocation ? (
                  <div className="flex items-center justify-between w-full">
                    {
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.profilePhoto.imageLocation}
                        alt="Profile"
                        className="w-20 h-20 rounded-full mr-4" // adjust styling as needed
                      />
                    }
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setIsSelectProfilePhotoOpen(true)}
                      startIcon={<AddAPhotoIcon />}
                    >
                      Change Profile Photo
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full mr-4 bg-gray-200">
                      {/* Placeholder content, e.g., an upload icon or text */}
                      <CameraAltIcon className="mr-1" />
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setIsUploadProfileDialogOpen(true)}
                    >
                      Upload Profile Photo
                    </Button>
                  </div>
                )}
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={user.email} />
                <VerifiedChip isVerified={user.emailVerified} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EnhancedEncryptionIcon />
                </ListItemIcon>
                <ListItemText primary="Two Factor" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="start"
                    size="medium"
                    onChange={handleTwoFactorSwitch}
                    checked={twoFactorEnabled}
                    checkedIcon={
                      <EnhancedEncryptionIcon style={{ fontSize: 16 }} />
                    }
                    icon={
                      <CloseIcon className="text-red-500 rounded-full border !text-[20px]" />
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Balance"
                  secondary={`€${user.balance.toFixed(2)}`}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddCard />}
                  onClick={handleOpenPaymentDialog}
                  endIcon={
                    (loading || loadingMutation) && (
                      <CircularProgress size={24} />
                    )
                  }
                  className="mt-4 w-[12rem]"
                >
                  Add Credits
                </Button>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FacebookIcon />
                </ListItemIcon>
                <TextField
                  label="Facebook"
                  variant="outlined"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
                <TextField
                  label="Instagram"
                  variant="outlined"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <YouTubeIcon />
                </ListItemIcon>
                <TextField
                  label="YouTube"
                  variant="outlined"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  fullWidth
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Professional Details Card */}
        <Card className="w-full md:w-96">
          <CardContent>
            <Typography variant="h5" gutterBottom className="mb-4">
              <WorkOutlineIcon className="mr-1" />
              Professional Details
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText
                  primary="User biography"
                  secondary={
                    <Button
                      color="secondary"
                      variant="text"
                      disabled={!user?.bioPdfLocation}
                      endIcon={<FileDownloadIcon />}
                    >
                      Download Bio
                    </Button>
                  }
                />
                {user?.bioPdfLocation ? (
                  <Button className="bg-red-500" variant="text">
                    Remove Bio
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => setIsAddBioDialogOpen(true)}
                    startIcon={<PersonAddIcon />}
                  >
                    Add Bio
                  </Button>
                )}
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Claimed events"
                  secondary={user.claimedEvents.length}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={!user.claimedEvents.length}
                  onClick={() => setIsClaimedEventsListOpen(true)}
                >
                  <VisibilityIcon />
                </Button>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <FolderSharedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Claimed venues"
                  secondary={user.claimedVenues.length}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setIsClaimedVenuesListOpen(true)}
                >
                  <VisibilityIcon />
                </Button>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="flex justify-between w-full">
                      Phone Number
                      {!user?.phoneNumber ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setIsAddPhoneDialogOpen(true)}
                          startIcon={<AddIcCallIcon />}
                        >
                          Add number
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  }
                  secondary={
                    <div className="flex justify-between mt-3">
                      {user?.phoneNumber || "No phone number provided"}
                      <VerifiedChip isVerified={!!user?.phoneNumberVerified} />
                    </div>
                  }
                />
                <div></div>
              </ListItem>

              <ListItem className="flex">
                <ListItemIcon>
                  <PermIdentity />
                </ListItemIcon>
                <ListItemText
                  primary="Role"
                  className="capitalize"
                  secondary={
                    <div className="flex flex-wrap gap-1 mt-5">
                      {user.performerRoles && user.performerRoles.length > 0
                        ? user.performerRoles.map((role, index) => (
                            <Chip
                              key={index}
                              label={role}
                              onDelete={() => handleRemoveRole(role)}
                              className="mr-2" // Add some margin between chips
                            />
                          ))
                        : "No roles available"}
                    </div>
                  }
                />
                <Button
                  className="self-start !w-[17rem]"
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsRoleDialogOpen(true)}
                  startIcon={<PersonAddIcon />}
                >
                  Add role
                </Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Photo Gallery Card */}
        <Card className="w-full md:w-96 justify-center">
          <CardContent className="h-full flex flex-col">
            <Typography variant="h5" gutterBottom className="mb-4">
              <CameraAltIcon className="mr-1" />
              Photo Gallery
            </Typography>
            <div className="w-full flex flex-grow justify-center items-center">
              <UserPhotoCarousel images={user.userImages} />
            </div>
          </CardContent>
        </Card>
      </div>

      <UploadUserPhotoDialog
        isOpen={isUploadProfileDialogOpen}
        onClose={() => setIsUploadProfileDialogOpen(false)}
      />

      <SelectProfilePhotoDialog
        isOpen={isSelectProfilePhotoOpen}
        onClose={() => setIsSelectProfilePhotoOpen(false)}
        existingPhotos={user.userImages}
      />

      <AddRolesDialog
        existingRoles={user?.performerRoles}
        isOpen={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
      />

      <AddUserPhoneDialog
        isOpen={isAddPhoneDialogOpen}
        onClose={() => setIsAddPhoneDialogOpen(false)}
      />

      <AddBioDialog
        isOpen={isAddBioDialogOpen}
        onClose={() => setIsAddBioDialogOpen(false)}
      />

      <ClaimedEventsList
        isOpen={isClaimedEventsListOpen}
        onClose={() => setIsClaimedEventsListOpen(false)}
        claimedEvents={user.claimedEvents}
      />

      <ClaimedVenuesList
        isOpen={isClaimedVenuesListOpen}
        onClose={() => setIsClaimedVenuesListOpen(false)}
        claimedVenues={user.claimedVenues}
      />

      {/* Backdrop for when payment dialog is open */}
      <Backdrop style={{ zIndex: 1201 }} open={isPaymentDialogOpen}>
        <div className="flex gap-2 items-center">
          <CircularProgress color="inherit" />
          <div style={{ color: "white" }}>Processing Payment...</div>
        </div>
      </Backdrop>
    </div>
  );
};

export default UserProfile;
