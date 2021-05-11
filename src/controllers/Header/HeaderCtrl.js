import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function HeaderCtrl() {
  const authContext = useAuth();
  const { setUserData, userData } = authContext;
  const history = useHistory();

  // PROFILE
  const navigateToProfile = () => {
    history.push("/profile");
  };

  const handleSignout = () => {
    setUserData(null);
  };

  return (
    <Header
      handleSignout={handleSignout}
      navigateToProfile={navigateToProfile}
      userData={userData}
    />
  );
}
