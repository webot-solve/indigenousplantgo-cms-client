import React from "react";
import DashHeader from "../../DashHeader";
import Table from "./Table";
import { useHistory } from "react-router-dom";
import { Dropdown, Input} from "semantic-ui-react";

export default function ListLearnMore({
  learnMoreData,

}){
  const history = useHistory();
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

      <div className="table__controls">
        <div style={{ display: "flex" }}>
          {/* BULK ACTION */}
          <div className="table__action">
            <Dropdown 
              placeholder={"Bulk Actions"}
              selection
              options={[
                { key: "default", value: "default", text: "Bulk Actions" },
                { key: "delete", value: "delete", text: "Delete" },
              ]}
              />
            <button>Apply</button>
          </div>
          {/* FILTER ACTION BY CATEGORIES */}
          <div className="table__action">
            <Dropdown
              placeholder={"All Categories"}
              selection
              options={[
                { key: "default", value: "default", text: "All Categories" },
                // ...categories,
              ]}
            />
            <button>Filter</button>
          </div>

          {/* SEARCH ACTION */}
          <div className="table__action">
            <Input
              placeholder={`Enter search query`}
              style={style.input}
            />
             <button>Search</button>
          </div>
         
        </div>
      </div>
      {/* TABLE | Learn More Data */}
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