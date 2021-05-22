import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Form from "react-bootstrap/Form";
import "../../styles/home.scss";

export const Recuperacion = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	let revisionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const valide = email => {
		revisionEmail.test(email) ? continua(email) : alert("ingrese un email válido");
	};
	const continua = email => {
		actions.postForgot(email);
		setEmail("");
	};

	function validateForm() {
		return email.length > 0;
	}
	function handleSubmit(event) {
		event.preventDefault();
	}
	useEffect(() => {
		actions.changeNav("principal");
	}, []);
	return (
		<div className="container-fluid text-center p-3 Principal mt-5 mb-5">
			<div className="container mt-5 mb-5">
				<h5 className="mt-5">
					<strong>Recupera tu contraseña</strong>
				</h5>
				<div className="row text-center mt-2">
					<div className="col-4" />
					<div className="col-4">
						<Form className="mt-3" onSubmit={handleSubmit}>
							<Form.Group size="text" controlId="email">
								<Form.Label>Correo electrónico</Form.Label>
								<Form.Control
									autoFocus
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								<div id="emailHelp" className="form-text mb-2" style={{ color: "gray" }}>
									Utiliza una direccion registrada en el sistema.
								</div>
							</Form.Group>

							<button
								type="button"
								className="btn btn-success m-3"
								disabled={!validateForm()}
								onClick={() => valide(email)}>
								Enviar
							</button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};
