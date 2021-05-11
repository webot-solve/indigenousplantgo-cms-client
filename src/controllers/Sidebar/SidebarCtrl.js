import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { sidebarLinks } from "./SidebarLinks";

export default function SidebarCtrl() {
  const authContext = useAuth();
  const { userData } = authContext;
  const location = useLocation();
  const { pathname } = location;
  const [sidebarModel, setSidebarModel] = useState({
    dashboard: true,
    plants: false,
    waypoints: false,
    learnmore: false,
    users: false,
    locations: false,
    media: false,
    tags: false,
    profile: false,
  });

  const evaluatePath = () => {
    let currentPath = pathname.split("/").filter((string) => string)[0];
    if (!currentPath || currentPath === undefined) currentPath = "dashboard";

    const newSidebarModel = {
      dashboard: false,
      plants: false,
      waypoints: false,
      learnmore: false,
      users: false,
      locations: false,
      media: false,
      tags: false,
      profile: false,
    };

    newSidebarModel[currentPath] = true;
    setSidebarModel(newSidebarModel);
  };

  useEffect(() => {
    evaluatePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Sidebar
      userData={userData}
      sidebarModel={sidebarModel}
      sidebarLinks={sidebarLinks}
      path={pathname}
    />
  );
}
