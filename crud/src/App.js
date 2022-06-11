import React from 'react';
import { Outlet, Link } from "react-router-dom";
//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/Zonesoft.css';
//import {PeopleList} from "./components/PeopleList";

function App() {
	return (

		<div >
			<h1>Example CRUD App</h1>
			<nav className="zsft-menu">
				<Link to="/list">List of People</Link>
			</nav>
{/*
			<div style={{ display: "flex"}}>
				<PeopleList />
			</div>
*/}
			<Outlet />
		</div >

	);
}

export default App;
