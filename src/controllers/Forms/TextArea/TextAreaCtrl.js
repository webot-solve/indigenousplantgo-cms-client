import React, { useState, useEffect } from "react";
import TextArea from "../../../components/Forms/TextArea";

export default function TextAreaCtrl({ label, setter, eValue }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setter(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setValue(eValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eValue]);

  return <TextArea label={label} setValue={setValue} value={value} />;
}
