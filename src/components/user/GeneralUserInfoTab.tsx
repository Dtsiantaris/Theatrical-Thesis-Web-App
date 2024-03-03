import { useEffect, useState } from "react";
// hooks
import { useUserContext } from "../../contexts/UserContext";
import { useUserMutations } from "../../hooks/mutations/useUserMutations";
import { useUserQueries } from "../../hooks/queries/useUserQueries";
// mui
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from "@mui/material";
// icons
import InfoIcon from "@mui/icons-material/Info";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EmailIcon from "@mui/icons-material/Email";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCard from "@mui/icons-material/AddCard";
// components
import LoadingScene from "../LoadingScene";
import SelectProfilePhotoDialog from "../SelectProfilePhotoDialog";
import UploadUserPhotoDialog from "../UploadUserPhotoDialog";
import { VerifiedChip } from "./VerifiedChip";

export const GeneralUserInfoTab = () => {
  const { user } = useUserContext();

  const { fetchUserInfo, loading } = useUserQueries();
  const { toggle2FA, loading: loadingMutation } = useUserMutations();

  // dialogs state
  const [isSelectProfilePhotoOpen, setIsSelectProfilePhotoOpen] =
    useState(false);
  const [isUploadProfileDialogOpen, setIsUploadProfileDialogOpen] =
    useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // watch for changes
  useEffect(() => {
    if (user) {
      setTwoFactorEnabled(user._2FA_enabled);
    }
  }, [user]);

  const handleTwoFactorSwitch = async () => {
    const newTwoFactorStatus = !twoFactorEnabled;

    try {
      await toggle2FA();
      setTwoFactorEnabled(newTwoFactorStatus);
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      // If there is an error, set the switch back to its previous state.
      setTwoFactorEnabled(!newTwoFactorStatus);
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

  if (!user) return <LoadingScene />;

  return (
    <>
      <div className="relative shadow-2xl flex flex-col gap-3 w-full h-full rounded-2xl p-10  text-white bg-gradient-to-br from-primary to-indigo-900">
        {/* Title */}
        <div className="flex gap-2 items-center text-xl md:text-4xl font-bold">
          Γενικές Πληροφορίες
          <InfoIcon />
        </div>
        <Divider color="white" />
        {/* Content */}

        {/* Profile picture */}
        <div className="flex p-3 rounded-md flex-col md:flex-row md:gap-10">
          {user.profilePhoto && user.profilePhoto.imageLocation ? (
            <div className="flex flex-col gap-2 items-center justify-center h-full">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.profilePhoto.imageLocation}
                  alt="Profile"
                  className="w-[15rem] h-[15rem] rounded-full" // adjust styling as needed
                />
              }
              <Button
                variant="contained"
                className="text-white hover:!opacity-80 !bg-secondary"
                onClick={() => setIsSelectProfilePhotoOpen(true)}
                disabled={loadingMutation || loading}
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
                disabled={loadingMutation || loading}
                className="text-white hover:!opacity-80 !bg-secondary"
                onClick={() => setIsUploadProfileDialogOpen(true)}
                startIcon={<AddAPhotoIcon />}
              >
                Upload Profile Photo
              </Button>
            </div>
          )}
          {/* TODO: maybe a description? */}
          <List className="space-y-10">
            {/* Email */}
            <ListItem>
              <ListItemIcon className="!text-white">
                <EmailIcon />
              </ListItemIcon>
              <ListItemText
                primary="Email"
                secondaryTypographyProps={{
                  color: "wheat",
                }}
                secondary={user.email}
              />
              <ListItemSecondaryAction className="!-right-10">
                <VerifiedChip isVerified={user.emailVerified} />
              </ListItemSecondaryAction>
            </ListItem>
            {/* Two Factor */}
            <ListItem>
              <ListItemIcon className="!text-white">
                <EnhancedEncryptionIcon />
              </ListItemIcon>
              <ListItemText
                primary="Two Factor"
                secondaryTypographyProps={{
                  color: "wheat",
                }}
                secondary={twoFactorEnabled ? "Ενεργό" : "Ανενεργό"}
              />
              <ListItemSecondaryAction className="!-right-10">
                <Switch
                  edge="start"
                  size="medium"
                  onChange={handleTwoFactorSwitch}
                  checked={twoFactorEnabled}
                  color={twoFactorEnabled ? "success" : "error"}
                  checkedIcon={
                    <EnhancedEncryptionIcon style={{ fontSize: 16 }} />
                  }
                  icon={
                    <CloseIcon className="text-red-500 rounded-full border !text-[20px]" />
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
            {/* Balance */}
            <ListItem>
              <ListItemIcon className="!text-white">
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText
                primary="Balance"
                secondaryTypographyProps={{
                  color: "wheat",
                }}
                secondary={`€${user.balance.toFixed(2)}`}
              />
              <ListItemSecondaryAction className="!-right-10">
                <Button
                  variant="contained"
                  className="text-white hover:!opacity-80 !bg-secondary"
                  startIcon={<AddCard />}
                  onClick={handleOpenPaymentDialog}
                  endIcon={loadingMutation && <CircularProgress size={24} />}
                >
                  Add Credits
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </div>
      {/* Dialogs */}
      <SelectProfilePhotoDialog
        isOpen={isSelectProfilePhotoOpen}
        onClose={() => setIsSelectProfilePhotoOpen(false)}
        existingPhotos={user.userImages}
      />
      <UploadUserPhotoDialog
        isOpen={isUploadProfileDialogOpen}
        onClose={() => setIsUploadProfileDialogOpen(false)}
      />
      {/* Backdrop for when payment dialog is open */}
      <Backdrop
        style={{
          zIndex: 1201,
        }}
        open={isPaymentDialogOpen}
      >
        <div className="flex gap-2 items-center">
          <CircularProgress color="inherit" />
          <div style={{ color: "white" }}>Processing Payment...</div>
        </div>
      </Backdrop>
    </>
  );
};
