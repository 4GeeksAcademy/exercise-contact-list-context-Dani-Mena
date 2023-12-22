import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import propTypes from "prop-types";

export const UpdateContact = props => {
	const [state, setState] = useState({
		//initialize state here
	});

	const { actions } = useContext(Context);
	const [full_name, setFull_Name] = useState(props.name);
	const [email, setEmail] = useState(props.email);
	const [phone, setPhone] = useState(props.phone);
	const [address, setAddress] = useState(props.address);

	// Utiliza un efecto para actualizar el estado si la prop cambia
	useEffect(() => {
		setFull_Name(props.name);
		setEmail(props.email);
		setAddress(props.address);
		setPhone(props.phone);
	}, [props]); // El efecto se ejecutará cada vez que props.name cambie

	const handleSubmit = event => {
		event.preventDefault();
		const actualizaContacto = {
			full_name: full_name,
			email: email,
			phone: phone,
			address: address,
			id: props.id
		};
		actions.updateContact(actualizaContacto);
	};

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Update Contact</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body p-3">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Full Name</label>
								<input
									value={full_name}
									type="text"
									className="form-control"
									placeholder="Full Name"
									onChange={e => setFull_Name(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input
									value={email}
									type="email"
									className="form-control"
									placeholder="Enter email"
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input
									value={phone}
									type="phone"
									className="form-control"
									placeholder="Enter phone"
									onChange={e => setPhone(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Address</label>
								<input
									value={address}
									type="text"
									className="form-control"
									placeholder="Enter address"
									onChange={e => setAddress(e.target.value)}
								/>
							</div>
							<button type="submit" className="btn btn-primary form-control">
								Update
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
UpdateContact.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.number,
	name: PropTypes.string,
	email: PropTypes.string,
	phone: propTypes.string,
	address: PropTypes.string
};
/**
 * Define the default values for
 * your component's properties
 **/
UpdateContact.defaultProps = {
	show: false,
	onClose: null
};
