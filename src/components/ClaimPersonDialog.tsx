import React from "react";
// utils && icons
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AddCard from "@mui/icons-material/AddCard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

interface ClaimPersonDialogProps {
  isOpen: boolean;
  onClose: () => void; // Adjust the type if your function has a different signature
}

const ClaimPersonDialog: React.FC<ClaimPersonDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    //TODO: make this bigger, input for files, general info to the user about this dialog
    <Dialog open={isOpen} onClose={onClose} className="!text-black">
      <DialogTitle className="!text-black bg-white text-base">
        {<AddCard className="mr-2" />}Add Credits
      </DialogTitle>
      <DialogContent className="!text-black bg-white text-base">
        <DialogContentText className="!text-black">
          This is a claim dialog
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "white" }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary">Proceed</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimPersonDialog;
