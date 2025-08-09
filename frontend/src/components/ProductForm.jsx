import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductContext } from '../context/ProductsContext.jsx';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';

const RegisterProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { product: productsList, loading, register, update } = useContext(ProductContext);

    const [product, setProduct] = useState({
        name: '',
        detail: '',
        code: '',
        price: '',
        image: '',
        category: ''
    });

    useEffect(() => {
        if (id && productsList && !loading) {
            const prodToEdit = productsList.find(p => p.id.toString() === id);
            if (prodToEdit) {
                setProduct({
                    name: prodToEdit.name || '',
                    detail: prodToEdit.detail || '',
                    code: prodToEdit.code || '',
                    price: prodToEdit.price || '',
                    image: prodToEdit.image || '',
                    category: prodToEdit.category || ''
                });
            } else {
                toast.error('Producto no encontrado');
                navigate('/products');
            }
        }
    }, [id, productsList, loading, navigate]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const returnAlert = (msg) => toast.error(msg, { autoClose: 2000 });
    const returnSuccess = (msg) => toast.success(msg, { autoClose: 2000 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, detail, code, price, category, image } = product;

        if (!name.trim()) return returnAlert('El nombre es obligatorio');
        if (!price || isNaN(price) || Number(price) <= 0) return returnAlert('Precio inválido');
        if (!category.trim()) return returnAlert('La categoría es obligatoria');

        try {
        if (id) {
            await update(id, { name, detail, code, price, image, category });
            returnSuccess('Producto actualizado con éxito');
        } else {
            await register({ name, detail, code, price, image, category });
            returnSuccess('Producto registrado con éxito');
            setProduct({
            name: '',
            detail: '',
            code: '',
            price: '',
            image: '',
            category: ''
            });
            }
            navigate('/products');
        } catch (error) {
            console.error(error);
            returnAlert('Error al guardar el producto');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card col-md-6">
            <div className="card-body">
                <h2 className="card-title text-left">{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre del producto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Ingrese el nombre del producto"
                        required
                    />
                </div>
                <div className="mb-3 d-flex align-items-start gap-3">
                    <div className="d-flex flex-column align-items-center flex-shrink-0">
                        <label htmlFor="image" className="form-label fw-bold">
                        Imagen del producto
                        </label>
                        <div
                        className="border rounded bg-light d-flex justify-content-center align-items-center overflow-hidden"
                        style={{ width: '200px', height: '200px' }}
                        >
                        {product.image ? (
                            <img
                            src={product.image}
                            alt="Vista previa"
                            className="img-fluid"
                            style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                            />
                        ) : (
                            <span className="text-secondary">Sin imagen</span>
                        )}
                        </div>
                    </div>

                    <div className="flex-grow-1 d-flex">
                        <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setProduct(prev => ({ ...prev, image: reader.result }));
                                };
                                reader.readAsDataURL(file);
                            } else {
                                setProduct(prev => ({ ...prev, image: '' }));
                            }
                        }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="detail" className="form-label">Detalle</label>
                    <textarea
                        className="form-control"
                        id="detail"
                        name="detail"
                        value={product.detail}
                        onChange={handleChange}
                        placeholder="Ingrese el detalle"
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                        <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        >
                        {/*TODO: Se deben mostrar las opciones disponibles acá, en base a los objetos creados de la tabla Category */}
                        <option value="">Seleccione una categoría</option>
                        <option value="Procesadores">Procesadores</option>
                        <option value="GPU">GPU</option>
                        <option value="RAM">RAM</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">Precio (CLP)</label>
                        <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Ingrese el precio"
                        min="0"
                        required
                        />
                    </div>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                    <Button
                        type="submit"
                        label={id ? 'Actualizar Producto' : 'Registrar Producto'}
                        icon={id ? 'fa fa-save' : 'fa fa-plus'}
                        disabled={!product.name.trim() || !product.price || !product.category.trim()}
                    />
                    <Link to="/products">
                        <Button label="Volver" icon="fa fa-arrow-left" />
                    </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};

export default RegisterProduct;
