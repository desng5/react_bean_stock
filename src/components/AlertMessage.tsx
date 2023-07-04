import { CategoryType } from "../types/category";


type AlertMessageProps = {
    message: string | null;
    category: CategoryType;
    flashMessage: (message: string | null, category: CategoryType) => void;
}


export const AlertMessage = ({ message, category, flashMessage,}: AlertMessageProps) => {
    return (
        <div>AlertMessage</div>
    )
}