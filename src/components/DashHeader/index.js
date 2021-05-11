import React from "react";
import { Loader } from "semantic-ui-react";

/*
  @desc UI component for the Dashboard header. Displays A title, and a controlled button.
  @controller null
*/
export default function DashHeader({
  title,
  subtitle,
  action,
  method,
  loading,
}) {
  return (
    <>
      <div className="dash__header">
        <div className="dash__title">
          <h2>{title}</h2>
          {action && method && (
            <button onClick={() => method()}>{action}</button>
          )}{" "}
          &nbsp; &nbsp;
          {loading && <Loader active inline size="mini" />}
        </div>
        {subtitle && <p style={{ margin: 0 }}>{subtitle}</p>}
      </div>
    </>
  );
}
