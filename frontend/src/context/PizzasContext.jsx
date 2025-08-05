import { useEffect, useState, createContext } from "react"

export const PizzaContext = createContext()  

const PizzasProvider = ({ children }) => {
    const [pizza, setPizza] = useState(null)
    const [loading, setLoading] = useState(true)
    const ENV_URL = 'http://localhost:5000/api/pizzas'

    const fetchPizzasFromApi = async () => {
        try {
            const response = await fetch(ENV_URL)
            const data = await response.json()
            setPizza(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPizzasFromApi()
    }, [])

    return (
        <PizzaContext.Provider value={{ pizza, loading, fetchPizzasFromApi }}>
            {children}
        </PizzaContext.Provider>
    )
}

export default PizzasProvider
