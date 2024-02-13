import { createBrowserRouter } from 'react-router-dom'
import CardRev from '../pages/Cards'
const router = createBrowserRouter([
    {
        path: "/",
        element: <CardRev></CardRev>
    }
])

export default router