import React from "react";
import { parseDate } from "../../../../utility";
import { Link } from "react-router-dom";

/*
  @desc UI component that renders a table of plants.
  @controller ../Waypoints/index.js
*/
export default function Table({
  waypointData,
  selectedWaypoints,
  handleSelected,
  handleDelete,
}) {
  return (
    <ul className="table__list">
      {waypointData &&
        waypointData.length > 0 &&
        waypointData.map((waypoint, index) => {
          const lastRevision = {
            date: parseDate(waypoint.revision_history[0].date),
            user: waypoint.revision_history[0].user[0]?.user_name,
          };

          return (
            <li
              className={
                selectedWaypoints.includes(waypoint._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={waypoint._id}
                  checked={
                    selectedWaypoints.includes(waypoint._id) ? true : false
                  }
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{waypoint.waypoint_name}</p>
                <span className="action">
                  <Link
                    to={`/waypoints/edit/${waypoint._id}`}
                    type="button"
                    value={waypoint._id}
                  >
                    Edit&nbsp;
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e)}
                    value={waypoint._id}
                  >
                    &nbsp;Delete
                  </button>
                </span>
              </div>
              <div className="table__col author">
                <p>
                  {waypoint &&
                  waypoint.revision_history.length > 0 &&
                  waypoint.revision_history[
                    waypoint.revision_history.length - 1
                  ].user[0]
                    ? waypoint.revision_history[
                        waypoint.revision_history.length - 1
                      ].user[0].user_name
                    : "user not found"}
                </p>
              </div>
              <div className="table__col categories">
                <p>
                  {waypoint.categories
                    .map((category) => category.category_name)
                    .join(", ")}
                </p>
              </div>
              <div className="table__col tags">
                {waypoint.tags.map((tag) => tag.tag_name).join(", ")}
              </div>
              <div className="table__col updated">
                <p>
                  {waypoint && waypoint.revision_history.length > 0 && (
                    <>
                      {typeof lastRevision.date === "string" &&
                      typeof lastRevision.user === "string"
                        ? `${lastRevision.date} by ${lastRevision.user}`
                        : "Sorry, could not fetch revision history."}
                    </>
                  )}
                </p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
