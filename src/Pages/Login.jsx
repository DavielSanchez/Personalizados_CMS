import '../../public/Styles/Login.css'
function Login() {
  return (
    <>
    <div className="container_main">
      <div className="container_login">
        <div className="container-fluid">
            <div className="contact_section_2">
              <div className="container_title d-flex justify-content-center">
              <h1 className='title_login'>Ingresa</h1>
              </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="login_text_section">
                            <input type="text" className="login_text" placeholder="Correo Electronico" name="userEmail" />
                            <input type="password" className="login_text" placeholder="Contraseña" name="userPassword" />
                            
                        </div>
                    </div>
                </div>
                <div className="login_button">
                  <div className="send_bt more "><a href="#">Inicia Sección</a></div>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login