// pages/user/profile.tsx
import React, { useEffect, useState } from "react";
//hooks
import { useUserContext } from "../../src/contexts/UserContext";
import { useUserMutations } from "../../src/hooks/mutations/useUserMutations";
// components
import PaymentDialog from "../../src/components/PaymentDialog";
import UserPhotoCarousel from "../../src/components/UserPhotoCarousel";
// utils & icons
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  ListItemSecondaryAction,
  Switch,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PermIdentity from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CloseIcon from "@material-ui/icons/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SaveIcon from "@material-ui/icons/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddCard from "@mui/icons-material/AddCard";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import EventIcon from "@mui/icons-material/Event";
import FolderSharedIcon from "@mui/icons-material/FolderShared";

import { useUserQueries } from "../../src/hooks/queries/useUserQueries";

const UserProfile = () => {
  const { user } = useUserContext();
  const { fetchUserInfo, loading } = useUserQueries();
  const {
    toggle2FA,
    updateSocial,
    loading: loadingMutation,
  } = useUserMutations();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  // State to track if any changes have been made to the input fields
  const [changesMade, setChangesMade] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");

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
      console.log("fb link changed", user);
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
      await toggle2FA(newTwoFactorStatus);
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
    setIsPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const VerifiedChip: React.FC<{ isVerified: boolean }> = ({ isVerified }) => (
    <Chip
      icon={isVerified ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
      label={isVerified ? "Verified" : "Not Verified"}
      variant="outlined"
      size="small"
      className={isVerified ? "!bg-green-500" : "!bg-red-500"}
    />
  );

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
                  <PermIdentity />
                </ListItemIcon>
                <ListItemText
                  primary="Role"
                  secondary={user.role}
                  className="capitalize"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Balance"
                  secondary={`$${user.balance.toFixed(2)}`}
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
                  <CoPresentIcon />
                </ListItemIcon>
                <ListItemText primary="Linked-artist" secondary={user.email} />
                <VerifiedChip isVerified={user.emailVerified} />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Linked-events" secondary={user.email} />
                <VerifiedChip isVerified={user.emailVerified} />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FolderSharedIcon />
                </ListItemIcon>
                <ListItemText primary="Linked-events" secondary={user.email} />
                <VerifiedChip isVerified={user.emailVerified} />
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
              <UserPhotoCarousel />
            </div>
          </CardContent>
        </Card>
      </div>

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={handleClosePaymentDialog}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
      />
    </div>
  );
};

export default UserProfile;
