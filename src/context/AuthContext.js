import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ping, getUser } from "../network";
const AuthContext = React.createContext();

/* 
  @desc a function that initializes context. useAuth gives us access to the data within AuthProvider.value
  @author Patrick Fortaleza
*/
export function useAuth() {
  return useContext(AuthContext);
}

/* 
  @desc A provider that wraps our entire application in a context.
  @param children -- all JSX and components wrapped inside the provider
  @return children + JSX
  @author Patrick Fortaleza
*/
export function AuthProvider({ children }) {
  /*
    @desc userData that includes the user's token, and user data such as user_name, email, and _id. 
          Changes are also saved to localStorage using the custom useLocalStorage hook.
    @author Patrick Fortaleza
    @type Object | Null
  */
  const [userData, setUserData] = useLocalStorage("userData", null);
  /*
    @desc isAuthenticated is a boolean value that is toggled on/off depending on the evaluation
          of the authentication state via token.
    @author Patrick Fortaleza
    @type Boolean
  */
  const [isAuthenticated, setAuthentication] = useState(true);

  /*
    @desc on mount, we will evaluate the token
    @author Patrick Fortaleza
  */
  useEffect(() => {
    const pingToken = async () => {
      await validateToken();
    };

    pingToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    @desc on userData update, evaluate if null or undefined, signout if null.
    @author Patrick Fortaleza
  */
  useEffect(() => {
    if (userData === null || !userData) {
      signOut();
    } else {
      setAuthentication(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  /*
    @desc Signs the user out. Sets auth to false, and resets userData.
    @author Patrick Fortaleza
    @param null
    @return void
  */
  const signOut = () => {
    setAuthentication(false);
    setUserData(null);
  };

  /*
    @desc Evluates the token stored in userData.
    @author Patrick Fortaleza
    @param null
    @return () => signOut() -- signs the user out, resets data.
  */
  const validateToken = async () => {
    const result = await ping();
    if (result.error) return signOut();
  };

  /*
    @desc Queries the user's data and updates userData
    @author Patrick Fortaleza
    @param null
    @return () => void
  */
  const queryUser = async () => {
    const id = userData.user._id;
    if (!id) return;
    const result = await getUser(id);
    if (result.error) return;
    const updatedUser = {
      accessToken: userData.accessToken,
      user: {
        ...result,
      },
    };
    setUserData(updatedUser);
  };

  const value = {
    // Properties
    userData,
    isAuthenticated,
    // Methods
    setUserData,
    signOut,
    queryUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
