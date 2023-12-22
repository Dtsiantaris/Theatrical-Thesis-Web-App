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
} from "@material-ui/core";
import { useVenueMutations } from "../hooks/mutations/useVenueMutations";

interface EditVenueDialogProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  address: string;
}

const EditVenueDialog: React.FC<EditVenueDialogProps> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [address, setAddress] = useState(props.address);
  const [isError, setIsError] = useState(false);

  const isOpen = props.isOpen;
  const onClose = props.onClose;

  const { loading, updateVenue } = useVenueMutations();

  const handleConfirmEdit = async () => {
    if (title.length > 0 && address.length > 0) {
      setIsError(false);
      const res = await updateVenue(props.id, title, address);
      res ? onClose() : undefined;
    } else {
      setIsError(true);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle>Add Phone Number</DialogTitle>
      <DialogContent className="flex items-center">
        <FormControl className="flex w-1/4 h-full">
          <InputLabel>Country Code</InputLabel>
        </FormControl>
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
        <div className="text-red-500">
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
          Add Number
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditVenueDialog;
