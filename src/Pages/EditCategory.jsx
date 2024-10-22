import { useState } from "react"
import { useLocation } from 'react-router-dom';
import UploadImages from '../Components/UploadImages';


function EditCategory() {

    const location = useLocation()
    const { _id, categoryName, categoryTag, categoryImage, categoryComment } = location.state

    const [newCategoryName, setCategoryName] = useState(`${categoryName}`);
    // const [newCategoryImage, setCategoryImage] = useState(`${categoryImage}`);
    const [newCategoryImage, setCategoryImage] = useState(`${categoryImage}`);
    const [newCategoryTag, setCategoryTag] = useState(`${categoryTag}`);
    const [newCategoryComment, setCategoryComment] = useState(`${categoryComment}`);

    const handleImageUrl = (url) => {
        if(url == ''){ 
            setCategoryImage(newCategoryImage)
            // setCategoryImage(url)
        }else{ setCategoryImage(url)}
      };

    const data = {
        categoryName : newCategoryName,
        categoryImage : newCategoryImage,
        categoryTag : newCategoryTag,
        categoryComment : newCategoryComment
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir recarga de página
      
        // Crear el objeto con los datos a enviar
      
        // Hacer la solicitud PUT al servidor
        try {
          const response = await fetch(`http://localhost:3000/categories/put/${_id}`, {
            method: 'PUT', // Especificar el método PUT
            headers: {
              'Content-Type': 'application/json', // Especificar el tipo de contenido
            },
            body: JSON.stringify(data), // Convertir los datos a formato JSON
          });
      
          if (!response.ok) {
            throw new Error('Error al enviar la solicitud PUT');
          }
      
          const responseData = await response.json(); // Obtener la respuesta en formato JSON
          console.log('Categoría actualizada:', responseData);
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
                    <h1 className="contact_taital">Editar Categoria</h1>
                </div>
            </div>
        </div>
    <div className="container-fluid">
            <div className="contact_section_2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mail_section_1">
                            <input type="text" className="mail_text" placeholder={categoryName} defaultValue={categoryName} name="CategoryName" onChange={(e) => {
                                if(e.target.value == ''){ 
                                    setCategoryName(newCategoryName)
                                    setCategoryTag(newCategoryName.toUpperCase())
                                }else{ setCategoryName(e.target.value)
                                setCategoryTag(e.target.value.toUpperCase())}
                            }} />
                            <input type="text" className="mail_text" placeholder={categoryTag} defaultValue={categoryTag} name="CategoryTag" />
                            
                            <UploadImages onImageUpload={handleImageUrl} />

                            {/* <input type="text" className="mail_text" placeholder={categoryImage} defaultValue={categoryImage} name="CategoryImage" onChange={(e) => {
                                if(e.target.value == ''){ 
                                    setCategoryImage(newCategoryImage)
                                }else{ setCategoryImage(e.target.value)}
                            }} /> */}
                            
                            <textarea className="massage-bt" placeholder={categoryComment} defaultValue={categoryComment} rows="5" id="comment" name="CategoryComment" onChange={(e) => {
                                if(e.target.value == ''){ 
                                    setCategoryComment(newCategoryComment)
                                }else{ setCategoryComment(e.target.value)}
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

export default EditCategory
