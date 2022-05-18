import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sun from "./images/sun.png";
import Moon from "./images/moon.png";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RouteConfig from "./Components/RouteConfig";
import { Component, useState } from "react";
import classNames from "classnames";
import log from "./utils/constants";
import cookie, { load } from "react-cookies";
import CookieDialog from "./Components/CookieDialog";
import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
export default App;

function App() {
  var isdark = false;

  if (cookie.load("isDark") != undefined) {
    if (cookie.load("isDark") == "true") {
      isdark = true;
    }
  }

  const [parentbg, setparentbg] = useState(isdark ? "gray-700" : "white");
  const [txtcolor, settxtcolor] = useState(isdark ? "white" : "black");
  const [user, setUser] = useState(0);

  const refreshCallback = () => {
    log("Refresh Called!");
    setUser(0);
  };

  return (
    <div>
      <CookieDialog />
      <div className={classNames("flex flex-col h-screen", `text-${txtcolor} bg-${parentbg}`)}>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
          />
        <RouteConfig
          refreshCallback={refreshCallback}
          user={user}
          setParentBg={setparentbg.bind(this)}
          setTxtColor={settxtcolor.bind(this)}
        />
      </div>
    </div>
  );
}
