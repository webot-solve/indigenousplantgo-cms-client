import React from "react";
import { Input, Dropdown, Icon } from "semantic-ui-react";
import DashHeader from "../../DashHeader";
import { Loader } from "semantic-ui-react";
import Message from "../../Message";

/*
  @desc UI component for the EditUser dashboard. Displays form inputs, allows users to update another user's data.
  @controller ~/src/controllers/Edit/User/EditUserCtrl.js
*/
export default function EditUser({
  toggleChangePassword,
  cancelChangePassword,
  changePassword,
  username,
  email,
  role,
  changeUsername,
  changeEmail,
  changeRole,
  confirmPassword,
  newPassword,
  changeNewPassword,
  changeConfirmPassword,
  applyUpdate,
  loading,
  directive,
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
      <DashHeader title={"Edit user"} />
      <p style={{ maxWidth: 450, lineHeight: "1.7em" }}>
        To update{" "}
        <strong style={{ color: "var(--highlight)" }}>{username}'s</strong>{" "}
        profile, edit the fields below and click
        <br></br>
        <span
          style={{
            color: "var(--lightprimary)",
            background: "var(--highlight)",
            padding: "3px 7px",
            borderRadius: "2px",
            fontSize: 12,
          }}
        >
          {" "}
          <Icon name="save" />
          Update User
        </span>{" "}
        to save your changes.
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

        <button
          style={{ color: "var(--highlight)" }}
          onClick={
            changePassword
              ? () => cancelChangePassword()
              : () => toggleChangePassword()
          }
        >
          {changePassword ? (
            <>
              <p>
                <Icon name="ban" /> Cancel Change Password{" "}
                <Icon name="caret up" />
              </p>
            </>
          ) : (
            <>
              <p>
                <Icon name="key" /> Change Password? <Icon name="caret down" />
              </p>
            </>
          )}
        </button>
        {changePassword && (
          <>
            <fieldset style={style.fieldset}>
              <p style={style.label}>
                New Password:<span style={style.req}>*</span>
              </p>
              <Input
                type="password"
                style={style.input}
                onChange={(e) => changeNewPassword(e.target.value)}
                value={newPassword}
                icon="key"
                iconPosition="left"
                placeholder="New Password"
              />
            </fieldset>

            <fieldset style={style.fieldset}>
              <p style={style.label}>
                Repeat New Password:<span style={style.req}>*</span>
              </p>
              <Input
                type="password"
                style={style.input}
                onChange={(e) => changeConfirmPassword(e.target.value)}
                value={confirmPassword}
                icon="key"
                iconPosition="left"
                placeholder="Confirm New Password"
              />
            </fieldset>
          </>
        )}

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

        <button onClick={() => applyUpdate()} className="field__button">
          <Icon name="save" />
          Update User
        </button>
        {changePassword && (
          <p>
            <span style={{ color: "var(--highlight)", fontWeight: "bold" }}>
              WARNING:
            </span>{" "}
            {username}'s password will also be updated. Please ensure that you
            have entered the desired new password in the password fields.&nbsp;
            <button
              style={{
                color: "var(--highlight)",
                display: "inline-block",
                width: "auto",
              }}
              onClick={() => cancelChangePassword()}
            >
              Cancel?
            </button>
          </p>
        )}
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
