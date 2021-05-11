import React from "react";
import DashHeader from "../../DashHeader";
import { Input, Dropdown } from "semantic-ui-react";
import Message from "../../Message";
import { Loader } from "semantic-ui-react";

/*
  @desc UI component for the AddUsers dashboard. Displays form inputs.
  @controller ~/src/controllers/Add/Users/AddUserCtrl.js
*/
export default function AddUsers({
  // Properties
  email,
  username,
  role,
  password,
  confirmPassword,
  directive,
  loading,
  // Methods
  changeUsername,
  changeEmail,
  changeRole,
  changePassword,
  changeConfirmPassword,
  registerUser,
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
      <DashHeader
        title={"Create New User"}
        method={() => registerUser()}
        action={"Register User"}
      />
      <p style={{ maxWidth: 450, lineHeight: "1.7em" }}>
        To create a new user, fill in the fields below, select a permissions
        role, and then click the &nbsp;
        <span
          style={{
            color: "var(--highlight)",
            fontWeight: "bold",
            border: "2px solid var(--highlight)",
            padding: "3px 7px",
            borderRadius: "2px",
            fontSize: 12,
          }}
        >
          Register User
        </span>
        {"  "}button above to confirm.
      </p>
      <form style={style.form} onSubmit={(e) => e.preventDefault()}>
        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Username:<span style={style.req}>*</span>
          </p>
          <Input
            style={style.input}
            onChange={(e) => changeUsername(e.target.value)}
            value={username}
            icon="user"
            iconPosition="left"
            placeholder="Username"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Email:<span style={style.req}>*</span>
          </p>
          <Input
            style={style.input}
            onChange={(e) => changeEmail(e.target.value)}
            value={email}
            icon="mail"
            iconPosition="left"
            placeholder="Email"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Password:<span style={style.req}>*</span>
          </p>
          <Input
            type="password"
            style={style.input}
            onChange={(e) => changePassword(e.target.value)}
            value={password}
            icon="key"
            iconPosition="left"
            placeholder="Password"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Repeat Password:<span style={style.req}>*</span>
          </p>
          <Input
            type="password"
            style={style.input}
            onChange={(e) => changeConfirmPassword(e.target.value)}
            value={confirmPassword}
            icon="key"
            iconPosition="left"
            placeholder="Confirm Password"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Role:<span style={style.req}>*</span>
          </p>
          <Dropdown
            onChange={(e, data) => changeRole(data.value)}
            selection
            value={role}
            options={[
              {
                key: "administrator",
                value: "Admin",
                text: "Administrator",
              },
              {
                key: "manager",
                value: "Manager",
                text: "Content Manager",
              },
            ]}
          />
        </fieldset>
        {loading && <Loader active inline size="small" />}
      </form>
    </div>
  );
}

const style = {
  form: {
    background: "var(--lightprimary)",
    maxWidth: "450px",
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
    paddingLeft: 0,
    paddingRight: 0,
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
