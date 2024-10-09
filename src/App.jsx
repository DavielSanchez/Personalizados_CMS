import '../public/Styles/App.css'
import Login from './Pages/Login'
import NewCategory from './Pages/NewCategory'
import NewProduct from './Pages/NewProduct'
import '../public/Styles/Home.css'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import EditCategory from './Pages/EditCategory'
import Products from './Pages/Products'
import EditProduct from './Pages/EditProduct'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route index path='/' element={<Home/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/newcategory' element={<NewCategory/>} />
        <Route path='/category/edit/:category' element={<EditCategory/>}/>
        <Route path='/products' element={<Products/>} />
        <Route path='/newproduct'  element={<NewProduct/>} />
        <Route path='/product/edit/:product' element={<EditProduct/>}/>
      </Route>

      <Route path='/login' element={<Login/>}/>
     </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
