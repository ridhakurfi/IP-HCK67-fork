import { createBrowserRouter } from 'react-router-dom'
import CardRev from '../pages/Cards'
import LogMe from '../pages/Login'
const router = createBrowserRouter([
    {
        path: "/",
        element: <CardRev></CardRev>
    },
    {
        path: "/login",
        element: <LogMe></LogMe>
    },
])

export default router