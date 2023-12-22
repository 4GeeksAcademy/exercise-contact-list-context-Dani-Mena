import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { UpdateContact } from "../component/UpdateContact.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		showUpdate: false,
		idContact: 0,
		nameUpdate: "",
		emailUpdate: "",
		phoneUpdate: "",
		addressUpdate: ""
	});

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAllAgenda();
	}, []);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.listContact.map(item => (
							<ContactCard
								key={item.id}
								full_name={item.full_name}
								address={item.address}
								phone={item.phone}
								email={item.email}
								onDelete={() =>
									setState({
										showModal: true,
										idContact: item.id
									})
								}
								onUpdate={() =>
									setState({
										showUpdate: true,
										idContact: item.id,
										nameUpdate: item.full_name,
										emailUpdate: item.email,
										phoneUpdate: item.phone,
										addressUpdate: item.address
									})
								}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal id={state.idContact} show={state.showModal} onClose={() => setState({ showModal: false })} />
			<UpdateContact
				id={state.idContact}
				name={state.nameUpdate}
				email={state.emailUpdate}
				phone={state.phoneUpdate}
				address={state.addressUpdate}
				show={state.showUpdate}
				onClose={() => setState({ showUpdate: false })}
			/>
		</div>
	);
};
