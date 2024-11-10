import '../../public/Styles/Home.css'
function Home() {
  return (
    <>


      <div className="title">
        <span className="title-text">CMS - PERSONALIZADOS RD</span>
      </div>
    <div className="parent">
        <div className="div1"> <a href="/categories">Categorias</a></div>
        <div className="div2"> <a href="/products">Productos</a> </div>
        <div className="div1"> <a href="/categories">Cupones</a></div>
        <div className="div2"> <a href="/products">Productos</a> </div>
    </div>
    <div className="title">
      <span className='webSite-LinkContainer'>
        <a className='webSite-Link d-flex' href="https://personalizados-web.onrender.com">Personalizados RD - WebSite 
          <div className="iconContainer">
          <span className="material-symbols-outlined">language</span>
          </div>
        </a>
      </span>
    </div>
    
    </>
  )
}

export default Home