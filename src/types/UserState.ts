import Product from "./Product";
import User from "./User";
import ValidationError from "./ValidationError";

export interface UserState {
    currentUser: User | null;
    accessToken: string;
    cart: Product[];
    formType: string;
    showForm: boolean;
    showConfirmation: boolean;
    isLoading: boolean;
    errors: ValidationError[] | null;
}