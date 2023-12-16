import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useUserMutations } from "../hooks/mutations/useUserMutations";
import ConfirmUserPhoneDialog from "./ConfirmUserPhoneDialog";

interface AddUserPhoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserPhoneDialog: React.FC<AddUserPhoneDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("30");
  const { requestPhoneVerification, loading } = useUserMutations();

  useEffect(() => {
    // Validate the phone number when it changes
    const isValid = validatePhoneNumber(phoneNumber);
    setIsValidPhoneNumber(isValid);
  }, [phoneNumber]);

  const validatePhoneNumber = (number: string): boolean => {
    return number.length >= 10; // Just an example, adjust as needed
  };

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    if (isNaN(Number(event.target.value))) return;
    setPhoneNumber(event.target.value);
  };

  const handleChangeCountryCode = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCountryCode(event.target.value as string);
  };

  const handleAddNumber = async () => {
    const res = await requestPhoneVerification(countryCode + phoneNumber);
    res ? setIsVerificationOpen(true) : onClose();
  };

  const handleDone = () => {
    setIsVerificationOpen(false);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle>Add Phone Number</DialogTitle>
      <DialogContent className="flex items-center">
        <FormControl className="flex w-1/4 h-full">
          <InputLabel id="country-code-label">Country Code</InputLabel>
          <Select
            labelId="country-code-label"
            id="country-code"
            value={countryCode}
            variant="filled"
            onChange={handleChangeCountryCode}
          >
            <MenuItem value="1">+1 (US)</MenuItem>
            <MenuItem value="44">+44 (UK)</MenuItem>
            <MenuItem value="30">+30 (GR)</MenuItem>
            {/* Add more country codes as needed */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Phone Number"
          variant="filled"
          value={phoneNumber}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleAddNumber}
          color="secondary"
          disabled={!isValidPhoneNumber}
          endIcon={loading && <CircularProgress size={24} />}
        >
          Add Number
        </Button>
      </DialogActions>
      <ConfirmUserPhoneDialog
        isOpen={isVerificationOpen}
        onClose={handleDone}
        userPhoneNumber={countryCode + phoneNumber}
      />
    </Dialog>
  );
};

export default AddUserPhoneDialog;
