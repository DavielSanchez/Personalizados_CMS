
function NavBar() {
  return (
    <>
    <div className="header_section header_bg">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="name me-5">
                    <a className="navbar-brand text-name" href="/">Personalizados - CMS</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse ms-5 me-5" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ms-3 me-3">
                            <a className="nav-link" href="/products">Productos</a>
                        </li>
                        <li className="nav-item ms-3 me-3">
                            <a className="nav-link" href="/categories">Categorias</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 ms-5">
                        <div className="login_bt">
                            <ul>
                                <li><a href="#"><span className="user_icon text-name"><i className="fa fa-user" aria-hidden="true"></i></span><span className="text-name">D. Sanchez</span></a></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    </div>
    </>
  )
}

export default NavBar