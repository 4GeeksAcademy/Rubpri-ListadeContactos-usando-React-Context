import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	const [tasks, setTasks] = useState([]);
  	const host = "https://jsonplaceholder.typicode.com/";

  	const fetchTasks = async () => {
    const url = host + "users";
    const request = {
      method: "GET",
    };

    const response = await fetch(url, request);

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
	  localStorage.setItem('tasks', JSON.stringify(data))
    } else {
      console.log("Error", response.status, response.statusText);
    }
  	};

  useEffect(() => {
    fetchTasks();
  }, []);



	return (
		<div className="container">
			<ul className="list-group">
				{tasks.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>{item.name}</span>
							</Link>
							{// Conditional render example
							// Check to see if the background is orange, if so, display the message
							item.background === "orange" ? (
								<p style={{ color: item.initial }}>
									Check store/flux.js scroll to the actions to see the code
								</p>
							) : null}
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
