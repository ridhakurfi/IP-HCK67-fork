import { createBrowserRouter } from 'react-router-dom'
import CardRev from '../pages/Cards'
import Login from '../pages/Login'
import Registry from '../pages/Register'
import Gmaps from '../pages/Maps'
const router = createBrowserRouter([
    {
        path: "/",
        element: <CardRev></CardRev>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Registry></Registry>
    },
    {
        path: "/maps/:id",
        element: <Gmaps></Gmaps>
    },
])

export default router