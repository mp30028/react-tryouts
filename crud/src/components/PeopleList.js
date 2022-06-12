import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getAll } from './data/PeopleData';
import {Outlet, Route, Routes } from 'react-router-dom';
import '../css/Zonesoft.css';
import{PersonEdit} from './PersonEdit';

export function PeopleList() {

	const [persons, setPersons] = useState(getAll());
	const navigate = useNavigate();
	const emptyPerson = useMemo(() => {return  {id:0, firstname:'', lastname:'', dateOfBirth: ''}}, []);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [action, setAction] = useState();
	let lastAction = {act: null, person: null};
	
	const handleSelection = (event) => {
		const idToFind = parseInt(event.target.value);
		lastAction.act = event.target.name;
		lastAction.person = persons.find(p => p.id === idToFind);
		setAction(lastAction);
	}
	
	const handleAddNew = (event) => {
		lastAction.act = event.target.name;
		lastAction.person = emptyPerson;
		setAction(lastAction);
	}
	
	const shouldSelect = (id) =>{
		return ( selectedPerson ? selectedPerson.id === id : false);
	}

	useEffect(
		() =>{
			if(!selectedPerson){
				navigate("/list", { replace: true });
				
			} else if(selectedPerson.id === emptyPerson.id){
				navigate("add", { replace: true });
			}else{
				console.log("[PeopleList.useEffect[selectedPerson]] selectedPerson", selectedPerson);
	    		navigate("edit", { replace: true });
	    	}
		},
		[selectedPerson, navigate, emptyPerson]	
	);

	useEffect(
		() => {
			if (action){
				switch(action.act){
					case "selectPerson":
						setSelectedPerson(action.person);
						break;
					case "addPerson":
						setSelectedPerson(emptyPerson);
						break;
					default:
						setSelectedPerson(null);
						break;
				};
			};
		},
		[action, emptyPerson]		
	)

	const updatePersons = (updateType, person) => {
		console.log("[PeopleList.updatePerson] updateType=", updateType, ". person=", person);
		let newPersons = [];
		if (updateType === 'UPDATE') {
			newPersons = persons.map(p => { return ((p.id === person.id) ? person : p) });
		} else if (updateType === 'CREATE') {
			newPersons = [...persons, person];
		} else if (updateType === 'DELETE') {
			newPersons = persons.filter((p) => { return (p.id === person.id ? null : p) })
		}else{
			newPersons = persons;
		}
		setPersons(newPersons);
		setSelectedPerson(null);
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
									<input type="radio" name="selectPerson" id={'selected' + person.id} value={person.id} onChange={handleSelection} checked={shouldSelect(person.id)} />
									<label htmlFor={'selected' + person.id} className="ellipses">. . .</label>
								</td>
							</tr>
						)}
						<tr>
							<td colSpan="5" style={{textAlign:"right"}}>
								<button type="submit" name="addPerson" onClick={handleAddNew}>Add New</button>
							</td>
						</tr>
					</tbody>
				</table>
			</nav>
			<Routes>
				<Route path="edit" element={<PersonEdit action="EDIT" selectedPerson={selectedPerson} updatePersons={updatePersons}/>} />
				<Route path="add" element={<PersonEdit action="ADD" selectedPerson={selectedPerson} updatePersons={updatePersons}/>} />
			</Routes>
			<Outlet />
		</div>
	);
}