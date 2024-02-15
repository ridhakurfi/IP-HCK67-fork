import { createBrowserRouter, redirect } from 'react-router-dom'
import CardRev from '../pages/Cards'
import Login from '../pages/Login'
import Registry from '../pages/Register'
import Gmaps from '../pages/Maps'
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Registry></Registry>
    },
    {
        path: "/",
        element: <CardRev></CardRev>,
        loader: () => {
            if (!localStorage.getItem('token')) {
                return redirect('/login')
            }
            return null
        }
    },
    {
        path: "/maps/:id",
        element: <Gmaps></Gmaps>,
        loader: () => {
            if (!localStorage.getItem('token')) {
                return redirect('/login')
            }
            return null
        }
    },
])

export default router