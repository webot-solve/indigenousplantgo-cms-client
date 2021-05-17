import React, { useEffect, useState } from "react";
import Toggler from "../../../components/Forms/Toggler";

export default function TogglerCtrl({ label, setter, eValue }) {
  const [value, setValue] = useState(true);

  useEffect(() => {
    if (value !== undefined) setValue(eValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eValue]);

  useEffect(() => {
    if (value !== undefined) setter(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <Toggler label={label} setValue={setValue} value={value} />;
}
