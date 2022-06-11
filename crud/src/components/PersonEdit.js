import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { getById } from './data/PeopleData'
import '../css/Zonesoft.css';

export function PersonEdit(props) {
	const params = useParams();
	const emptyPerson = {id:0, firstname:'', lastname:'', dateOfBirth: ''};
	const [fetchedPerson, setFetchedPerson] = useState(emptyPerson);
	let [person, setPerson] = useState(fetchedPerson);
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
		const {name, value} = event.target;
//		console.log("[PersonEdit.updatePerson]  {name, value}",  {name, value});
		setPerson({...person, [name]:value})
//		person = {...person, [name]:value};
	}
	
	const handleSubmit = (event) =>{
		event.preventDefault();
//		alert(event.target.value);
//		if (!person.firstname || !person.lastname) return
//
		props.updatePerson(event.target.value, person);
//		setPerson(emptyPerson);
	}
	
	
	return(
		<div style={{padding: "1rem"}}>
			<form onSubmit={handleSubmit}>
				<table className="zsft-table">
					<tbody>
						<tr>
							<th className="id">Person ID</th>
							<td>
								<input type="text" name="id" value={person.id} onChange = {updatePerson}/>
							</td>
						</tr>
						<tr>
							<th className="id">Firstname</th>
							<td>
								<input type="text" name="firstname" value={person.firstname} onChange = {updatePerson} />
							</td>
						</tr>
						<tr>
							<th className="id">Lastname</th>
							<td>
								<input type="text" name="lastname" value={person.lastname} onChange = {updatePerson} />
							</td>
						</tr>
						<tr>
							<th className="id">Date of Birth</th>
							<td>
								<input type="text" name="dateOfBirth" value={person.dateOfBirth} onChange = {updatePerson} />
							</td>
						</tr>
						<tr>
							<td colSpan="2" style={{textAlign:"right"}}>
								<button type="submit" onClick={handleSubmit} value="SAVE">Save</button>
								<button type="submit" value="CANCEL">Cancel</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	)
}