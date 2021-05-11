import React from "react";
import { Input, Checkbox, Button } from "semantic-ui-react";
import Message from "../Message";
import { Loader } from "semantic-ui-react";

/*
  @desc UI component that displays a Login form.
  @controller ~/src/controllers/LoginForm/LoginFormCtrl.js
*/
export default function LoginForm({
  //PROPERTIES
  username,
  password,
  rememberMe,
  directive,
  loading,
  // METHODS
  setPassword,
  setUsername,
  setRememberMe,
  attemptLogin,
  navigateToRecovery,
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
      <form style={style.form} onSubmit={(e) => attemptLogin(e)}>
        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Username or Email<span style={style.req}>*</span>
          </p>
          <Input
            style={style.input}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            icon="user"
            iconPosition="left"
            placeholder="Username or email"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Password <span style={style.req}>*</span>
          </p>
          <Input
            style={style.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Password"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <Checkbox
            checked={rememberMe}
            onChange={(_, data) => {
              setRememberMe(data.checked);
            }}
            toggle
            label={{ children: "Remember me" }}
            style={style.input}
          />
        </fieldset>

        <fieldset className="submit__fieldset" style={style.fieldset}>
          <Button primary style={{ ...style.submit, position: "relative" }}>
            Log in
            {loading && <Loader active inline inverted size="small" />}
          </Button>
        </fieldset>
      </form>
      <div style={style.formFooter}>
        <button onClick={() => navigateToRecovery()} style={{ color: "grey" }}>
          ← Lost your password?
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
