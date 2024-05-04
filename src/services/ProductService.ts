import { safeParse,coerce,number, parse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from "axios";
import { toBoolean } from "../utils";
type ProductData ={

[k:string]: FormDataEntryValue;
}
export async function addProduct(data:ProductData){

try {

    const result = safeParse(DraftProductSchema,{

        name: data.name,
        price: Number(data.price)
    
    })
    
   if(result.success){
       const url= `${import.meta.env.VITE_API_URL}/products`

    await axios.post(url,{
            name: result.output.name,
            price: result.output.price
            
       }
       )
   }else {
         throw new Error('Invalid data',)
    
   }
} catch (error) {
    console.error(error)
}
}
export async function getProducts() {
    const url = `${import.meta.env.VITE_API_URL}/products`;
      const response = await axios(url);
      const data = response.data.data;
      const result = safeParse(ProductsSchema, data);
      
      // Verifica si result es un array
      
      
      return  result.output;
      
    
  }
  export async function getProductById(id:Product['id']){
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
    const response = await axios(url);
    const data = response.data.data;
    const result = safeParse(ProductSchema, data);
    return result.output;
  }
  export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const NumberSchema = coerce(number(), Number);


        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            available:toBoolean(data.available.toString())
        }
        );

        console.log("result para actualizacion",result)

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
            await axios.put(url, result.output);
            }
        } catch(error) {
            console.log(error)
        }
    } 

    export async function deleteProduct(id:Product['id']){
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
        await axios.delete(url);
    }

    export async function updateAvailability(id: Product['id']) {
        try {
            // Realizar la solicitud PATCH
            const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
            await axios.patch(url);
            console.log(`Disponibilidad actualizada para el producto con ID ${id}`);
        } catch (error) {
            // Capturar y manejar errores
            console.error(`Error al actualizar la disponibilidad del producto con ID ${id}:`, error);
            throw error; // Re-lanzar el error para que pueda ser manejado en el lugar donde se llama a esta función
        }
    }
    