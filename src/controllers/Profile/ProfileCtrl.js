import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import { useAuth } from "../../context/AuthContext";
import { updateUser } from "../../network";

export default function ProfileCtrl() {
  const authContext = useAuth();
  const { userData, queryUser } = authContext;
  const [changePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState(userData?.user.user_name);
  const [email, setEmail] = useState(userData?.user.email);
  const [role, setRole] = useState(userData?.user.role);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Error Messaging
  const [directive, setDirective] = useState(null);
  // Preloader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resetDirective();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directive]);

  const resetDirective = async () => {
    if (directive) {
      switch (directive.success) {
        case true:
          break;
        case false:
          await setTimeout(() => {
            setDirective(null);
          }, 4000);
          break;
        default:
          break;
      }
    }
  };

  const toggleChangePassword = () => {
    setChangePassword(true);
  };

  const cancelChangePassword = () => {
    setChangePassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const applyUpdate = async () => {
    const id = userData.user._id;
    if (!id)
      return setDirective({
        header: "Error",
        message: "Cannot fetch user data",
        success: false,
      });

    let userData_ = {
      email: email,
      user_name: username,
      role: role,
    };

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
    if (result.error) {
      setLoading(false);
      return setDirective({
        header: "Error updating your profile",
        message: result.error.data.error,
        success: false,
      });
    }

    setDirective({
      header: "Update Successful",
      message: "Successfully updated your profile",
      success: true,
    });

    queryUser();
    setLoading(false);
  };

  return (
    <Profile
      toggleChangePassword={toggleChangePassword}
      cancelChangePassword={cancelChangePassword}
      changePassword={changePassword}
      username={username}
      changeUsername={setUsername}
      changeEmail={setEmail}
      changeRole={setRole}
      email={email}
      role={role}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      changeNewPassword={setNewPassword}
      changeConfirmPassword={setConfirmPassword}
      applyUpdate={applyUpdate}
      loading={loading}
      directive={directive}
    />
  );
}
