import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"

export default function Registry() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })
    const submitUser = async (event) => {
        try {
            event.preventDefault()
            await axios({
                url: 'http://34.143.204.34/register',
                method: 'POST',
                data: user
            })
            Swal.fire({
                icon: "success",
                title: "Succesfully registered",
                text: "Please Login",
            });
            navigate('/login')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Please input your Information",
                text: error.response.data.message,
            });
        }
    }
    const handleRegUser = (event) => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }
    console.log(user);
    return (
        <>
            <div className="flex items-center justify-center h-screen p-0 bg-orange-200">
                <form onSubmit={submitUser} style={{ backgroundColor: "lightblue", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                    <label for="username">Name:</label>
                    <input onChange={handleRegUser} type="text" id="username" name="username" />
                    <br />
                    <label for="email">Email:</label>
                    <input onChange={handleRegUser} type="text" id="email" name="email" />
                    <br />
                    <label for="password">Password:</label>
                    <input onChange={handleRegUser} type="password" id="password" name="password" />
                    <br />
                    <input type="submit" className="btn-success" style={{ backgroundColor: 'pink' }} value="Add User" />
                    <Link to={"/login"}>Already A Member? Login Here</Link>
                    <img src="/images/fud.jpeg" alt="makan" className="w-64 h-auto" />
                </form>
            </div>
        </>
    )
}