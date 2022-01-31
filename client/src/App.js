import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Route } from "react-router-dom";
import axios from "axios";
import AuthContext from "./store/auth-context";
import SavedCodes from "./pages/SavedCodes";
import CodeFile from "./pages/CodeFile";
// import UnAuthorisedError from "./pages/UnAuthorisedError";

function App() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/userInfo`, { withCredentials: true })
      .then((response) => {
        // console.log(response);
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{userInfo : userInfo}}>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/saved-codes" exact component={userInfo !== null && SavedCodes} />
      <Route path="/:id/:filename" exact component={CodeFile} />
    </AuthContext.Provider>
  );
}

export default App;
