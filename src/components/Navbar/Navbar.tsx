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
import style from "../../assets/jss/components/navbarStyle";
import SearchIcon from "@material-ui/icons/Search";
import { DrawerContext } from "../../contexts/DrawerContext";
import NextNprogress from "nextjs-progressbar";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles(style);

const Navbar: FC = () => {
  const classes = useStyles();
  const { toggleDrawer } = useContext(DrawerContext);
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) router.push(`/results?search_query=${searchValue}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
        </Toolbar>
        <NextNprogress color={theme.palette.secondary.main} />
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
