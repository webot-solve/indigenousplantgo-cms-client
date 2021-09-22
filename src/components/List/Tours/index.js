import React from "react";
import { useHistory } from "react-router-dom";
import DashHeader from "../../DashHeader";
import { Dropdown} from "semantic-ui-react";

import { Loader } from "semantic-ui-react";

export default function ListTours({
  toursData,
  loading,

  // BULK ACTION -- Attributes
  bulkAction,
  // BULK ACTION -- Methods
  handleBulkActionChange,
  handleBulkDelete,
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

        </div>

      </div>




    </div>
    
  )
}