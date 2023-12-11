import React from 'react';
import Header from './Header';
import TicketControl from "./TicketControl";
import ToggleTheme from "./ToggleTheme";

import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Header />
      <ToggleTheme />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<TicketControl />} />
      </Routes>
    </Router>
  );
}

export default App;
