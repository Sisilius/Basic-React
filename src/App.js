import React, { useEffect, useState } from "react";
import './styles/app.css';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';
import Navbar from "./components/UI/NavBar/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
  return(
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
  );
}

export default App;
