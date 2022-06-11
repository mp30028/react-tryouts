import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getAll } from './data/PeopleData';
import {Outlet, Route, Routes } from 'react-router-dom';
import '../css/Zonesoft.css';
import{PersonEdit} from './PersonEdit';

export function PeopleList() {
	const [persons, setPersons] = useState(getAll());
	const navigate = useNavigate();
	
	const handleSelection = (event) => {
    	navigate("edit/" + event.target.value, { replace: true });
	}
	
	const updatePersons = (updateType, person) => {
		console.log("[PeopleList.updatePerson] updateType=", updateType, ". person=", person);
		let newPersons = [];
//		debugger;
		if (updateType === 'UPDATE') {
			newPersons = persons.map(p => { return ((p.id === person.id) ? person : p) });
		} else if (updateType === 'CREATE') {
			newPersons = [...persons, person];
		} else if (updateType === 'DELETE') {
			newPersons = persons.filter((p) => { return (p.id === person.id ? null : p) })
		}
		setPersons(newPersons);
	}

	return (
		<div style={{ display: "flex" }}>
			<nav className="zsft-explorer">
				<table className="zsft-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Date of Birth</th>
							<th>View</th>
						</tr>
					</thead>
					<tbody>
						{persons.map(person =>
							<tr key={person.id}>
								<td>{person.id}</td>
								<td>{person.firstname}</td>
								<td>{person.lastname}</td>
								<td>{person.dateOfBirth}</td>
								<td style={{textAlign:"center"}}>
									<input type="radio" name="person" id={'selected' + person.id} value={person.id} onClick={handleSelection} />
									<label htmlFor={'selected' + person.id} className="ellipses">. . .</label>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</nav>
			<Routes>
				<Route path="edit/:id" element={<PersonEdit updatePersons={updatePersons}/>} />
			</Routes>
			<Outlet />
		</div>
	);
}