import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/perfil.scss";

import foto from "../../img/perfil.jpg";

export const Perfil = () => {
	useEffect(() => {
		actions.changeNav("interna");
	}, []);
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getName();
	}, []);

	return (
		<div className="text-center mt-1 mb-5">
			<div className="divpinta caja container ">
				<div className="row">
					<div className="col-lg-12  mt-3">
						<div>
							<div>
								<div>
									<img id="avatar" src={foto} />
									<h4>{store.currentUser && store.currentUser.name}</h4>
								</div>
							</div>

							<div className="data">
								<ul className="list-unstyled">
									<li>
										<p>
											<strong className="datos">Correo:</strong>{" "}
											<span>{store.currentUser && store.currentUser.email}</span>
										</p>
									</li>
									<li>
										<p>
											<strong className="datos">Fecha de Nacimiento:</strong>{" "}
											<span>{store.currentUser && store.currentUser.birthday}</span>
										</p>
									</li>
									<li>
										<p>
											<strong className="datos">Sexo:</strong>{" "}
											<span>{store.currentUser && store.currentUser.gender}</span>
										</p>
									</li>
									<li>
										<p>
											<strong className="datos">Total de pruebas realizadas:</strong>{" "}
											<span>0</span>
										</p>
									</li>
									<li>
										<p>
											<strong className="datos">Nota más Alta:</strong> <span>0</span>
										</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
