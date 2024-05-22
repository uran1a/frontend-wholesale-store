import Product from "./Product";
import User from "./User";

export interface UserState {
    currentUser: User | null;
    accessToken: string;
    cart: Product[];
    formType: string;
    showForm: boolean;
    isLoading: boolean;
    error: string | null;
}