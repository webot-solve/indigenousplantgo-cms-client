import React from "react";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import Modal from "../../Modal";
import Table from "./Table";
import { Loader } from "semantic-ui-react";
import Message from "../../Message";

/*
  @desc UI component that Lists categories and allows the list to be managed.
  @controller ~/src/controllers/List/Categories/ListCategoriesCtrl.js
*/
export default function ListCategories({
  // Data to List: Categories
  categories,
  // Labels
  label,
  labelPlural,
  // SEARCH -- Attributes
  searchQuery,
  // SEARCH -- Methods
  handleQueryChange,
  applySearch,
  clearSearch,
  // PAGINATION -- Attributes
  hasPages,
  pages,
  page,
  // PAGINATION -- Methods
  prevPage,
  nextPage,
  // BATCH SELECT -- Attributes
  selectedCategories,
  // BATCH SELECT -- Methods
  handleSelected,
  batchSelect,
  handleBulkActionChange,
  handleBulkDelete,
  applyBulkDelete,
  // NEW CATEGORY -- Methods
  newCategory,
  submitNewCategory,
  // NEW CATEGORY -- Attributes
  newCategoryValue,
  // MODAL -- Methods
  closeModal,
  // MODAL -- Attributes
  modalActive,
  modalState,
  // DELETE -- Methods
  handleDelete,
  applyDelete,
  // DELETE -- Attributes
  pendingDelete,
  // EDIT -- Methods
  applyEdit,
  handleEdit,
  editCategory,
  // EDIT -- Attributes
  pendingEdit,
  editCategoryValue,
  // LOADING -- Attributes
  loading,
  directive,
}) {
  const renderModal = () => {
    switch (modalState) {
      case "edit":
        return editModal();
      case "delete":
        return deleteModal();
      case "bulk":
        return bulkDeleteModal();
      default:
        return <></>;
    }
  };
  const editModal = () => (
    <>
      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Category name <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => editCategory(e.target.value)}
          value={editCategoryValue}
          style={style.input}
          placeholder="Enter category name"
        />
      </fieldset>
      <button onClick={() => applyEdit()} className="field__button">
        Update category
      </button>
      <button
        onClick={() => closeModal()}
        style={{ color: "var(--highlight)" }}
      >
        Cancel
      </button>
    </>
  );

  const deleteModal = () => (
    <>
      <p>
        Deleting this category will remove all instances of the category&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.category_name}
        </strong>
        . Do you wish to proceed?
      </p>
      <button onClick={() => applyDelete()} className="field__button">
        Yes, I know what I am doing.
      </button>
      <button onClick={() => closeModal()} className="field__button secondary">
        No, cancel my request.
      </button>
    </>
  );

  const bulkDeleteModal = () => (
    <>
      <p>
        Deleting&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {selectedCategories.length}
        </strong>
        &nbsp;categories will remove{" "}
        <strong
          style={{
            color: "var(--danger)",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          all
        </strong>{" "}
        instances of the deleted categories. Do you wish to proceed?
      </p>
      <button onClick={() => applyBulkDelete()} className="field__button">
        Yes, I know what I am doing.
      </button>
      <button onClick={() => closeModal()} className="field__button secondary">
        No, cancel my request.
      </button>
    </>
  );

  return (
    <div>
      {typeof directive === "object" &&
        directive !== null &&
        Object.keys(directive).length > 0 && (
          <Message
            success={directive.success}
            header={directive.header}
            message={directive.message}
          />
        )}
      <DashHeader title={labelPlural} subtitle={`${label} Categories`} />

      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New {label} Category</h3>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Category name <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => newCategory(e.target.value)}
              value={newCategoryValue}
              style={style.input}
              placeholder="Enter category name"
            />
          </fieldset>

          <button onClick={() => submitNewCategory()} className="field__button">
            Create new category
          </button>
        </div>

        <div className="resource__col right">
          <div style={{ marginBottom: 10, display: "flex" }}>
            <strong>Results</strong> ({categories.length}){" "}
            {loading && <Loader active inline size="tiny" />}
          </div>

          <div className="table__controls">
            <div style={{ display: "flex" }}>
              <div className="table__action">
                <Dropdown
                  placeholder={"Bulk Actions"}
                  onChange={(e, data) => handleBulkActionChange(e, data)}
                  selection
                  options={[
                    { key: "default", value: "default", text: "Bulk Actions" },
                    { key: "delete", value: "delete", text: "Delete" },
                  ]}
                />
                <button onClick={() => handleBulkDelete()}>Apply</button>
              </div>
            </div>

            <div>
              <div className="table__action" style={{ marginRight: 0 }}>
                {searchQuery && (
                  <button onClick={() => clearSearch()} className="sub__action">
                    Clear search
                  </button>
                )}
                <Input
                  value={searchQuery}
                  onChange={(e) => handleQueryChange(e)}
                  style={{ ...style.input, minWidth: 250 }}
                  placeholder={`Enter search query`}
                />
                <button onClick={() => applySearch()}>Search</button>
              </div>
            </div>
          </div>

          <div className="table__heading table__row">
            <div className="table__col head select">
              <input
                type="checkbox"
                value={"select all"}
                onChange={(e) => batchSelect(e)}
              />
            </div>
            <div className="table__col head title">
              <h3>name</h3>
            </div>
          </div>

          <Table
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            categories={hasPages ? pages[page - 1] : categories}
            handleSelected={handleSelected}
            selectedCategories={selectedCategories}
          />

          {hasPages && (
            <div className="pagination__control">
              <div>
                <p style={{ marginBottom: "7px" }}>
                  Page {page} of {pages.length}
                </p>
                <div className="control">
                  <button onClick={() => prevPage()}>
                    <Icon name="caret left" />
                  </button>
                  <span>{page}</span>
                  <button onClick={() => nextPage()}>
                    <Icon name="caret right" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <Modal
            isActive={modalActive}
            title={
              modalState === "delete"
                ? `Delete ${pendingDelete.category_name}?`
                : `Edit ${pendingEdit.category_name}`
            }
            subtitle={`id: ${
              modalState === "delete" ? pendingDelete._id : pendingEdit._id
            }`}
            closeModal={closeModal}
          >
            {renderModal()}
          </Modal>
        </div>
      </div>
    </div>
  );
}

const style = {
  input: {
    width: "100%",
    color: "var(--darksecondary)",
  },
  label: {
    color: "var(--darksecondary)",
    margin: 0,
    fontSize: 11,
    marginBottom: "3px",
  },
  fieldset: {
    marginBottom: "10px",
    padding: 0,
  },
  req: {
    color: "red",
    fontSize: 14,
  },
};
