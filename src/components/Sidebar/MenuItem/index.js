import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardIcon,
  PlantIcon,
  CompassIcon,
  InfoIcon,
  UsersIcon,
  LocationIcon,
  MediaIcon,
  TagIcon,
  TourIcon,
} from "../../../icons";

/*
  @desc UI component that renders a menu item.
  @controller ../Sidebar/index.js
*/
export default function MenuItem({
  label,
  formattedLabel,
  navigationPath,
  subItems,
  sidebarModel,
  path,
}) {
  return (
    <li>
      <Link to={navigationPath}>
        <span
          className={
            sidebarModel[`${label}`]
              ? "menu__item item__wrap parent active"
              : "menu__item item__wrap parent"
          }
        >
          {renderIcon(label)}
          <span className="menu__item item__label">{formattedLabel}</span>
        </span>
      </Link>
      <ul
        className={
          sidebarModel[`${label}`]
            ? "menu__item sub__menu active"
            : "menu__item sub__menu"
        }
      >
        {subItems &&
          subItems.length > 0 &&
          subItems.map((item, index) => (
            <li key={index}>
              <Link to={item.navigationPath}>
                <span
                  className={
                    path === item.navigationPath
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">{item.label}</span>
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </li>
  );
}

const renderIcon = (label) => {
  switch (label) {
    case "dashboard":
      return <DashboardIcon />;
    case "waypoints":
      return <CompassIcon />;
    case "plants":
      return <PlantIcon />;
    case "learnmore":
      return <InfoIcon />;
    case "users":
      return <UsersIcon />;
    case "locations":
      return <LocationIcon />;
    case "tags":
      return <TagIcon />;
    case "media":
      return <MediaIcon />;
    case "tours":
      return <TourIcon />;
    default:
      return <PlantIcon />;
  }
};
