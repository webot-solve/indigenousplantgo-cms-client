import React from "react";
import { useHistory } from "react-router-dom";
import DashHeader from "../../DashHeader";

import { Loader } from "semantic-ui-react";

export default function ListTours({
  toursData,
  loading
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
    </div>
  )
}