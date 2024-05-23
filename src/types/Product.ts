import Category from "./Category";

export interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    quantity: number,
    category: Category,
    images: string[],
}

export default Product;