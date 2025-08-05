import { useContext } from 'react'
import CardPizza from "../components/CardPizza"
import { PizzaContext } from "../context/PizzasContext"
import { useParams } from 'react-router-dom'

const Pizza = () => {
    const { pizza, loading } = useContext(PizzaContext)
    const { id } = useParams();

    if (loading) return <p>Cargando pizzas...</p>;

    if (id) {
        const selectedPizza = pizza?.find((p) => p.id === id)
        return (
            <div className="container mt-2">
                <div className="row">
                    <div className="col-12">
                        <CardPizza
                            id={selectedPizza.id}
                            name={selectedPizza.name}
                            price={selectedPizza.price}
                            ingredients={selectedPizza.ingredients}
                            img={selectedPizza.img}
                            description={selectedPizza.desc}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {pizza && pizza.map((p, index) => (
                    <div key={index} className="col-md-4 col-sm-6 col-12 mb-4">
                        <CardPizza
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            ingredients={p.ingredients}
                            img={p.img}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pizza;