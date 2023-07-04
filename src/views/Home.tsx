
import { UserType } from "../types/user";
import { CategoryType } from "../types/category"

type HomeProps = {
    user: UserType | null
    flashMessage: (message: string | null, category: CategoryType) => void;
}


export const Home = ({ user, flashMessage}:  HomeProps) => {
    return (
        <div>Home</div>;
    )
}