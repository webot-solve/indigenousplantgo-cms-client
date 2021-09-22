import React from "react";
import DashHeader from "../../DashHeader";
import Table from "./Table";
import { useHistory } from "react-router-dom";
import { Dropdown, Input, Icon} from "semantic-ui-react";
import { ResetIcon } from "../../../icons";
import Modal from "../../Modal";
import { Loader } from "semantic-ui-react";


export default function ListLearnMore({
  // Data to List: learnMoreData
  learnMoreData,
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
  resetFilters,
  applyFilters,
  // PAGINATION -- Attributes
  hasPages,
  pages,
  page,
  // PAGINATION -- Methods
  prevPage,
  nextPage,
  // BATCH SELECT -- Attributes
  selectedLearnMore,
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
}){
  const history = useHistory();
  const renderModal = () => {
    switch (modalState) {
      case "single":
        return (
          <>
            <p>
              Deleting this plant will remove all instances of the plant&nbsp;
              <strong style={{ color: "var(--danger)" }}>
                {pendingDelete.learn_more_title}
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
                {selectedLearnMore.length}
              </strong>
              &nbsp;learn more will remove{" "}
              <strong
                style={{
                  color: "var(--danger)",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                all
              </strong>{" "}
              instances of the deleted plants. Do you wish to proceed?
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
        title="Learn More"
        action="Add New"
        method={() => history.push("/learnmore/add")}
      />
      <div style={{ marginBottom: 10, display: "flex" }}>
        <p>
          <strong>Results</strong> ({learnMoreData.length}){" "}
        </p>
      </div>
      {loading && <Loader active inline size="tiny" />}
      <div className="table__controls">
        <div style={{ display: "flex" }}>
          {/* BULK ACTION */}
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
          {/* FILTER ACTION BY CATEGORIES */}
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

          {/* SEARCH ACTION */}
          <div className="table__action">
          {searchQuery && (
              <button onClick={() => clearSearch()} className="sub__action">
                Clear search
              </button>
            )}
            <Input
              placeholder={`Enter search query`}
              style={style.input}
              value={searchQuery}
              onChange={(e) => handleQueryChange(e)}
            />
             <button onClick={() => applyFilters()}>Search</button>
          </div>
         
        </div>
      </div>
      {/* TABLE | Learn More Data */}
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
            <h3>Visibility</h3>
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
          learnMoreData={ hasPages ? pages[page-1] : learnMoreData}
          handleSelected={handleSelected}
          selectedLearnMore={selectedLearnMore}
          handleDelete={handleDelete}
        />
      </form>
      {/* PAGINATION */}
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
            ? `Delete ${pendingDelete.learn_more_title}?`
            : `Delete all ${selectedLearnMore.length} plants?`
        }
        subtitle={modalState === "single" ? null : `Bulk Delete`}
        closeModal={closeModal}
      >
        {renderModal()}
      </Modal>
    </div>
  )
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