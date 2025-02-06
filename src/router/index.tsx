import { useRoutes } from "react-router-dom"
import { SuspenseContainer } from "../config"
import { lazy } from "react"
import ProductList from "../pages/home/Product"
import ProductDetail from "../pages/detail/ProductDetail"
import Wishlist from "../pages/wishlist/Wishlist"


const Home=lazy(()=>import('../pages/home/Home'))
const Layout=lazy(()=>import('../pages/layout/Layout'))

const Routers = () => {
  return (
    <>
    {
        useRoutes([
            {
                path: '/',
                element:(
                    <SuspenseContainer>
                        <Layout/>
                    </SuspenseContainer>
                ),
                children:[
                    {
                        path: '/',
                        element:(
                            <SuspenseContainer>
                                <Home/>
                            </SuspenseContainer>
                        )
                    },
                    {
                        path: '/products',
                        element:(
                            <SuspenseContainer>
                                <ProductList/>
                            </SuspenseContainer>
                        )
                    },
                    {
                        path: '/products/:id',
                        element:(
                            <SuspenseContainer>
                                <ProductDetail/>
                            </SuspenseContainer>
                        )
                    },
                    {
                        path: "/wishlist",
                        element: (
                          <SuspenseContainer>
                            <Wishlist />
                          </SuspenseContainer>
                        )
                    }
                ]
            }
        ])
    }
    </>
  )
}

export default Routers