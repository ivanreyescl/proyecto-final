import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ label, icon, onClick, link, type = "button", disabled, ...rest }) => {
    const ButtonContent = (
        <button
            type={type}
            className="media-boton"
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {icon && <i className={`fa fa-${icon} p-2`}></i>}
            {''}
            {label}
        </button>
    );

    if (link) {
        return (
            <div className="button">
                <Link to={link}>
                    {ButtonContent}
                </Link>
            </div>
        );
    }

    return <div className="button">{ButtonContent}</div>;
};

export default Button;
