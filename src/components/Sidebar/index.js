import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

/*
  @desc UI component that displays a sidebar navigation.
  @controller ~/src/controller/Sidebar/SidebarCtrl
*/
export default function Sidebar({
  sidebarLinks,
  path,
  sidebarModel,
  userData,
}) {
  return (
    <aside className="sidebar">
      <ul>
        {sidebarLinks.map((item, index) => (
          <MenuItem
            sidebarModel={sidebarModel}
            path={path}
            key={index}
            label={item.label}
            formattedLabel={item.formattedLabel}
            navigationPath={item.navigationPath}
            subItems={item.subItems}
          />
        ))}

        <li>
          <Link to="/profile">
            <span
              className={
                sidebarModel["profile"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <span style={style.initial}>
                {" "}
                {userData?.user?.user_name[0].toUpperCase()}
              </span>
              <span className="menu__item item__label">
                {" "}
                {userData?.user?.user_name}
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

const style = {
  initial: {
    height: "26px",
    width: "26px",
    backgroundColor: "var(--highlight)",
    border: "1px solid var(--highlightsecondary)",
    color: "var(--lightprimary)",
    borderRadius: "50%",
    lineHeight: "24px",
    textAlign: "center",
    fontFamily: "serif, Times",
    display: "block",
    cursor: "pointer",
    fontSize: 14,
  },
};
