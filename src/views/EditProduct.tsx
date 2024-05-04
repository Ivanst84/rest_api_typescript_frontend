import { Link ,Form, useActionData, ActionFunctionArgs,redirect,  useLoaderData, LoaderFunctionArgs} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { getProductById, updateProduct } from '../services/ProductService'
import { Product } from '../types'
import ProductForm from '../components/ProductForm';


// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
    if (params && params.id !== undefined) { // Verifica si params está definido antes de acceder a params.id
        const product = await getProductById(+params.id);
        if (!product) {
            throw new Response('Product not found', { status: 404 });
        }
        
        // Devuelve el producto si se obtiene con éxito
        return product;
        
    } else {
        throw new Response('Product ID not provided', { status: 400 });
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    console.log('FormData:', data);

    let error = '';

    // Verifica si data.available está definido antes de continuar
    if (data.available === undefined) {
        error = 'La disponibilidad no está definida';
        return error;
    }

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if (error.length) {
        return error;
    }
    if (params.id !== undefined) {
        await updateProduct(data, +params.id);
        return redirect('/');
    }
}


const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]
export default function EditProduct() {
  const product = useLoaderData() as Product
  const error = useActionData() as string
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl  font-black text-slate-500'>
          Editar  Producto</h2>
        <Link className='bg-indigo-600 text-white p-3  text-sm shadow-sm rounded-md hover:bg-indigo-500'
          to='/'
        >
          Volver a Productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
     
      <Form
        className="mt-10"
        method='POST'
    
      >

       <ProductForm product={product} />


    <div className="mb-4">
        <label
            className="text-gray-800"
            htmlFor="available"
        >Disponibilidad:</label>
        <select 
            id="available"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="available"
            defaultValue={product?.available.toString()}
        >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
        </select>
    </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Editar Producto"
        />
      </Form>
    </>
  )
}
