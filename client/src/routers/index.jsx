import { createBrowserRouter } from 'react-router-dom'
import CardRev from '../pages/Cards'
import Login from '../pages/Login'
import Registry from '../pages/Register'
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
])

export default router