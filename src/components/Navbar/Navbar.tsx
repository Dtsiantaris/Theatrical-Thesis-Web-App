import React, { FC, useContext, useState, ChangeEvent, FormEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  makeStyles,
  Button,
  Theme,
  Popover,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import style from "../../assets/jss/components/navbarStyle";
import SearchIcon from "@material-ui/icons/Search";
import { DrawerContext } from "../../contexts/DrawerContext";
import NextNprogress from "nextjs-progressbar";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useUserContext } from "../../contexts/UserContext";

const useStyles = makeStyles(style);

const Navbar: FC = () => {
  const classes = useStyles();
  const { toggleDrawer } = useContext(DrawerContext);
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState<string>("");

  const { isLoggedIn, user, handleLogout } = useUserContext();

  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) router.push(`/results?search_query=${searchValue}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const redirectLogin = () => {
    router.push("/login");
  };

  const redirectProfile = () => {
    router.push("/user");
  };

  //profile icon
  // Dropdown state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Handle opening the dropdown
  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the dropdown
  const handleLogoutAndRedirect = () => {
    handleClose();
    handleLogout(); // Call the logout function from the context
    router.push("/"); // Redirect to the home page
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar className={classes.appbar} id="navbar">
        <Toolbar className={classes.navbar}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <form onSubmit={handleSubmit} className={classes.search}>
            <InputBase
              type="search"
              placeholder="Αναζήτηση"
              value={searchValue}
              onChange={handleChange}
              classes={{ input: classes.searchInput, root: classes.searchRoot }}
            />
            <Button className={classes.searchIcon} type="submit">
              <SearchIcon />
            </Button>
          </form>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleIconClick}>
                <PersonIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className={classes.popOverModal}>
                  <ListItem style={{ width: "100%" }}>
                    <Button
                      className={classes.profileButton}
                      onClick={redirectProfile}
                    >
                      {user?.email}
                      <AccountCircleIcon style={{ marginLeft: "4px" }} />
                    </Button>
                  </ListItem>
                  <ListItem style={{ width: "100%" }}>
                    <Button
                      onClick={handleLogoutAndRedirect}
                      className={classes.logoutButton}
                    >
                      Αποσύνδεση
                      <ExitToAppIcon style={{ marginLeft: "4px" }} />
                    </Button>
                  </ListItem>
                </div>
              </Popover>
            </>
          ) : (
            <Button className={classes.loginButton} onClick={redirectLogin}>
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
