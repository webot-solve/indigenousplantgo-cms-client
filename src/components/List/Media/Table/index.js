import React from "react";

/*
  @desc UI component that renders a table of media.
  @controller ../Media/index.js
*/
export default function Table({
  medias,
  selectedMedias,
  dataLabel,
  handleSelected,
  handleDelete,
  handleEdit,
}) {
  return (
    <ul className="table__list">
      {medias &&
        medias.length > 0 &&
        medias.map((media, index) => {
          return (
            <li
              className={
                selectedMedias.includes(media._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={media._id}
                  checked={selectedMedias.includes(media._id) ? true : false}
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{media.caption}</p>
                <span className="action">
                  <button
                    type="button"
                    value={media._id}
                    onClick={(e) => handleEdit(e)}
                  >
                    Edit&nbsp;
                  </button>
                  <button
                    type="button"
                    value={media._id}
                    onClick={(e) => handleDelete(e)}
                  >
                    &nbsp;Delete
                  </button>
                </span>
              </div>
              <div className="table__col url">
                <p>{media[`${dataLabel}_url`]}</p>
              </div>
              {dataLabel === "image" && (
                <div className="table__col thumbnail">
                  <div>
                    <img src={media[`${dataLabel}_url`]} alt="thumbnail" />
                  </div>
                </div>
              )}

              {dataLabel === "audio_file" && (
                <div className="table__col head audio__preview">
                  <audio controls src={media[`${dataLabel}_url`]}>
                    Your browser does not support the <code>audio</code>{" "}
                    element.
                  </audio>
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
}
