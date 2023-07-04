import { UserType } from "../types/user"
import { CategoryType } from "../types/category";

type RegisterProps = {
    logUserIn:(user: UserType) => void;
    flashMessage: (message: string | null, category: CategoryType) => void;
}

export const Register = (logUserIn, flashMessage): RegisterProps => {
    return (<div>Register</div>
    )
}