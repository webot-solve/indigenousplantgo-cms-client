import React from "react";
import DashHeader from "../../DashHeader";

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
       
        {/* {loading && <Loader active inline size="tiny" />} */}
      </div>

      {
          learnMoreData.map( item => {return `hello`})
        }
    </div>
  )
}