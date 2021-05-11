import React, { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import { login } from "../../network";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function LoginFormCtrl() {
  const authContext = useAuth();
  const { setUserData } = authContext;
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useLocalStorage("rememberMe", true);
  const [directive, setDirective] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (rememberMe === false) {
      setUsername("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetDirective();
  }, [directive]);

  const resetDirective = async () => {
    await setTimeout(() => {
      setDirective(null);
    }, 4000);
  };

  const attemptLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const result = await login({ username, password });
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error signing in",
        message: result.error.data.error,
        success: false,
      });
    setUserData(result);
  };

  const navigateToRecovery = () => {
    history.push("/recovery");
  };

  return (
    <LoginForm
      // PROPERTIES
      username={username}
      password={password}
      rememberMe={rememberMe}
      directive={directive}
      loading={loading}
      // METHODS
      setPassword={setPassword}
      setUsername={setUsername}
      setRememberMe={setRememberMe}
      attemptLogin={attemptLogin}
      navigateToRecovery={navigateToRecovery}
    />
  );
}
