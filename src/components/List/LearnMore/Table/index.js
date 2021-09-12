import React from "react";
import { parseDate } from "../../../../utility";
import { Link } from "react-router-dom";

export default function Table({
  learnMoreData
}) {
  console.log(learnMoreData)
  return(
    <ul>
      { learnMoreData 
        && learnMoreData.length > 0
        && learnMoreData.map((learnMore, index) => {
          const lastRevision = {
            date: parseDate(learnMore.revision_history[0]?.date),
            user: learnMore.revision_history[0].user[0]?.user_name,
          };

        return(
          <li className={"table__row"}  key={index}>
            <div className="table__col select">
              <input 
                type="checkbox"
                value={learnMore._id}/>
            </div>
            <div className="table__col title">
              <p>{learnMore.learn_more_title}</p>
              <span className="action">
                <Link 
                  type="button" 
                  value={learnMore._id}
                  to={`/learn_more/edit/${learnMore._id}`}
                  >
                    Edit&nbsp;
                </Link>
                <button
                  type="button" 
                  value={learnMore._id}
                >
                    &nbsp;Delete
                </button>
              </span>
            </div>
            <div className="table__col author">
              <p>{learnMore.isPublish === true ? "Visible" : "Hidden"}</p>
            </div>
            <div>
              <p>
                {learnMore.categories
                  .map((category) => category.category_name)
                  .join(', ')  
                }
              </p>
            </div>
            <div className="table__col tags">
                {learnMore.tags.map((tag) => tag.tag_name).join(", ")}
            </div>
            <div className="table__col updated">
                <p>
                  { learnMore 
                    && learnMore.revision_history.length > 0 
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
        ) 
        })
        
      }
    </ul>
  );
}