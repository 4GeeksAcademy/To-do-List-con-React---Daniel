import React, { useState, useEffect } from "react";
import Tarea from "./Tarea";


const Home = () => {

	const ApiUrl = "https://playground.4geeks.com/todo/users/Dan28"

	let [NuevaTarea, setNuevaTarea] = useState("");

	let [ListaDeTareas, setListaDeTareas] = useState([]);

	const onLoad = () => {
		fetch(ApiUrl).then(response => {
			return response.json()
		}).then(datos => {
			setListaDeTareas(datos.todos)
		})
	}

	useEffect(onLoad, []);

	const AgregarTarea = (key) => {
		if (key === "Enter" && NuevaTarea.trim() !== "") {
			//setListaDeTareas([...ListaDeTareas, NuevaTarea.trim()]);
			

			fetch('https://playground.4geeks.com/todo/todos/Dan28', {
      method: "POST",
      body: JSON.stringify({
		label: NuevaTarea,
		is_done: false
	  }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); 
		if (resp.ok){
			//onLoad()
			setNuevaTarea("");
		}
        console.log(resp.status); 
        return resp.json(); 
    })
    .then(data => {
		
        console.log(data); 
		setListaDeTareas([...ListaDeTareas, datos]);
    })
    .catch(error => {
        
        console.log(error);
    });
		}
	};

	const BorrarTarea = (id) => {
		//setListaDeTareas(ListaDeTareas.filter((item, i) => index != i))
		fetch('https://playground.4geeks.com/todo/todos/' + id , {
      method: "DELETE",
      
    })
    .then(resp => {
        console.log(resp.ok); 
		if (resp.ok){
			onLoad()			
		}
        console.log(resp.status); 
        return resp.json(); 
    })
    .catch(error => {
        
        console.log(error);
    });
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
					return (<Tarea key={index} descripcion={tarea.label} onDelete={() => BorrarTarea(tarea.id)} />)
				})
			}
		</div>
	);
};

export default Home;
