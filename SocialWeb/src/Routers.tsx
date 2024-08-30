
import { createBrowserRouter } from 'react-router-dom'
import Template from './Template'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Comments from './Pages/Comments'
import Likes from './Pages/Likes'

const Routers= createBrowserRouter([
    {
        path: '/',
        element: <Template />,
        children: [
            {
                path: '/',
                // loader: async()=>{

                // },
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/profile/:id',
                element: <Profile />
            },
            {
                path: '/comments/:id',
                element: <Comments />
            },
            {
                path: '/likes/:id/:type',
                element: <Likes />
            }
        ]
    }
])

export default Routers