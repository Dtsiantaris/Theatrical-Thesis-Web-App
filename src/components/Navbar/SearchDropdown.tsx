import React, { ChangeEvent, useState } from "react";
import { Button, ClickAwayListener, Grow, Paper, Popper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

interface SearchDropdownProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="hidden sm:flex w-full bg-white rounded">
        <InputBase
          type="search"
          placeholder="Αναζήτηση"
          value={value}
          onChange={onChange}
          slotProps={{
            input: {
              className: "!pl-3 !pr-3 !border  text-black",
            },
            root: {
              className: "!w-full",
            },
          }}
        />
        <Button className="!bg-secondary !rounded-full !mr-0.5" type="submit">
          <SearchIcon />
        </Button>
      </div>
      <div className="sm:hidden flex bg-secondary rounded">
        <Button
          onClick={toggleDropdown}
          aria-controls={isOpen ? "composition-menu" : undefined}
          aria-expanded={isOpen ? "true" : undefined}
          aria-haspopup="true"
          ref={anchorRef}
        >
          <SearchIcon />
        </Button>
        <Popper
          open={isOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper className="!bg-white !pl-2 !-translate-x-2">
                <ClickAwayListener onClickAway={handleClose}>
                  <div className="mt-5">
                    <InputBase
                      placeholder="Αναζήτηση..."
                      value={value}
                      onChange={onChange}
                      inputProps={{ "aria-label": "Αναζήτηση.." }}
                      className="w-80"
                    />
                    <Button
                      className="!bg-secondary !rounded-full !mr-0.5"
                      type="submit"
                    >
                      <SearchIcon />
                    </Button>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </>
  );
};

export default SearchDropdown;
