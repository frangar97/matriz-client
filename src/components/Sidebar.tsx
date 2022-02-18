import { NavLink } from "react-router-dom"

export const Sidebar = () => {
    return (
        <div className="bg-dark border-right p-3" id="sidebar">
            <h3 className="text-light">
                Matriz riesgo
            </h3>
            <hr className="text-white" />
            <div className="list-group">
                <NavLink to="/" className="list-group-item">Matriz</NavLink>
                <NavLink to="/riesgo" className="list-group-item">Riesgos</NavLink>
                <NavLink to="/control" className="list-group-item">Controles</NavLink>
            </div>
        </div>
    )
}
