import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  CompassIcon2,
  UsersIcon2,
  LocationIcon2,
  PlantIcon2,
} from "../../icons";

export default function Home({ action, method }) {
  let isMounted = true;
  const history = useHistory();
  const authContext = useAuth();
  const { userData } = authContext;

  //Get Signed in User
  const [user, setUser] = useState();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    if (isMounted && userData && userData.user && userData.user.user_name)
      setUser(userData.user.user_name);

    return () => {
      isMounted = false;
    };
  }, []);

  //Get Date
  const dateToday = new Date();
  const options = { year: "numeric", month: "short", day: "numeric" };
  const displayDate = dateToday.toLocaleDateString("en-US", options);

  //Get Clock
  const [time, setTime] = useState();
  const clock = () => {
    var time_;
    var date = new Date();
    var minute = date.getMinutes();
    var hour = date.getHours();
    var formathour;
    if (hour > 12) {
      formathour = hour - 12;
    }
    if (hour === 0) {
      formathour = 12;
    }

    var amOrPm;
    if (hour >= 12) {
      amOrPm = "PM";
    } else {
      amOrPm = "AM";
    }

    if (hour > 12) {
      time_ = {
        hour: `${("0" + formathour).substr(-2)}`,
        minute: `${("0" + minute).substr(-2)}`,
        twelveHour: `${amOrPm}`,
      };
    } else {
      time_ = {
        hour: `${("0" + hour).substr(-2)}`,
        minute: `${("0" + minute).substr(-2)}`,
        twelveHour: `${amOrPm}`,
      };
    }

    if (isMounted) setTime(time_);
  };
  if (isMounted) setInterval(clock, 1000);

  return (
    <main className="homewrapper">
      {/* HERO SECTION */}
      <div style={style.hero}>
        <img
          className="carousel"
          style={style.image}
          src="/assets/images/hero.jpg"
          alt="Indigenous Initiatives and Partnerships Logo Red"
        />

        <span style={style.textDisplay}>
          <h1 style={style.time}>
            {time &&
            typeof time === "object" &&
            time !== null &&
            Object.keys(time).length > 1
              ? `${time.hour}`
              : `00`}
            <span className="time__colon">:</span>
            {time &&
            typeof time === "object" &&
            time !== null &&
            Object.keys(time).length > 1
              ? `${time.minute} ${time.twelveHour}`
              : `00 PM`}
          </h1>
          <h3 style={style.greeting}>Ey' Swayel, {user}!</h3>
          <div style={style.date}> {displayDate}</div>
        </span>
      </div>

      {/* QUICKLINK SECTION */}
      <div className="quick__links" style={style.quicklinks}>
        <div className="subhead" style={style.subhead}>
          <h3 style={{ fontSize: 21 }}>Quick Links</h3>
        </div>

        <div className="quick__grid" style={style.grid}>
          <button
            className="link__button"
            style={style.button}
            onClick={() => history.push("/plants/add")}
          >
            <div className="quickicons" style={style.icon}>
              <PlantIcon2 />
            </div>
            <div>
              <label style={style.addnew}>Add New </label>
              <p style={style.resource}>Plant</p>
            </div>

            <div className="icon__accent">
              <PlantIcon2 />
            </div>
          </button>
          <button
            className="link__button"
            style={style.button}
            onClick={() => history.push("/users/add")}
          >
            <div style={style.icon}>
              <UsersIcon2 />
            </div>
            <div>
              <label style={style.addnew}>Add New </label>
              <p style={style.resource}>User</p>
            </div>

            <div className="icon__accent">
              <UsersIcon2 />
            </div>
          </button>

          <button
            className="link__button"
            style={style.button}
            onClick={() => history.push("/waypoints/add")}
          >
            <div style={style.icon}>
              <CompassIcon2 />
            </div>
            <div>
              <label style={style.addnew}>Add New </label>
              <p style={style.resource}>Waypoint</p>
            </div>

            <div className="icon__accent">
              <CompassIcon2 />
            </div>
          </button>
          <button
            className="link__button"
            style={style.button}
            onClick={() => history.push("/locations")}
          >
            <div style={style.icon}>
              <LocationIcon2 />
            </div>
            <div>
              <label style={style.addnew}>Add New </label>
              <p style={style.resource}>Location</p>
            </div>

            <div className="icon__accent">
              <LocationIcon2 />
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}

const style = {
  hero: {
    position: "relative",
    height: "100%",
    textAlign: "center",
    overflow: "hidden",
    maxWidth: "1400px",
  },
  image: {
    width: "100%",
    maxHeight: "550px",
    opacity: 0.75,
    verticalAlign: "bottom",
  },
  quicklinks: {
    paddingLeft: "20px",
  },
  subhead: {
    padding: "10px 0",
  },
  textDisplay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    zIndex: "1",
    textShadow: "1px 1px 8px rgba(0, 0, 0, 0.5)",
  },
  greeting: {
    textTransform: "capitalize",
    fontSize: "175%",
    marginTop: "10px",
    marginBottom: "5px",
    fontWeight: "normal",
  },
  resource: {
    fontSize: 21,
    fontWeight: "normal",
    margin: 0,
    marginLeft: 1,
    marginTop: 3,
  },
  time: {
    marginBottom: "0",
    fontSize: "40px",
  },
  date: {
    fontSize: "17px",
  },
  grid: {
    display: "flex",
  },
  col: {
    display: "block",
    marginRight: "10px",
    width: "100%",
  },
  button: {
    display: "flex",
    textAlign: "left",
  },
  icon: {
    marginRight: "20px",
    color: "white",
  },
  addnew: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: "0.09em",
    background: "var(--highlightsecondary)",
    padding: "3px 7px",
    borderRadius: "2px",
  },
};
