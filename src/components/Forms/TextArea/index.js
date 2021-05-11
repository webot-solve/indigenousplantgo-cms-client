import React from "react";
import { TextArea as TEXT_AREA } from "semantic-ui-react";

/*
  @desc UI component for A text area form control.
  @controller ~/src/controllers/Forms/TextArea/TextAreaCtrl.js
*/
export default function TextArea({ label, setValue, value }) {
  return (
    <div className="textpicker">
      <label>
        {`${label[0].toUpperCase()}${label.substring(1)}:`}
        <span className="req">*</span>
      </label>

      <fieldset style={style.fieldset}>
        <TEXT_AREA
          onChange={(e) => setValue(e.target.value)}
          value={value}
          style={{
            ...style.input,
            ...style.textarea,
          }}
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
  textarea: {
    height: 200,
    border: "1px solid lightgrey",
    color: "var(--darkprimary)",
    padding: "7px 14px",
    background: "var(--lighttertiary)",
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
