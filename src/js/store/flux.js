const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			listContact: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getAllAgenda: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/dani_mena")
					.then(response => response.json())
					.then(data => setStore({ listContact: data }))
					.catch(error => {
						console.log(error);
					});
			},

			createOneContact: newContact => {
				fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify({
						full_name: `${newContact.name}`,
						email: `${newContact.email}`,
						agenda_slug: `${newContact.agenda_slug}`,
						address: `${newContact.address}`,
						phone: `${newContact.phone}`
					}),

					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						return response.json();
					})
					.then(data => console.log(data))
					.catch(error => console.log(error));
			},

			deleteContact: idContact => {
				const url = `https://playground.4geeks.com/apis/fake/contact/${idContact}`;
				fetch(url, {
					method: "DELETE"
				})
					.then(resp => {
						console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
						console.log(resp.status); // el código de estado = 200 o código = 400 etc.
						if (resp.ok === true) {
							getActions().getAllAgenda();
						}
						return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => console.log(data))
					.catch(error => {
						console.log(error);
					});
			}
		}
	};
};

export default getState;
