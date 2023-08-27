import React, { FC, useContext, useState, ChangeEvent, FormEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  makeStyles,
  Button,
  Theme,
} from "@material-ui/core";
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

  const { isLoggedIn, user } = useUserContext();

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
            <IconButton>
              <PersonIcon />
            </IconButton>
          ) : (
            <Button onClick={redirectLogin} className={classes.loginButton}>
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
