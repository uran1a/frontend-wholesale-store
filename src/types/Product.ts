import Category from "./Category";

export interface Product {
    id: number,
    images: string[],
    title: string,
    category: Category,
    price: number,
    description: string,
    quantity: number,
}

export default Product;