import React from "react";

/*
  @desc UI component that renders a table of locations.
  @controller ../Locations/index.js
*/
export default function Table({
  locations,
  handleSelected,
  selectedLocations,
  handleDelete,
  handleEdit,
}) {
  return (
    <ul className="table__list">
      {locations &&
        locations.length > 0 &&
        locations.map((location, index) => {
          return (
            <li
              className={
                selectedLocations.includes(location._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={location._id}
                  checked={
                    selectedLocations.includes(location._id) ? true : false
                  }
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{location.location_name}</p>
                <span className="action">
                  <button
                    type="button"
                    value={location._id}
                    onClick={(e) => handleEdit(e)}
                  >
                    Edit&nbsp;
                  </button>
                  <button
                    type="button"
                    value={location._id}
                    onClick={(e) => handleDelete(e)}
                  >
                    &nbsp;Delete
                  </button>
                </span>
              </div>
              <div className="table__col author">
                <p>{location.latitude}</p>
              </div>

              <div className="table__col author">
                <p>{location.longitude}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
