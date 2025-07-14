import { useState } from "react";

const Tarea = ({descripcion, onDelete}) => {

    const [isHover, setIsHover] = useState (false)

    return (
        <p onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}> {descripcion}
			{ isHover && <button className= "btn btn-secondary text-white ms-2" onClick={onDelete}> <i className="fa-solid fa-x"></i> </button>}
        </p>
    )
}
export default Tarea;