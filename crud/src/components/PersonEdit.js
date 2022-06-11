import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { getById } from './data/PeopleData'
import '../css/Zonesoft.css';

export function PersonEdit() {
	const params = useParams();
	const emptyPerson = {id:0, firstname:'', lastname:'', dateOfBirth: ''};
	const [fetchedPerson, setFetchedPerson] = useState(emptyPerson);
	const [person, setPerson] = useState(fetchedPerson);
	console.log("[PersonEdit] params.id=", params.id);

	const fetchPerson = useCallback(
		() => {
			const  getPersonId = () => { 
				const returnValue = params.id ? parseInt(params.id) : 0;
				return returnValue;
			};
			
			
			const personId = getPersonId();
			if(personId){
				const justFetchedPerson = getById(personId);
				if(justFetchedPerson){
					setFetchedPerson(justFetchedPerson);
				}
			}
			console.log("[PersonEdit - fetchPerson] personId=", personId)
		},
		[params.id]
	)
	
	
	useEffect(fetchPerson,	[fetchPerson])
	
	
	useEffect(
		() =>{
			if (fetchedPerson){
				setPerson(fetchedPerson)
			}
			console.log("[PersonEdit - useEffect[fetchedPerson]] fetchedPerson=", fetchedPerson);
		},
		[fetchedPerson]
	)
	
	
	

	


	
	const updatePerson = (event) => {
//		const {name, value} = event.target;
//		console.log("[PersonEdit.updatePerson]  {name, value}",  {name, value});
//		setPerson({...person, [name]:value})
//		person = {...person, [name]:value};
	}
	
	const handleSubmit = (event) =>{
//		event.preventDefault()
//		if (!person.firstname || !person.lastname) return
//
//		props.addPerson(person);
//		setPerson(emptyPerson);
	}
	
	
	return(
		<main>
			<form onSubmit={handleSubmit}>
				<label>id</label><input type="text" name="id" value={person.id} onChange = {updatePerson}/> <br/>
				<label>firstname</label><input type="text" name="firstname" value={person.firstname} onChange = {updatePerson} /> <br/>
				<label>lastname</label><input type="text" name="lastname" value={person.lastname} onChange = {updatePerson} /> <br/>
				<label>dateOfBirth</label><input type="text" name="dateOfBirth" value={person.dateOfBirth} onChange = {updatePerson} /> <br/>
				<button>Save</button>
			</form>
		</main>
	)
}