import React from "react";
import { Input, Button, Loader, Icon } from "semantic-ui-react";
import Message from "../Message";

export default function ResetForm({
  email,
  setEmail,
  navigateToLogin,
  submitReset,
  directive,
  loading,
}) {
  return (
    <div>
      {typeof directive === "object" &&
        directive !== null &&
        Object.keys(directive).length > 0 && (
          <Message
            success={directive.success}
            header={directive.header}
            message={directive.message}
          />
        )}
      <form style={style.form} onSubmit={(e) => e.preventDefault()}>
        <fieldset style={style.fieldset}>
          <p style={{ maxWidth: 300, lineHeight: "1.7em", fontSize: 13 }}>
            <Icon name="info circle" />
            please enter the email associated with your account and click{" "}
            <span
              style={{
                background: "var(--highlight)",
                color: "white",
                padding: "3px 6px",
                borderRadius: "3px",
              }}
            >
              Reset Password
            </span>{" "}
            to send a recovery email and code.
          </p>
          <p style={style.label}>
            Email<span style={style.req}>*</span>
          </p>
          <Input
            style={style.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon="user"
            iconPosition="left"
            placeholder="Email"
          />
        </fieldset>

        <fieldset className="submit__fieldset" style={style.fieldset}>
          <Button
            onClick={() => submitReset()}
            primary
            style={{ ...style.submit, position: "relative" }}
          >
            Reset Password
            {loading && <Loader active inline inverted size="small" />}
          </Button>
        </fieldset>
      </form>
      <div style={style.formFooter}>
        <button onClick={() => navigateToLogin()} style={{ color: "grey" }}>
          ← Back to login
        </button>
      </div>
    </div>
  );
}

const style = {
  form: {
    background: "var(--lightprimary)",
    border: "1px solid lightgrey",
    minWidth: "350px",
    margin: "auto",
    padding: 20,
    boxShadow: "var(--shadow)",
  },
  formFooter: {
    padding: "20px 0",
  },
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
    marginBottom: "3px",
  },
  submit: {
    width: "100%",
    background: "var(--highlight)",
    borderRadius: "unset",
  },
  req: {
    color: "red",
    fontSize: 14,
  },
};
