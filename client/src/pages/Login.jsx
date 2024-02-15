import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2'


export default function Login() {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const submitLog = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios({
                url: 'http://localhost:3000/login',
                method: 'POST',
                data: login
            })
            localStorage.setItem('token', 'Bearer ' + data.access_token)
            localStorage.setItem('rank', data.rank)
            Swal.fire({
                icon: "Sucess",
                title: "Welcome",
                text: `Hello there`,
            });
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error Login",
                text: error.response.data.message,
            });
        }
    }
    const logInput = (event) => {
        const { name, value } = event.target
        setLogin({
            ...login,
            [name]: value
        })
    }
    const handleCredentialResponse = async (response) => {
        try {
            const { data } = await axios({
                url: "http://localhost:3000/login/google",
                method: "POST",
                headers: {
                    "google-token": response.credential
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "142608278006-uk72gb20co2g3ej50hrjvse09o17oc0q.apps.googleusercontent.com",
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
            // google.accounts.id.prompt(); // also display the One Tap dialog
        }
    }, [])
    console.log(login);
    return (
        <>
            <div className="flex items-center justify-center h-screen p-0 bg-orange-200">
                <img src="/images/fud.jpeg" alt="makan" className="w-64 h-auto" />
                <form onSubmit={submitLog} style={{ backgroundColor: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                    <label for='email'>Email :</label>
                    <input onChange={logInput} type="text" id="email" name="email" />
                    <label for='pass'>Password :</label>
                    <input onChange={logInput} type="password" id="pass" name="password" />
                    <br />
                    <input type="submit" value="Login" className="btn-neutral bg-orange" />
                    <Link to={"/register"}>Not A Member? Register Here</Link>
                    <div className="my-3 d-flex jusitifycontent">
                        <p>OR</p>
                        <div id="buttonDiv">
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}