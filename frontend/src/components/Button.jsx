import { Link } from 'react-router-dom';

const Button = ({ label, bgColor, textColor, icon, onClick, link }) => {
    const ButtonContent = (
        <button
            className={`btn ${bgColor ? `btn-${bgColor}` : ''} ${textColor ? `text-${textColor}` : ''}`}
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
