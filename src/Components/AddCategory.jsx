import { useState } from "react"
import UploadImages from './UploadImages';

function AddCategory() {

    const [categoryName, setCategoryName] = useState('');
    // const [categoryImage, setCategoryImage] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryTag, setCategoryTag] = useState('');
    const [categoryComment, setCategoryComment] = useState('');

    const handleImageUrl = (url) => {
        setCategoryImage(url);
      };

    const data = {
        categoryName : categoryName,
        categoryImage : categoryImage,
        categoryTag : categoryTag,
        categoryComment : categoryComment
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir recarga de página
    
        // Crear el objeto con los datos a enviar
        // console.log(data)
    
        // Hacer la solicitud POST al servidor
        try {
          const response = await fetch('http://localhost:3000/categories/add', {
            method: 'POST', // Especificar el método POST
            headers: {
              'Content-Type': 'application/json', // Especificar el tipo de contenido
            },
            body: JSON.stringify(data), // Convertir los datos a formato JSON
          });
    
          if (!response.ok) {
            throw new Error('Error al enviar el post');
          }
    
        //   const responseData  = await response.json(); // Obtener la respuesta en formato JSON
        //   console.log('Post creado:', responseData );
          // Puedes actualizar el estado o mostrar un mensaje de éxito aquí
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <>
    <div className="container">
            <div className="row mt-5">
                <div className="col-sm-12">
                    <h1 className="contact_taital">Nueva Categoria</h1>
                </div>
            </div>
        </div>
    <div className="container-fluid">
            <div className="contact_section_2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mail_section_1">
                            <input type="text" className="mail_text" placeholder="Nombre de la categoria" name="CategoryName" onChange={(e) => {
                                setCategoryName(e.target.value)
                                setCategoryTag(e.target.value.toUpperCase())
                            }} />
                            <UploadImages onImageUpload={handleImageUrl} />
                            {/* <input type="text" className="mail_text" placeholder="Imagen" name="CategoryImage" onChange={(e) => {
                                setCategoryImage(e.target.value)
                            }} /> */}
                            <input type="text" className="mail_text" placeholder={categoryTag} name="CategoryTag" readOnly/>
                            <textarea className="massage-bt" placeholder="Comentario" rows="5" id="comment" name="CategoryComment" onChange={(e) => {
                                setCategoryComment(e.target.value)
                            }} ></textarea>
                            <div className="botones d-flex">
                            <div className="send_bt more me-3"><a href="/categories">Ver Categorias</a></div>
                            <div className="send_bt ms-3"><a href="#" onClick={handleSubmit}>Guardar</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddCategory