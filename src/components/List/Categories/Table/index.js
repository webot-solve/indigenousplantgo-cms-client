import React from "react";

/*
  @desc UI component that renders a table of categories.
  @controller ../Categories/index.js
*/
export default function Table({
  // Attributes
  categories,
  selectedCategories,
  // Methods
  handleSelected,
  handleDelete,
  handleEdit,
}) {
  return (
    <ul className="table__list">
      {categories &&
        categories.length > 0 &&
        categories.map((category, index) => {
          return (
            <li
              className={
                selectedCategories.includes(category._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={category._id}
                  checked={
                    selectedCategories.includes(category._id) ? true : false
                  }
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{category.category_name}</p>
                <span className="action">
                  <button
                    type="button"
                    value={category._id}
                    onClick={(e) => handleEdit(e)}
                  >
                    Edit&nbsp;
                  </button>
                  <button
                    type="button"
                    value={category._id}
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
