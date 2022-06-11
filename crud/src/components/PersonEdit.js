import React, { useState, useEffect } from 'react';
import '../css/Zonesoft.css';

export function PersonEdit(props) {
	const emptyPerson =  {id:0, firstname:'', lastname:'', dateOfBirth: ''};
	console.log("[PersonEdit] props.selectedPerson=", props.selectedPerson);
	let [person, setPerson] = useState(emptyPerson);
	console.log("[PersonEdit] person)=", person);
	
	useEffect(
		() =>{
			setPerson(props.selectedPerson);
		},
		[props.selectedPerson]
	)
	
	const updatePerson = (event) => {
		const {name, value} = event.target;
		setPerson({...person, [name]:value})
	}
	
	const handleSubmit = (event) =>{
		event.preventDefault();
		props.updatePersons(event.target.value, person);
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
								<button type="submit" onClick={handleSubmit} value="UPDATE">Save</button>
								<button type="submit" value="CANCEL">Cancel</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	)
}