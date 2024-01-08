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
} from "@material-ui/core";
import { Event } from "../types/Event";

interface ClaimedEventsListProps {
  claimedEvents: Event[];
  isOpen: boolean;
  onClose: () => void;
}

const ClaimedEventsList: React.FC<ClaimedEventsListProps> = ({
  claimedEvents,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
      <DialogTitle>Claimed Events</DialogTitle>
      <DialogContent>
        <List>
          {claimedEvents.map((event, index) => (
            <React.Fragment key={event.venueId}>
              <ListItem>
                <ListItemText
                  primary={event.production.title}
                  secondary={`Date: ${event.dateEvent}`} // Adjust this based on your event data structure
                />
                <Button variant="contained" color="primary">
                  Redirect
                </Button>
              </ListItem>
              {index < claimedEvents.length - 1 && <Divider />}
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

export default ClaimedEventsList;
