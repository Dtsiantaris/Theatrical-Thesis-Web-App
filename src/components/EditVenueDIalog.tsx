import React, { useState } from "react";
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
} from "@mui/material";
import { useVenueMutations } from "../hooks/mutations/useVenueMutations";

interface EditVenueDialogProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  address: string;
}

const EditVenueDialog: React.FC<EditVenueDialogProps> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [address, setAddress] = useState(props.address);
  const [isError, setIsError] = useState(false);

  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const onConfirm = props.onConfirm;

  const { loading, updateVenue } = useVenueMutations();

  const handleConfirmEdit = async () => {
    if (title.length > 0 && address.length > 0) {
      setIsError(false);
      const res = await updateVenue(props.id, title, address);
      res ? onConfirm() : undefined;
    } else {
      setIsError(true);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle className="text-xl">Edit Venue Details</DialogTitle>
      <DialogContent className="flex flex-col gap-3 items-center">
        <TextField
          fullWidth
          label="Venue Title"
          variant="filled"
          value={title}
          onChange={(v) => setTitle(v.target.value)}
        />
        <TextField
          fullWidth
          label="Venue Address"
          variant="filled"
          value={address}
          onChange={(v) => setAddress(v.target.value)}
        />
      </DialogContent>

      {isError ? (
        <div className="text-red-500 ml-6 mt-3">
          Please fill title and address fields.
        </div>
      ) : (
        ""
      )}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmEdit}
          color="secondary"
          endIcon={loading && <CircularProgress size={24} />}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditVenueDialog;
