import React from "react";
import DashHeader from "../../DashHeader";
import Table from "./Table";
import Modal from "../../Modal";
import { Dropdown, Input, Icon, Loader } from "semantic-ui-react";
import Message from "../../Message";

/*
  @desc UI component that Lists tags and allows the list to be managed.
  @controller ~/src/controllers/List/Tags/ListTagsCtrl.js
*/
export default function ListTags({
  // Datas to List: Tags
  tags,
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
  nextPage,
  prevPage,
  // BATCH SELECT -- Attributes
  selectedTags,
  // BATCH SELECT -- Methods
  handleSelected,
  batchSelect,
  // NEW TAG -- Methods
  newTag,
  submitNewTag,
  // NEW TAG -- Attributes
  newTagValue,
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
  editTag,
  // EDIT -- Attributes
  pendingEdit,
  editTagValue,
  // BULK DELETE
  handleBulkActionChange,
  handleBulkDelete,
  applyBulkDelete,
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
          Tag name <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => editTag(e.target.value)}
          value={editTagValue}
          style={style.input}
          placeholder="Enter category name"
        />
      </fieldset>
      <button onClick={() => applyEdit()} className="field__button">
        Update tag
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
        Deleting this tag will remove all instances of the tag&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.tag_name}
        </strong>
        . Do you wish to proceed?
      </p>
      <button
        onClick={() => applyDelete("attempt delete")}
        className="field__button"
      >
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
          {selectedTags.length}
        </strong>
        &nbsp;tags will remove{" "}
        <strong
          style={{
            color: "var(--danger)",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          all
        </strong>{" "}
        instances of the deleted tags. Do you wish to proceed?
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
      <DashHeader title="Tags" />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New Tag</h3>
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Tag name <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => newTag(e.target.value)}
              value={newTagValue}
              style={style.input}
              placeholder="Enter tag name"
            />
          </fieldset>

          <button onClick={() => submitNewTag()} className="field__button">
            Create new tag
          </button>
        </div>
        <div className="resource__col right">
          <div style={{ marginBottom: 10, display: "flex" }}>
            <p>
              <strong>Results</strong> ({tags.length}){" "}
            </p>
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
                  onChange={(e) => handleQueryChange(e)}
                  value={searchQuery}
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
            tags={hasPages ? pages[page - 1] : tags}
            selectedTags={selectedTags}
            handleSelected={handleSelected}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
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
                ? `Delete ${pendingDelete.tag_name}?`
                : modalState === "edit"
                ? `Edit ${pendingEdit?.tag_name}`
                : `Delete all ${selectedTags.length} tags?`
            }
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
