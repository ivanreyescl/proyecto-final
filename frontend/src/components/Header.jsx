import './Header.css'
// se sacó el navbar de acá y se movió al app.jsx

const Header = () => {
    return (
        <>
            <header className="d-flex align-items-center text-center bg-dark text-white p-3" >
                <div className="container">
                    <h1 className="h3">¡PC Components!</h1>
                    <span>¡Tenemos los mejores productos que podrás encontrar!</span>
                    <hr/>
                </div>
            </header>
        </>
    )
}

export default Header