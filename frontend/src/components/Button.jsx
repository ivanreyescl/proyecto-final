import { Link } from 'react-router-dom';
import './Button.css'; 

const Button = ({ label, icon, onClick, link }) => {
    const ButtonContent = (
        <button
            className={`media-boton`}
            onClick={onClick}
        >
            {label}
            <i className={`fa ${icon ? `fa-${icon}` : ''}`}></i>
        </button>
    )

    return (
        <div className="button">
            {link ? <Link to={link}>{ButtonContent}</Link> : ButtonContent}
        </div>
    )
}

export default Button
