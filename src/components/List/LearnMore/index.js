import React from "react";
import DashHeader from "../../DashHeader";
import Table from "./Table";

export default function ListLearnMore({
  learnMoreData
}){

  return (
    <div>
      <DashHeader
        title="Learn More"
      />
      <div style={{ marginBottom: 10, display: "flex" }}>
        <p>
          <strong>Results</strong> ({learnMoreData.length}){" "}
        </p>
      </div>

      <form>
        <div className="table__heading table__row">
          <div className="table__col head select">
            <input
                type="checkbox"
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
        <Table learnMoreData={learnMoreData}/>

      </form>
    </div>
  )
}