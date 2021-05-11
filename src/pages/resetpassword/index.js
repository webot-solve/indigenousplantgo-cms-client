import React from "react";
import ResetFormCtrl from "../../controllers/ResetForm/ResetFormCtrl";

export default function Login() {
  return (
    <div className="page page__login" style={style.container}>
      <div style={{ paddingBottom: 100 }}>
        <div style={style.loginHead}>
          <div style={style.logo}>
            <img
              style={style.image}
              src="/assets/images/iip_logo.png"
              alt="Indigenous Initiatives and Partnerships Logo"
            />
          </div>
        </div>
        <ResetFormCtrl />
      </div>
    </div>
  );
}

const style = {
  container: {
    background: "var(--lightsecondary)",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    maxWidth: 75,
  },
  image: {
    width: "100%",
    height: "auto",
  },
  loginHead: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 0",
  },
};
