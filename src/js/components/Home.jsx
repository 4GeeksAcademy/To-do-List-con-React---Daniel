import React, { useState } from "react";
import Tarea from "./Tarea";


const Home = () => {
	let [NuevaTarea, setNuevaTarea] = useState("");  
	let [ListaDeTareas, setListaDeTareas] = useState([
		"Practice Js",
		"Practice React",
		"Do some exercice",
		"Read",
		"Talk with TLOML",
	]);

	const AgregarTarea = (key) => {
		if (key === "Enter" && NuevaTarea.trim() !== "") {
			setListaDeTareas([...ListaDeTareas, NuevaTarea.trim()]);
			setNuevaTarea(""); 
		}
	};

	const BorrarTarea = (index)  => {
		setListaDeTareas(ListaDeTareas.filter((item, i) => index != i ))
	};

	return (
		<div className="text-center fw-bold fs-5">
			<div>
				<h1>To Do List</h1>
				<input
					onChange={event => setNuevaTarea(event.target.value)}
					type="text"
					value={NuevaTarea}
					onKeyUp={event => AgregarTarea(event.key)}
				/>				
			</div>
			{
				ListaDeTareas.map((tarea, index) => {
					return (<Tarea key={index} descripcion={tarea} onDelete={() => BorrarTarea(index)} />) 
				})
			}
		</div>
	);
};

export default Home;
