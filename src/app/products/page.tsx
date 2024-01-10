import { PaginationProduct } from "../models";
import Image from "next/image";
   
async function getProducts(): Promise<PaginationProduct> {
const response = await fetch("http://localhost:8000/products",{
    next: {
        revalidate: 10,
    },
    });
return await response.json();
}

    async function ProductsListPage(){
     const products = await getProducts();
     console.log(products);

    return (
        <div className="m-2">
            <form>
                <input type="search" placeholder="Pesquisar.." name="name"/>
                <button type="submit">Pesquisar</button>
            </form>
            <div className="container mt-8">
                <h1 className="text-2x font-bold">Lista de Produtos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-4">
                    {products.products.map((product, key) => (
                        <div className="bg-white p-4 rounded shadow" key={key}>
                        <Image src={product.image_url} alt={product.name} width={150} height={150}/>
                        <h2 className="text-lg text-black font-semibold">
                           {product.name}   
                        </h2>
                        <div className="text-blue-600 font-bold"> 
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}  
                        </div>
                        </div>
                    ))}
                    
                    
                </div>
            </div>
        </div>
    )
 }

 export default ProductsListPage;