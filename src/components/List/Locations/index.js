import React from "react";
import Table from "./Table";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon, TextArea } from "semantic-ui-react";
import Modal from "../../Modal";
import { Loader } from "semantic-ui-react";
import Message from "../../Message";

/*
  @desc UI component that Lists locations and allows the list to be managed.
  @controller ~/src/controllers/List/Locations/ListLocationsCtrl.js
*/
export default function ListLocations({
  // Data to List: Locations
  locations,
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
  selectedLocations,
  // BATCH SELECT -- Methods
  handleSelected,
  batchSelect,
  // NEW LOCATION -- Methods
  submitNewLocation,
  handleNewLocation,
  // NEW LOCATION --Attributes
  newLocation,
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
  handleChangeLocation,
  // EDIT -- Attributes
  editLocation,
  pendingEdit,
  //  BULK DELETE -- Methods
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
          Location Name <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => handleChangeLocation(e)}
          style={style.input}
          value={editLocation.name}
          name="name"
          placeholder="Enter location name"
        />
      </fieldset>

      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Latitude <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => handleChangeLocation(e)}
          value={editLocation.latitude}
          name="latitude"
          type="number"
          style={style.input}
          placeholder="Enter latitude (number)"
        />
      </fieldset>

      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Longitude <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => handleChangeLocation(e)}
          value={editLocation.longitude}
          name="longitude"
          type="number"
          style={style.input}
          placeholder="Enter longitude (number)"
        />
      </fieldset>

      <fieldset style={style.fieldset}>
        <p style={style.label}>Description</p>
        <TextArea
          onChange={(e) => handleChangeLocation(e)}
          value={editLocation.description}
          name="description"
          style={{
            ...style.input,
            ...style.textarea,
          }}
        />
      </fieldset>

      <button onClick={() => applyEdit()} className="field__button">
        Update location
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
        Deleting this tag will remove all instances of the location&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.location_name}
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
          {selectedLocations.length}
        </strong>
        &nbsp;locations will remove{" "}
        <strong
          style={{
            color: "var(--danger)",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          all
        </strong>{" "}
        instances of the deleted locations. Do you wish to proceed?
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
      <DashHeader title="Locations" />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New location</h3>
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Location Name <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => handleNewLocation(e)}
              style={style.input}
              value={newLocation.name}
              name="name"
              placeholder="Enter location name"
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Latitude <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => handleNewLocation(e)}
              value={newLocation.latitude}
              name="latitude"
              type="number"
              style={style.input}
              placeholder="Enter latitude (number)"
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Longitude <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => handleNewLocation(e)}
              value={newLocation.longitude}
              name="longitude"
              type="number"
              style={style.input}
              placeholder="Enter longitude (number)"
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            <p style={style.label}>Description</p>
            <TextArea
              onChange={(e) => handleNewLocation(e)}
              value={newLocation.description}
              name="description"
              style={{
                ...style.input,
                ...style.textarea,
              }}
            />
          </fieldset>

          <button onClick={() => submitNewLocation()} className="field__button">
            Create new location
          </button>
        </div>
        <div className="resource__col right">
          <div style={{ marginBottom: 10, display: "flex" }}>
            <p>
              <strong>Results</strong> ({locations.length}){" "}
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
            <div className="table__col head author">
              <h3>latitude</h3>
            </div>
            <div className="table__col head categories">
              <h3>longitude</h3>
            </div>
          </div>

          <Table
            locations={hasPages ? pages[page - 1] : locations}
            selectedLocations={selectedLocations}
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
                ? `Delete ${pendingDelete.location_name}?`
                : modalState === "edit"
                ? `Edit ${pendingEdit?.location_name}`
                : `Delete all ${selectedLocations.length} tags?`
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
  textarea: {
    height: 200,
    border: "1px solid lightgrey",
    color: "var(--darkprimary)",
    padding: "7px 14px",
    background: "var(--lighttertiary)",
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
