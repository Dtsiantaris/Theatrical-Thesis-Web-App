import * as React from "react";
// next
import { useRouter } from "next/router";
import Link from "next/link";
// mui
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Collapse, Tooltip } from "@mui/material";
//icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// context
import { DrawerContext } from "../../contexts/DrawerContext";
import { useUserContext } from "../../contexts/UserContext";
// routes
import routes, { Route } from "../../routes";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      borderRight: "none", // Override border-right style
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      borderRight: "none", // Override border-right style
    },
  }),
}));

const Sidebar = () => {
  const { isLoggedIn } = useUserContext();
  const router = useRouter();
  const filteredRoutes: Route[] = routes.filter((route) =>
    route.condition ? route.condition(isLoggedIn) : true
  );
  const theme = useTheme();
  const { drawerOpen, closeDrawer } = React.useContext(DrawerContext);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={drawerOpen}>
      <DrawerHeader>
        <IconButton onClick={closeDrawer}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List className="bg-primary h-full">
        {filteredRoutes.map((route: Route) => (
          <React.Fragment key={route.name}>
            {route.path !== "/dashboard" ? (
              <Link href={route.pathOnClick || route.path} key={route.name}>
                <Tooltip
                  slotProps={{
                    tooltip: {
                      className: "!bg-secondary",
                    },
                    arrow: {
                      className: "!text-secondary",
                    },
                  }}
                  title={route.name}
                  placement="right"
                  arrow
                  disableHoverListener={drawerOpen}
                >
                  <ListItemButton
                    className={
                      (
                        route.path === "/"
                          ? router.pathname === "/"
                          : router.pathname.startsWith(route.path)
                      )
                        ? "!text-secondary"
                        : "!text-white"
                    }
                    sx={{
                      color: "white",
                      minHeight: 48,
                      justifyContent: drawerOpen ? "initial" : "center",
                      px: 2.5,
                    }}
                    selected={
                      route.path === "/"
                        ? router.pathname === "/"
                        : router.pathname.startsWith(route.path)
                    }
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        minWidth: 0,
                        mr: drawerOpen ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={route.name}
                      sx={{ opacity: drawerOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            ) : (
              <React.Fragment>
                <Link href={route.pathOnClick || route.path} key={route.name}>
                  <Tooltip
                    slotProps={{
                      tooltip: {
                        className: "!bg-secondary",
                      },
                      arrow: {
                        className: "!text-secondary",
                      },
                    }}
                    title={route.name}
                    placement="right"
                    arrow
                    disableHoverListener={drawerOpen}
                  >
                    <ListItemButton
                      onClick={handleClick}
                      className={
                        router.pathname.startsWith(route.path)
                          ? "!text-secondary"
                          : "!text-white"
                      }
                      sx={{
                        color: "white",
                        minHeight: 48,
                        justifyContent: drawerOpen ? "initial" : "center",
                        px: 2.5,
                      }}
                      selected={router.pathname.startsWith(route.path)}
                    >
                      <ListItemIcon
                        sx={{
                          color: "inherit",
                          minWidth: 0,
                          mr: drawerOpen ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={route.name}
                        sx={{ opacity: drawerOpen ? 1 : 0 }}
                      />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </Tooltip>
                </Link>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {route.subitems?.map((subitem) => (
                      <Link href={subitem.path} key={subitem.name}>
                        <Tooltip
                          slotProps={{
                            tooltip: {
                              className: "!bg-secondary",
                            },
                            arrow: {
                              className: "!text-secondary",
                            },
                          }}
                          title={subitem.name}
                          placement="right"
                          arrow
                          disableHoverListener={drawerOpen}
                        >
                          <ListItemButton
                            className={
                              router.pathname.startsWith(subitem.path)
                                ? "!text-secondary"
                                : "!text-white"
                            }
                            sx={{
                              color: "white",
                              minHeight: 48,
                              justifyContent: drawerOpen ? "initial" : "center",
                              px: 5,
                            }}
                            selected={router.pathname.startsWith(subitem.path)}
                          >
                            {/* Render the icon for the subitem if needed */}
                            {/* Render the name of the subitem */}
                            <ListItemIcon
                              sx={{
                                color: "inherit",
                                minWidth: 0,
                                mr: drawerOpen ? 3 : "auto",
                                justifyContent: "center",
                              }}
                            >
                              {subitem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subitem.name}
                              sx={{ opacity: drawerOpen ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </Tooltip>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
