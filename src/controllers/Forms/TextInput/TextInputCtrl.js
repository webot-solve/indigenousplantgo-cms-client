import React, { useState, useEffect } from "react";
import TextInput from "../../../components/Forms/TextInput";

export default function TextInputCtrl({ label, setter, eValue }) {
  const [value, setValue] = useState(" ");

  useEffect(() => {
    setter(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setValue(eValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eValue]);

  return <TextInput label={label} setValue={setValue} value={value} />;
}
