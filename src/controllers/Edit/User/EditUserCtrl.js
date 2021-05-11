import React, { useState, useEffect } from "react";
import EditUser from "../../../components/Edit/User";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../../network";
import { useHistory } from "react-router-dom";

export default function EditUserCtrl() {
  let isMounted = true;
  const history = useHistory();
  const { userId } = useParams();
  // ===============================================================
  // FORM DATA
  // ===============================================================
  const [changePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Error Messaging
  const [directive, setDirective] = useState(null);
  // Preloader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isMounted) resetDirective();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directive]);

  const resetDirective = async () => {
    await setTimeout(() => {
      if (!isMounted) return;
      setDirective(null);
    }, 4000);
  };

  /* 
    @desc invoke queryUser on mount
    @author Patrick Fortaleza
  */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryUser();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 
    @desc queries the user's data and delegates to state variables
    @author Patrick Fortaleza
  */
  const queryUser = async () => {
    if (!isMounted) return;
    if (!userId)
      return setDirective({
        header: "Error",
        message: "Cannot fetch this user",
        success: false,
      });
    setLoading(true);
    const result = await getUser(userId);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error",
        message: "Cannot fetch this user",
        success: false,
      });

    // delegate
    setEmail(result.email);
    setRole(result.role);
    setUsername(result.user_name);
  };

  /* 
    @desc toggles changePassword to true
    @author Patrick Fortaleza
  */
  const toggleChangePassword = () => {
    if (!isMounted) return;
    setChangePassword(true);
  };

  /* 
    @desc toggles changePassword to false and resets form controls related to passwords.
    @author Patrick Fortaleza
  */
  const cancelChangePassword = () => {
    if (!isMounted) return;
    setChangePassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  // ===============================================================
  // POST
  // @desc applies the updates to the given user.
  // ===============================================================
  const applyUpdate = async () => {
    if (!isMounted) return;
    const id = userId;
    if (!id)
      return setDirective({
        header: "Error",
        message: "Cannot fetch this user",
        success: false,
      });
    if (!email || !username || !role)
      return setDirective({
        header: "Error could not update user",
        message: "Required fields are missing",
        success: false,
      });

    let userData_ = {
      email: email,
      user_name: username,
      role: role,
    };
    if (!isMounted) return;
    if (changePassword) {
      if (!newPassword || !confirmPassword)
        return setDirective({
          header: "Could not update user",
          message: "Password fields are empty.",
          success: false,
        });
      if (newPassword !== confirmPassword)
        return setDirective({
          header: "Could not update user",
          message: "Password fields don't match.",
          success: false,
        });

      userData_ = {
        ...userData_,
        password: newPassword,
      };
    }
    setLoading(true);
    const result = await updateUser(userData_, id);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error updating user",
        message: result.error.data.error,
        success: false,
      });
    history.push("/users");
  };

  return (
    <EditUser
      // METHODS
      toggleChangePassword={toggleChangePassword}
      cancelChangePassword={cancelChangePassword}
      changeUsername={setUsername}
      changeEmail={setEmail}
      changeRole={setRole}
      changeNewPassword={setNewPassword}
      changeConfirmPassword={setConfirmPassword}
      applyUpdate={applyUpdate}
      // ATTRIBUTES
      changePassword={changePassword}
      username={username}
      email={email}
      role={role}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      loading={loading}
      directive={directive}
    />
  );
}
