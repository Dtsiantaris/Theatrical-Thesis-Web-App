import React, { FC, useContext, useState, ChangeEvent, FormEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Paper,
  Grow,
  ClickAwayListener,
  MenuItem,
  ListItemIcon,
  MenuList,
  Popper,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { DrawerContext } from "../../contexts/DrawerContext";
import NextNprogress from "nextjs-progressbar";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useUserContext } from "../../contexts/UserContext";
import Image from "next/image";

const Navbar: FC = () => {
  const { toggleDrawer } = useContext(DrawerContext);
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { isLoggedIn, user, handleLogout } = useUserContext();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) router.push(`/results?search_query=${searchValue}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleIconClick = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const redirectProfile = () => {
    router.push("/user");
    handleMenuClose();
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
    router.push("/");
    handleMenuClose();
  };

  return (
    <>
      <AppBar className="!z-[2000] !bg-primary" id="navbar">
        <Toolbar className="flex justify-between">
          <IconButton className="!text-secondary" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          {/* Logo name only */}
          <Image
            src="logos/logo-name.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-40 ml-2"
          />
          <form
            onSubmit={handleSubmit}
            className="bg-white w-3/4 flex max-w-xl m-auto "
          >
            <InputBase
              type="search"
              placeholder="Αναζήτηση"
              value={searchValue}
              onChange={handleChange}
              slotProps={{
                input: {
                  className: "!pl-3 !pr-3 !border  text-black",
                },
                root: {
                  className: "!w-full",
                },
              }}
            />
            <Button
              className="!bg-secondary !rounded-full !mr-0.5"
              type="submit"
            >
              <SearchIcon />
            </Button>
          </form>
          {isLoggedIn ? (
            <>
              <IconButton
                className="!text-secondary"
                onClick={handleIconClick}
                aria-controls={menuOpen ? "composition-menu" : undefined}
                aria-expanded={menuOpen ? "true" : undefined}
                aria-haspopup="true"
                ref={anchorRef}
              >
                <PersonIcon />
              </IconButton>
              <Popper
                open={menuOpen}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleMenuClose}>
                        <MenuList
                          className="bg-white rounded-md"
                          autoFocusItem={menuOpen}
                          id="composition-menu"
                          onKeyDown={(event) => {
                            if (event.key === "Tab") {
                              event.preventDefault();
                              handleMenuClose();
                            }
                          }}
                          aria-labelledby="composition-button"
                          role="menu"
                        >
                          <MenuItem onClick={redirectProfile}>
                            <ListItemIcon>
                              <AccountCircleIcon />
                            </ListItemIcon>
                            {user?.email}
                          </MenuItem>
                          <MenuItem onClick={handleLogoutAndRedirect}>
                            <ListItemIcon>
                              <ExitToAppIcon />
                            </ListItemIcon>
                            Αποσύνδεση
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <Button
              className="normal-case bg-purple-200 hover:bg-purple-500"
              onClick={() => router.push("login")}
            >
              Σύνδεση / Εγγραφή
            </Button>
          )}
        </Toolbar>
        <NextNprogress color={theme.palette.secondary.main} />
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
