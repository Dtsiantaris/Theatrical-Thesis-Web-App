import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  TextField,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import { useUserMutations } from "../hooks/mutations/useUserMutations";
import { useUserQueries } from "../hooks/queries/useUserQueries";

interface ConfirmUserPhoneDialogProps {
  isOpen: boolean;
  userPhoneNumber: string;
  onClose: () => void;
}

const ConfirmUserPhoneDialog: React.FC<ConfirmUserPhoneDialogProps> = ({
  isOpen,
  userPhoneNumber,
  onClose,
}) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const { fetchUserInfo } = useUserQueries();
  const { confirmPhoneVerification, loading } = useUserMutations();

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setVerificationCode(event.target.value);
  };

  const handleConfirmNumber = async () => {
    await confirmPhoneVerification(userPhoneNumber, verificationCode);
    await fetchUserInfo();
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Phone Number</DialogTitle>
      <DialogContent>
        <ListItem>
          <ListItemIcon>
            <PermPhoneMsgIcon />
          </ListItemIcon>
          Check your device and provide the verification code that we will send
          you
        </ListItem>
        <TextField
          label="Verification Code"
          variant="outlined"
          fullWidth
          value={verificationCode}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmNumber}
          color="secondary"
          endIcon={loading && <CircularProgress size={24} />}
        >
          Add Number
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUserPhoneDialog;
