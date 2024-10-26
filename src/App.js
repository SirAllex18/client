import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/loginPage";
import SelectPage from "scenes/homePage";

import { CssBaseline } from "@mui/material";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select" element= {<SelectPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;