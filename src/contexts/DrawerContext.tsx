import React, { createContext, useState } from "react";

export interface DrawerContextData {
  drawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

export const DrawerContext = createContext<DrawerContextData>({
  drawerOpen: false,
  toggleDrawer: () => {},
  closeDrawer: () => {},
});

export function DrawerContextProvider(props: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const context: DrawerContextData = { drawerOpen, toggleDrawer, closeDrawer };

  return (
    <DrawerContext.Provider value={context}>
      {props.children}
    </DrawerContext.Provider>
  );
}
