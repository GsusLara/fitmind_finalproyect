const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: {},
			navState: "externa",
			permitir: false,
			item: 1,
			check: false,
			stateAlert: "none",
			botPregunta: "block",
			aleatorioPregunta: "",
			respuestaRegistro: "",
			cuestionario: [],
			opcionesAleatorias: [],
			eleccion: "",
			resultado: 0
		},
		actions: {
			//traer info de usuario
			getName: () => {
				var myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

				var requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/usuario", requestOptions)
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							window.location.href = "./";
							alert("Expiró la sesión");
						}
					})
					.then(result => setStore({ currentUser: result }))
					.catch(error => error);
			},
			//traer todas las preguntas de la bd
			traepreguntas: () => {
				var requestOptions = {
					method: "GET",
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/pregunta", requestOptions)
					.then(response => {
						if (response.status >= 200 && response.status < 300) return response.json();
					})
					.then(result => setStore({ cuestionario: result }))
					.catch(error => error);
			},
			//login
			getUser: (email, password) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					email: email,
					password: password
				});

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							alert(" usuario o contraseña invalido");
						}
					})
					.then(result => {
						sessionStorage.setItem("token", result.token);
						setStore({ permitir: true });
					})
					.catch(error => error);
			},
			//registrar el usuario
			postUser: (nombre, contraseña, fecha, sexo, correo) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify([
					{
						name: nombre,
						password: contraseña,
						birthday: fecha,
						gender: sexo,
						email: correo,
						cant_question: 0,
						nota_alta: 0
					}
				]);

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/usuario", requestOptions)
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							setStore({ respuestaRegistro: 1 });
							return response.json();
						} else {
							setStore({ respuestaRegistro: 2 });
						}
					})
					.then(result => result)
					.catch(error => error);
			},
			//recuperar contraseña
			postForgot: email => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					email: email
				});

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/forgot_pass", requestOptions)
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							alert("Contraseña enviada al correo electrónico");
							return response.json();
						} else {
							alert("el usuario no está registrado");
						}
					})
					.then(result => result)
					.catch(error => error);
			},
			//actualizacion de los registros del usuario
			updateUser: (dato1, dato2) => {
				var myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					cant_question: dato1,
					nota_alta: dato2
				});

				var requestOptions = {
					method: "PUT",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/usuario", requestOptions)
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							alert("error" + response.status);
						}
					})
					.then(result => result)
					.catch(error => error);
			},
			//eliminar usuario
			delUsuario: () => {
				var myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

				var requestOptions = {
					method: "DELETE",
					headers: myHeaders,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/usuario", requestOptions)
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							alert("error" + response.status);
						}
					})
					.then(result => alert("Se eliminó tu cuenta"), 2000)
					.catch(error => error);
			},
			//cambio de la funcionalidad en el boton del nav
			changeNav: index => {
				setStore({ navState: index });
			},
			//contador de la pregunta actual en la realizacion del test
			changeitem: index => {
				setStore({ item: index });
			},
			//controla que el usuario haya seleccionado una respuesta en la pregunta del test
			setcheck: index => {
				setStore({ check: index });
			},
			//estado de la alerta al usuario si nó selecciono una opcion
			setDisplayAlert: index => {
				setStore({ stateAlert: index });
			},
			//mostrar u ocultar el boton de siguiente pregunta
			setBotPregunta: index => {
				setStore({ botPregunta: index });
			},
			//selector aleatorio de pregunta a mostrar
			setAleatorioPregunta: index => {
				let cantidad = Math.floor(Math.random() * index);
				setStore({ aleatorioPregunta: cantidad });
			},
			//deviolver el estado de inicio de sesion a cerrado
			setpermitir: index => {
				setStore({ permitir: index });
			},
			//carbiar el orden de las opciones de respuesta en el test
			setopcionesAleatorias: grupoOpciones => {
				let opciones2 = grupoOpciones;
				let carga = [];
				let select = 0;
				for (let i = 0; i < 4; i++) {
					select = Math.floor(Math.random() * opciones2.length);
					carga.push(opciones2[select]);
					opciones2.splice(select, 1);
				}
				setStore({ opcionesAleatorias: carga });
			},
			//Guarda la eleccion de respuesta del usuario en el test
			setEleccion: dato => {
				setStore({ eleccion: dato });
			},
			//guarda la cantidad de respuestas correctas
			setResultado: dato => {
				setStore({ resultado: dato });
			},
			//limpiar variables de la sesion
			reset: dato => {
				sessionStorage.setItem("token", "null");
				setStore({ currentUser: {} });
				setStore({ permitir: false });
			}
		}
	};
};

export default getState;
