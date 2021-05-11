import React from "react";
import Table from "./Table";
import DashHeader from "../../DashHeader";
import { useHistory } from "react-router-dom";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import { ResetIcon } from "../../../icons";
import Modal from "../../Modal";
import { Loader } from "semantic-ui-react";

/*
  @desc UI component that Lists Waypoints and allows the list to be managed.
  @controller ~/src/controllers/List/Waypoints/ListWaypointsCtrl.js
*/
export default function ListWaypoints({
  // Data to List: plantData
  waypointData,
  // SEARCH -- Attributes
  searchQuery,
  // SEARCH -- Methods
  handleQueryChange,
  clearSearch,
  // FILTERS -- Attributes
  categoryFilter,
  categories,
  // FILTERS -- Methods
  handleFilterChange,
  applyFilters,
  resetFilters,
  // PAGINATION -- Attributes
  hasPages,
  pages,
  page,
  // PAGINATION -- Methods
  prevPage,
  nextPage,
  // BATCH SELECT -- Attributes
  selectedWaypoints,
  // BATCH SELECT -- Methods
  batchSelect,
  handleSelected,
  // BULK ACTION -- Attributes
  bulkAction,
  // BULK ACTION -- Methods
  handleBulkActionChange,
  handleBulkDelete,
  applyBulkDelete,
  // MODAL -- Attributes
  modalActive,
  modalState,
  // MODAL -- Methods
  closeModal,
  // DELETE -- Attributes
  pendingDelete,
  // DELETE -- Methods
  handleDelete,
  applyDelete,
  // LOADING -- Attributes
  loading,
}) {
  const history = useHistory();
  const renderModal = () => {
    switch (modalState) {
      case "single":
        return (
          <>
            <p>
              Deleting this plant will remove all instances of the
              waypoint&nbsp;
              <strong style={{ color: "var(--danger)" }}>
                {pendingDelete.waypoint_name}
              </strong>
              . Do you wish to proceed?
            </p>
            <button onClick={() => applyDelete()} className="field__button">
              Yes, I know what I am doing.
            </button>
            <button
              onClick={() => closeModal()}
              className="field__button secondary"
            >
              No, cancel my request.
            </button>
          </>
        );
      case "bulk":
        return (
          <>
            <p>
              Deleting&nbsp;
              <strong style={{ color: "var(--danger)" }}>
                {selectedWaypoints.length}
              </strong>
              &nbsp;waypoints will remove{" "}
              <strong
                style={{
                  color: "var(--danger)",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                all
              </strong>{" "}
              instances of the deleted waypoints. Do you wish to proceed?
            </p>
            <button onClick={() => applyBulkDelete()} className="field__button">
              Yes, I know what I am doing.
            </button>
            <button
              onClick={() => closeModal()}
              className="field__button secondary"
            >
              No, cancel my request.
            </button>
          </>
        );
      default:
        return <></>;
    }
  };
  return (
    <div>
      <DashHeader
        title="Waypoints"
        action="Add New"
        method={() => history.push("/waypoints/add")}
      />
      <div style={{ marginBottom: 10, display: "flex" }}>
        <p>
          <strong>Results</strong> ({waypointData.length}){" "}
        </p>
        {loading && <Loader active inline size="tiny" />}
      </div>
      <div className="table__controls">
        <div style={{ display: "flex" }}>
          <div className="table__action">
            <Dropdown
              placeholder={"Bulk Actions"}
              onChange={(e, data) => handleBulkActionChange(e, data)}
              value={bulkAction}
              selection
              options={[
                { key: "default", value: "default", text: "Bulk Actions" },
                { key: "delete", value: "delete", text: "Delete" },
              ]}
            />
            <button onClick={() => handleBulkDelete()}>Apply</button>
          </div>

          <div className="table__action">
            {categoryFilter !== "default" && (
              <button
                onClick={() => resetFilters()}
                className="sub__action resets"
              >
                <span>
                  <ResetIcon />
                </span>
                Reset Filters
              </button>
            )}
            <Dropdown
              placeholder={"All Categories"}
              selection
              search
              onChange={(e, data) => handleFilterChange(e, data)}
              value={categoryFilter}
              options={[
                { key: "default", value: "default", text: "All Categories" },
                ...categories,
              ]}
            />
            <button onClick={() => applyFilters()}>Filter</button>
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
              style={style.input}
              value={searchQuery}
              placeholder={`Enter search query`}
            />
            <button onClick={() => applyFilters()}>Search</button>
          </div>
        </div>
      </div>
      <form>
        <div className="table__heading table__row">
          <div className="table__col head select">
            <input
              type="checkbox"
              onChange={(e) => batchSelect(e)}
              value={"select all"}
            />
          </div>
          <div className="table__col head title">
            <h3>Title</h3>
          </div>
          <div className="table__col head author">
            <h3>Author</h3>
          </div>
          <div className="table__col head categories">
            <h3>Categories</h3>
          </div>
          <div className="table__col head tags">
            <h3>Tags</h3>
          </div>
          <div className="table__col head updated">
            <h3>Last Updated</h3>
          </div>
        </div>

        <Table
          waypointData={hasPages ? pages[page - 1] : waypointData}
          handleSelected={handleSelected}
          selectedWaypoints={selectedWaypoints}
          handleDelete={handleDelete}
        />
      </form>
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
          modalState === "single"
            ? `Delete ${pendingDelete.waypoint_name}?`
            : `Delete all`
        }
        subtitle={modalState === "single" ? null : `Bulk Delete`}
        closeModal={closeModal}
      >
        {renderModal()}
      </Modal>
    </div>
  );
}

const style = {
  input: {
    width: "100%",
    minWidth: "300px",
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
