import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AddContact = () => {
	const [inputData, setInputData] = useState({
		name: "",
		email: "",
		agenda_slug: "dani_mena",
		phone: "",
		address: "",
		enviar: false
	});

	const [name, setName] = useState("");
	const [mail, setMail] = useState("");
	const [phone, setPhone] = useState("");
	const [direccion, setDireccion] = useState("");
	const { actions } = useContext(Context);

	const handleSubmit = event => {
		event.preventDefault();
		if (name != "" && mail != "" && phone != "" && direccion != "") {
			setInputData({
				name: name,
				email: mail,
				phone: phone,
				agenda_slug: "dani_mena",
				address: direccion,
				enviar: true
			});
		} else {
			window.alert("Faltan datos por incluir");
		}
	};

	useEffect(() => {
		if (inputData.enviar === true) {
			actions.createOneContact(inputData);
			inputData.enviar = false;
			window.alert(`Se ha incluido correctamente a ${name}`);
			setName("");
			setMail("");
			setDireccion("");
			setPhone("");
		}
	}, [inputData]);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							value={name}
							type="text"
							className="form-control"
							placeholder="Full Name"
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							value={mail}
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={e => setMail(e.target.value)}
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
							value={direccion}
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={e => setDireccion(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
