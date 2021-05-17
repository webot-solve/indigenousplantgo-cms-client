import React from "react";
import { parseDate } from "../../../../utility";
import { Link } from "react-router-dom";

/*
  @desc UI component that renders a table of plants.
  @controller ../Plants/index.js
*/
export default function Table({
  plantData,
  handleSelected,
  selectedPlants,
  handleDelete,
}) {
  return (
    <ul className="table__list">
      {plantData &&
        plantData.length > 0 &&
        plantData.map((plant, index) => {
          const lastRevision = {
            date: parseDate(plant.revision_history[0]?.date),
            user: plant.revision_history[0].user[0]?.user_name,
          };

          return (
            <li
              className={
                selectedPlants.includes(plant._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={plant._id}
                  checked={selectedPlants.includes(plant._id) ? true : false}
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{plant.plant_name}</p>
                <span className="action">
                  <Link
                    to={`/plants/edit/${plant._id}`}
                    type="button"
                    value={plant._id}
                  >
                    Edit&nbsp;
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e)}
                    value={plant._id}
                  >
                    &nbsp;Delete
                  </button>
                </span>
              </div>
              <div className="table__col author">
                <p>{plant.isPublish === true ? "Visible" : "Hidden"}</p>
              </div>
              <div className="table__col categories">
                <p>
                  {plant.categories
                    .map((category) => category.category_name)
                    .join(", ")}
                </p>
              </div>
              <div className="table__col tags">
                {plant.tags.map((tag) => tag.tag_name).join(", ")}
              </div>
              <div className="table__col updated">
                <p>
                  {plant && plant.revision_history.length > 0 && (
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
