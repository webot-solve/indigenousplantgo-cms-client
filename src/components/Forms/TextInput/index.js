import React from "react";
import { Input } from "semantic-ui-react";

/*
  @desc UI component for A text input form control.
  @controller ~/src/controllers/Forms/TextInput/TextInputCtrl.js
*/
export default function TextInput({ label, value, setValue }) {
  return (
    <div className="textpicker">
      <label>
        {`${label[0].toUpperCase()}${label.substring(1)}:`}
        <span className="req">*</span>
      </label>

      <fieldset style={style.fieldset}>
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value || ""}
          style={style.input}
          placeholder={`${label[0].toUpperCase()}${label.substring(1)}:`}
        />
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
