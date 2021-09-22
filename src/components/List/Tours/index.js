import React from "react";
import { useHistory } from "react-router-dom";
import DashHeader from "../../DashHeader";
import { Dropdown, Input,} from "semantic-ui-react";
import { ResetIcon } from "../../../icons";
import Table from "./Table";

import { Loader } from "semantic-ui-react";

export default function ListTours({
  // Data
  toursData,

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

  // BATCH SELECT -- Attributes
  selectedTour,

  // BATCH SELECT -- Methods
  batchSelect,
  handleSelected,

  // BULK ACTION -- Attributes
  bulkAction,
  // BULK ACTION -- Methods
  handleBulkActionChange,
  handleBulkDelete,

  // DELETE -- Methods
  handleDelete,

  // LOADING -- Attributes
  loading,
}){
  const history = useHistory();
  return (
    <div>
      <DashHeader
        title="Tours"
        action="Add New"
        method={() => history.push("/tours/add")}
      />
       <div style={{ marginBottom: 10, display: "flex" }}>
        <p>
          <strong>Results</strong> ({toursData.length}){" "}
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
      {/* TABLE | Tours Data */}
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
          toursData={ hasPages ? pages[page-1] : toursData}
          handleSelected={handleSelected}
          selectedTour={selectedTour}
          handleDelete={handleDelete}
        />
      </form>




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