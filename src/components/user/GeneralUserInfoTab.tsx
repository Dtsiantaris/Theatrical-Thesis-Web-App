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
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
// icons
import { Facebook as FacebookIcon } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCard from "@mui/icons-material/AddCard";
import SaveIcon from "@mui/icons-material/Save";
// components
import LoadingScene from "../LoadingScene";
import { VerifiedChip } from "./VerifiedChip";

export const GeneralUserInfoTab = () => {
  const { user } = useUserContext();

  const { fetchUserInfo, loading } = useUserQueries();
  const {
    toggle2FA,
    updateSocial,
    loading: loadingMutation,
  } = useUserMutations();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  // Initial state values for input fields
  const [changesMade, setChangesMade] = useState(false);
  const [initialFacebookLink, setInitialFacebookLink] = useState("");
  const [initialInstagramLink, setInitialInstagramLink] = useState("");
  const [initialYoutubeLink, setInitialYoutubeLink] = useState("");
  // watch for changes
  useEffect(() => {
    if (user) {
      setTwoFactorEnabled(user._2FA_enabled);
      setFacebookLink(user.facebook || "");
      setInstagramLink(user.instagram || "");
      setYoutubeLink(user.youtube || "");
      setInitialFacebookLink(user.facebook || "");
      setInitialInstagramLink(user.instagram || "");
      setInitialYoutubeLink(user.youtube || "");
    }
  }, [user]);

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

  if (!user) return <LoadingScene />;

  return (
    <>
      <div className="relative shadow-2xl flex flex-col gap-3 w-full h-full md:h-[40rem] rounded-2xl p-10  text-white bg-gradient-to-br from-primary to-indigo-900">
        {/* Title */}
        <div className="flex gap-2 items-center text-xl md:text-4xl font-bold">
          Γενικές Πληροφορίες
          <InfoIcon />
        </div>
        <Divider color="white" />
        {/* Content */}
        <div className="flex p-3 rounded-2xl flex-col md:flex-row gap-5 md:gap-20">
          <List className="space-y-2 !py-0 border-l-4 border-secondary rounded-md">
            <div className="bg-secondary rounded-t-md text-white p-2 px-3 text-lg italic">
              Λογαριασμός
            </div>
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
              <ListItemText className="!flex !justify-end">
                <VerifiedChip isVerified={user.emailVerified} />
              </ListItemText>
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
              <ListItemText className="!flex !justify-end">
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
              </ListItemText>
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
              <ListItemText className="!flex !justify-end">
                <Tooltip
                  slotProps={{
                    tooltip: { className: "!bg-secondary" },
                    arrow: { className: "!text-secondary" },
                  }}
                  title="Προσθήκη πόντων"
                  placement="bottom"
                  arrow
                >
                  <IconButton
                    onClick={handleOpenPaymentDialog}
                    className="!text-white hover:!opacity-80 !bg-secondary"
                    disabled={loadingMutation || loading}
                  >
                    <AddCard />
                  </IconButton>
                </Tooltip>
              </ListItemText>
            </ListItem>
          </List>
          {/* Second list */}
          <List className="space-y-2 !py-0 border-l-4 border-secondary rounded-md">
            <div className="bg-secondary rounded-t-md text-white p-2 px-3 text-lg italic flex justify-between items-center">
              <span>Επικοινωνία</span>
              <Tooltip
                slotProps={{
                  tooltip: { className: "!bg-secondary" },
                  arrow: { className: "!text-secondary" },
                }}
                title={"Αποθήκευση αλλαγών"}
                placement="bottom"
                arrow
              >
                <IconButton
                  size="small"
                  className={`!text-primary ${
                    !changesMade && "!text-opacity-70"
                  }`}
                  disabled={!changesMade}
                  onClick={handleSave}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </div>
            <ListItem>
              <ListItemIcon>
                <FacebookIcon className="text-white" />
              </ListItemIcon>
              <TextField
                label="Facebook"
                variant="outlined"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                fullWidth
                inputProps={{
                  className: "!text-white",
                }}
                InputLabelProps={{
                  className: "!text-gray-400",
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InstagramIcon className="text-white" />
              </ListItemIcon>
              <TextField
                label="Instagram"
                variant="outlined"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
                fullWidth
                inputProps={{
                  className: "!text-white",
                }}
                InputLabelProps={{
                  className: "!text-gray-400",
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <YouTubeIcon className="text-white" />
              </ListItemIcon>
              <TextField
                label="YouTube"
                variant="outlined"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                fullWidth
                inputProps={{
                  className: "!text-white",
                }}
                InputLabelProps={{
                  className: "!text-gray-500",
                }}
              />
            </ListItem>
          </List>
          <List className="!py-0 border-l-4 border-secondary rounded-md w-full">
            <div className="bg-secondary rounded-t-md text-white p-2 px-3 text-lg italic">
              Συναλλαγές
            </div>
            {user.transactions?.map((transaction, index) => (
              <ListItem key={index} className="border-b border-gray-300">
                <ListItemText
                  primary={transaction.reason}
                  secondaryTypographyProps={{ color: "wheat" }}
                  secondary={new Date(transaction.dateCreated).toLocaleString()}
                />
                <ListItemText className="!flex !justify-end">
                  <span className="text-white">
                    {transaction.creditAmount > 0 ? "+" : "-"}€
                    {Math.abs(transaction.creditAmount).toFixed(2)}
                  </span>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
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
