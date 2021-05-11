import React from "react";
import { Message as DIRECTIVE } from "semantic-ui-react";

export default function Message({ success, message, header }) {
  return (
    <div className="message__container">
      <DIRECTIVE
        icon={success ? "check" : "ban"}
        success={success ? true : false}
        error={!success ? true : false}
        header={header}
        content={message}
        size="small"
      />
    </div>
  );
}
