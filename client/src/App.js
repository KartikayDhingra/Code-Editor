import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Route } from "react-router-dom";
import axios from "axios";
import AuthContext from "./store/auth-context";

function App() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/userInfo", { withCredentials: true })
      .then((response) => {
        console.log(response);
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{userInfo : userInfo}}>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={Signup} />
    </AuthContext.Provider>
  );
}

export default App;
