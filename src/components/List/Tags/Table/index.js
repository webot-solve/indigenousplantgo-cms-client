import React from "react";

/*
  @desc UI component that renders a table of tags.
  @controller ../Tags/index.js
*/
export default function Table({
  tags,
  handleSelected,
  selectedTags,
  handleDelete,
  handleEdit,
}) {
  return (
    <ul className="table__list">
      {tags &&
        tags.length > 0 &&
        tags.map((tag, index) => {
          return (
            <li
              className={
                selectedTags.includes(tag._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={tag._id}
                  checked={selectedTags.includes(tag._id) ? true : false}
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{tag.tag_name}</p>
                <span className="action">
                  <button
                    type="button"
                    value={tag._id}
                    onClick={(e) => handleEdit(e)}
                  >
                    Edit&nbsp;
                  </button>
                  <button
                    type="button"
                    value={tag._id}
                    onClick={(e) => handleDelete(e)}
                  >
                    &nbsp;Delete
                  </button>
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
