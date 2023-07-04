import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { UserType } from "../types/user"
import { CategoryType } from "../types/category";
import { register } from "../lib/apiWrapper";

type RegisterProps = {
    logUserIn:(user: UserType) => void;
    flashMessage: (message: string | null, category: CategoryType) => void;
}

export const Register = ({ logUserIn, flashMessage }: RegisterProps) => {
    const [newUser, setNewUser] = useState<UserType>({
        username: "",
        email: "", 
        password: "",
    });
    const navigate = useNavigate();
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    };
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const response = await register(newUser)
        if (response.error) {
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data?.username + ' has been created', 'success')
            logUserIn(response.data!)
            navigate('/')
        }
    }

    return (
        <div>
            <h1>Register Here</h1>
            <form onSubmit={handleFormSubmit}>

                <div>
                    <label>Username</label>
                    <input name="username" value={newUser.username} onChange={handleInputChange} />
                </div>
                
                <div>
                    <label>Email</label>
                    <input name="email" value={newUser.email} onChange={handleInputChange} type="email" />
                </div>
                
                <div>
                    <label>Password</label>
                    <input name="password" value={newUser.password} onChange={handleInputChange} type="password"/>
                </div>
                
                <button type="submit">Register</button>
            </form>
        </div>
    )
}