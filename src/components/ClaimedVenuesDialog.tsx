import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Venue } from "../types/Venue";
import { useRouter } from "next/router";

interface ClaimedVenuesListProps {
  claimedVenues: Venue[];
  isOpen: boolean;
  onClose: () => void;
}

const ClaimedVenuesList: React.FC<ClaimedVenuesListProps> = ({
  claimedVenues,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle className="text-2xl">Claimed Venues</DialogTitle>
      <DialogContent>
        <List>
          {claimedVenues.map((venue, index) => (
            <React.Fragment key={venue.id}>
              <ListItem>
                <ListItemText
                  primary={venue.title}
                  secondary={venue.address} // Adjust this based on your event data structure
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/venues/${venue.id}`)}
                >
                  <CallMadeIcon />
                </Button>
              </ListItem>
              {index < claimedVenues.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimedVenuesList;
