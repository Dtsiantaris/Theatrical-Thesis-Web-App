// pages/user/profile.tsx
import React, { useState } from "react";
import { useUserContext } from "../../src/contexts/UserContext";
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
} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EmailIcon from "@material-ui/icons/Email";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useUserMutations } from "../../src/hooks/userMutations/useUserMutations";

const UserProfile = () => {
  const { user } = useUserContext();
  const { toggle2FA } = useUserMutations();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    user ? user.twoFactorEnabled : false
  );

  const handleTwoFactorSwitch = async () => {
    const newTwoFactorStatus = !twoFactorEnabled;
    const res = await toggle2FA(newTwoFactorStatus);
    if (!res) return;
    setTwoFactorEnabled(newTwoFactorStatus);
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const VerifiedChip: React.FC<{ isVerified: boolean }> = ({ isVerified }) => (
    <Chip
      icon={isVerified ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
      label={isVerified ? "Verified" : "Not Verified"}
      color={isVerified ? "primary" : "secondary"}
      variant="outlined"
      size="small"
    />
  );

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-96">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Profile
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
              {/* <VerifiedChip isVerified={user.twoFactorEnabled} />
               */}
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  size="medium"
                  //TODO: add post to backend for enabling/ disabling
                  onChange={handleTwoFactorSwitch}
                  checked={twoFactorEnabled}
                  checkedIcon={
                    <EnhancedEncryptionIcon style={{ fontSize: 16 }} />
                  }
                  icon={<CloseIcon style={{ fontSize: 16 }} />}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Role" secondary={user.role} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText
                primary="Balance"
                secondary={`$${user.balance.toFixed(2)}`}
              />
            </ListItem>
          </List>
          <Divider className="my-2" />
          <Typography variant="h6" gutterBottom>
            Transactions
          </Typography>
          <List dense>
            {user.transactions && user.transactions.length > 0 ? (
              user.transactions.map((transaction, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={transaction.reason}
                    secondary={`$${transaction.creditAmount.toFixed(2)}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No transactions available" />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
