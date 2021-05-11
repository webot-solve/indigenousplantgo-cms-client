import React from "react";
import { Icon } from "semantic-ui-react";

export default function Toggler({ label, setValue, value }) {
  return (
    <div className="textpicker">
      <label>
        {`${label[0].toUpperCase()}${label.substring(1)}:`}
        <span className="req">*</span>
      </label>
      <p>
        <Icon name="info circle" />
        This option will hide or show this resource on the mobile application.
      </p>
      <fieldset style={style.fieldset}>
        <div style={{ display: "flex" }}>
          <input
            style={{ marginRight: 7, width: 17, height: 17 }}
            type="checkbox"
            checked={value}
            onChange={(e) => setValue(e.target.checked)}
            name="toggler"
          />
          <label htmlFor="toggler">
            {value === true
              ? "Current Status: Visible"
              : "Current Status: Hidden"}
          </label>
        </div>
      </fieldset>
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
