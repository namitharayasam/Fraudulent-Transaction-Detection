import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/Home";
import MyTransactions from "./components/MyTransactions";
import NextSteps from "./components/NextSteps";
import EditInfo from "./components/EditInfo";
import MyAccount from "./components/MyAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-transactions' element={<MyTransactions />} />
        <Route path='/next-steps' element={<NextSteps />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/edit-info' element={<EditInfo />} />
      </Routes>
    </Router>
  );
}

export default App;