import React, { useState } from "react";
import Header from './Header';
import TicketControl from "./TicketControl";
import ToggleTheme from "./ToggleTheme";
import { ThemeContext, themes } from "../context/theme-context";

import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {

  const [theme, setTheme] = useState(themes.light);

  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <Header />
        <ToggleTheme />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<TicketControl />} />
        </Routes>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
