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

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void; // Adjust the type if your function has a different signature
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onClose,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="!text-black">
      <DialogTitle className="!text-black bg-white text-base">
        {<AddCard className="mr-2" />}Add Credits
      </DialogTitle>
      <DialogContent className="!text-black bg-white text-base">
        <DialogContentText className="!text-black">
          Select your payment method.
        </DialogContentText>
        <RadioGroup
          aria-label="payment method"
          aria-labelledby="demo-radio-buttons-group-label"
          name="payment-method"
          value={selectedPaymentMethod}
          className="flex flex-col items-start"
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            labelPlacement="start"
            label={
              <div className="flex items-center">
                <LocalParkingIcon className="mr-2" /> PayPal
              </div>
            }
            value="paypal"
            control={<Radio style={{ color: "cadetblue" }} />}
          />
          <FormControlLabel
            labelPlacement="start"
            label={
              <div className="flex items-center">
                <CreditCardIcon className="mr-2" />{" "}
                {/* Replace with your icon */}
                Visa
              </div>
            }
            value="visa"
            control={<Radio style={{ color: "cadetblue" }} />}
          />
          <FormControlLabel
            labelPlacement="start"
            label={
              <div className="flex items-center">
                <AccountBalanceIcon className="mr-2" />{" "}
                {/* Replace with your icon */}
                Debit Card
              </div>
            }
            value="debit"
            control={<Radio style={{ color: "cadetblue" }} />}
          />
          {/* Add more options as needed */}
        </RadioGroup>
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

export default PaymentDialog;
