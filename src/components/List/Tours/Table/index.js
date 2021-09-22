import React from "react";
import { parseDate } from "../../../../utility";
import { Link } from "react-router-dom";

export default function Table({
  toursData,
  selectedTour,
  handleSelected,
  handleDelete,
}) {
  return(
    <ul className="table__list">
      { toursData 
        && toursData.length > 0
        && toursData.map((tour, index) => {
          const lastRevision = {
            date: parseDate(tour.revision_history[0]?.date),
            user: tour.revision_history[0].user[0]?.user_name,
          };

        return(
          <li 
            className={
              selectedTour.includes(tour._id)
                ? "table__row selected"
                : "table__row"
            }  
            key={index}
          >
            <div className="table__col select">
              <input 
                type="checkbox"
                value={tour._id}
                checked={selectedTour.includes(tour._id) ? true : false}
                onChange={ e => handleSelected(e)}
              />
            </div>
            <div className="table__col title">
              <p>{tour.tour_name}</p>
              <span className="action">
                <Link 
                  type="button" 
                  value={tour._id}
                  to={`/learnmore/edit/${tour._id}`}
                >
                  Edit&nbsp;
                </Link>
                <button
                  type="button" 
                  value={tour._id}
                  onClick={(e) => handleDelete(e)}
                >
                  &nbsp;Delete
                </button>
              </span>
            </div>
            <div className="table__col author">
              <p>{tour.isPublish === true ? "Visible" : "Hidden"}</p>
            </div>
            <div className="table__col categories"> 
              <p>
                {tour.categories
                  .map((category) => category.category_name)
                  .join(', ')  
                }
              </p>
            </div>
            <div className="table__col tags">
                {tour.tags.map((tag) => tag.tag_name).join(", ")}
            </div>
            <div className="table__col updated">
                <p>
                  { tour 
                    && tour.revision_history.length > 0 
                    && (
                      <>
                        {typeof lastRevision.date === "string" &&
                        typeof lastRevision.user === "string"
                          ? `${lastRevision.date} by ${lastRevision.user}`
                          : "Sorry, could not fetch revision history."}
                      </>
                    )
                  }
                </p>
              </div>
          </li>
        ); 
      })}
    </ul>
  );
}