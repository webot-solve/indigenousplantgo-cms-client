import React, { useState, useEffect } from "react";
import ResetForm from "../../components/ResetForm";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../../network";

export default function ResetFormCtrl() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [directive, setDirective] = useState(null);
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

  const navigateToLogin = () => {
    history.push("/login");
  };

  const submitReset = async () => {
    if (!email)
      return setDirective({
        header: "Error recovering user account",
        message: "Email field missing.",
        success: false,
      });
    const email_ = {
      email: email,
    };
    setLoading(true);
    const result = await resetPassword(email_);
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error recovering user account",
        message: result.error.data.error,
        success: false,
      });

    setDirective({
      header: "Successfully sent recovery email.",
      message: "Please check your email for your updated password.",
      success: true,
    });
  };

  return (
    <ResetForm
      email={email}
      setEmail={setEmail}
      navigateToLogin={navigateToLogin}
      submitReset={submitReset}
      directive={directive}
      loading={loading}
    />
  );
}
