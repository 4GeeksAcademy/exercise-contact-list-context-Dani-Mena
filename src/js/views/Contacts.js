import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		idContact: 0
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
								email={item.email}
								phone={item.phone}
								address={item.address}
								onDelete={() =>
									setState({
										showModal: true,
										idContact: item.id
									})
								}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal id={state.idContact} show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
