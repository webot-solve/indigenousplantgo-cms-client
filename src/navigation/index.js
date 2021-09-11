import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
/*
  ======================================================== 
  IMPORTING PAGES
  ========================================================
*/
// 1.0 HOME PAGE
import Home from "../pages/home";
// 2.0 PLANTS
import AllPlants from "../pages/plants/AllPlants";
import AddPlant from "../pages/plants/AddPlant";
import EditPlant from "../pages/plants/EditPlant";
import PlantCategories from "../pages/plants/PlantCategories";
// 3.0 WAYPOINTS
import AllWaypoints from "../pages/waypoints/AllWaypoints";
import AddWaypoint from "../pages/waypoints/AddWaypoint";
import EditWaypoint from "../pages/waypoints/EditWaypoint";
import WaypointCategories from "../pages/waypoints/WaypointCategories";
// 4.0 USERS
import AllUsers from "../pages/users/AllUsers";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
// 5.0 LOCATIONS
import Locations from "../pages/locations";
// 6.0 MEDIA
import Images from "../pages/media/Images";
import AudioFiles from "../pages/media/AudioFiles";
import Videos from "../pages/media/Videos";
// 7.0 TAGS
import Tags from "../pages/tags";
// 8.0 PROFILE
import Profile from "../pages/profile";
// 9.0 LOGIN
import Login from "../pages/login";
// 10.0 RECOVERY
import ResetPassword from "../pages/resetpassword";

import AllLearnMore from '../pages/learnmore/AllLearnMore'

// Routes that should only be visible if authenticated.
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useAuth();
  const { isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

// Routes that should only be visible if NOT authenticated
const AnonymousRoute = ({ component: Component, ...rest }) => {
  const authContext = useAuth();
  const { isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default function Navigation() {
  return (
    <>
      <Switch>
        {/* 1.0 HOME */}
        <PrivateRoute exact path="/" component={Home} />

        {/* 2.0 PLANTS */}
        <PrivateRoute exact path="/plants" component={AllPlants} />
        <PrivateRoute exact path="/plants/add" component={AddPlant} />
        <PrivateRoute
          exact
          path="/plants/edit/:plantId"
          component={EditPlant}
        />
        <PrivateRoute
          exact
          path="/plants/categories"
          component={PlantCategories}
        />

        {/* 3.0 WAYPOINTS */}
        <PrivateRoute exact path="/waypoints" component={AllWaypoints} />
        <PrivateRoute exact path="/waypoints/add" component={AddWaypoint} />
        <PrivateRoute
          exact
          path="/waypoints/edit/:waypointId"
          component={EditWaypoint}
        />
        <PrivateRoute
          exact
          path="/waypoints/categories"
          component={WaypointCategories}
        />

        <PrivateRoute exact path="/learnmore" component={AllLearnMore}/>

        {/* 6.0 USERS */}
        <PrivateRoute exact path="/users" component={AllUsers} />
        <PrivateRoute exact path="/users/add" component={AddUser} />
        <PrivateRoute exact path="/users/edit/:userId" component={EditUser} />

        {/* 7.0 LOCATIONS */}
        <PrivateRoute exact path="/locations" component={Locations} />

        {/* 8.0 MEDIA */}
        <PrivateRoute exact path="/media/images" component={Images} />
        <PrivateRoute exact path="/media/audiofiles" component={AudioFiles} />
        <PrivateRoute exact path="/media/videos" component={Videos} />

        {/* 9.0 TAGS */}
        <PrivateRoute exact path="/tags" component={Tags} />

        {/* 10.0 PROFILE */}
        <PrivateRoute exact path="/profile" component={Profile} />

        {/* 11.0 LOGIN */}
        <AnonymousRoute exact path="/login" component={Login} />

        {/* 11.0 LOGIN */}
        <AnonymousRoute exact path="/recovery" component={ResetPassword} />
      </Switch>
    </>
  );
}
