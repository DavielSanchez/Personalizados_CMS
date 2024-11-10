import { useState, useEffect } from 'react';
import '../../public/Styles/App.css'
import UploadImages from './UploadImages';
import UploadManyImages from './UploadManyImages';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

function AddProduct() {

    const MySwal = withReactContent(Swal)

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productTag, setProductTag] = useState('');
    const [productColors, setProductColors] = useState([]);  // Array para colores
    const [ProductSizes, setProductSizes] = useState([]);
    const [productSummary, setProductSummary] = useState('');
    const [productDescription, setProductDescription] = useState('');
    // const [productMainImage, setproductMainImage] = useState();
    const [productMainImage, setproductMainImage] = useState();
    const [productImages, setProductImages] = useState([]);
    // const [productImages, setProductImages] = useState([]);  // Array para imágenes
    const [productStock, setProductStock] = useState(0);  // Inicia con valor 0
    const [productOffer, setProductOffer] = useState(false);  // Booleano con valor por defecto false
    const [productDiscount, setProductDiscount] = useState(0);  // Descuento con valor por defecto 0
    const [productCategory, setProductCategory] = useState('');  // ID de la categoría (puedes cambiar a null si lo prefieres)

    // const [imageUrl, setImageUrl] = useState(null);
    
    const handleImageUrl = (url) => {
        setproductMainImage(url);
      };

      const handleImageUrls = (urls) => {
        setProductImages(urls);
      };
    
    // const [categories, setCategories] = useState([]);
    const [datacategories, setDataCategories] = useState([])
    const url = `${import.meta.env.VITE_API_LINK}/categories`

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            setDataCategories(result)
        }
        catch (error){
            console.error(error)
        }
    }

    const data = {
        productName : productName,
        productPrice : productPrice,
        productTag : productTag,
        productColors : productColors,
        ProductSizes : ProductSizes,
        productSummary : productSummary,
        productDescription : productDescription,
        productMainImage : productMainImage,
        productImages : productImages,
        productStock : productStock,
        productOffer : productOffer,
        productDiscount : productDiscount,
        productCategory : productCategory,
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir recarga de página

        MySwal.fire({
            title: "El Producto fue guardado satisfactoriamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/products");
            }
          });

        // Crear el objeto con los datos a enviar
        console.log(data)
    
        // Hacer la solicitud POST al servidor
        try {
          const response = await fetch(`${import.meta.env.VITE_API_LINK}/products/add`, {
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
                    <h1 className="contact_taital">Nuevo Producto</h1>
                </div>
            </div>
        </div>
    <div className="container-fluid">
            <div className="contact_section_2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mail_section_1">
                            <input type="text" className="mail_text" placeholder="Nombre del producto" name="ProductName" onChange={(e) => {
                                setProductName(e.target.value)
                                setProductTag(e.target.value.toUpperCase())
                            }}/>
                            <input type="text" className="mail_text" placeholder={productTag} name="ProductTag" readOnly/>
                            <input type="Number" className="mail_text" placeholder="Precio del Producto" name="ProductPrice" onChange={(e) => {
                                setProductPrice(parseFloat(e.target.value))
                            }} />
                            <input type="text" className="mail_text" placeholder="Sizes disponibles del producto" name="ProductSizes" onChange={(e) => {
                                setProductSizes(e.target.value.split(','));
                            }} />
                            <input type="text" className="mail_text" placeholder="Colores del producto" name="ProductColors" onChange={(e) => {
                                setProductColors(e.target.value.split(','));
                            }} />
                            <input type="text" className="mail_text" placeholder="Resumen del producto" name="ProductSummary" onChange={(e) => {
                                setProductSummary(e.target.value)
                            }} />
                            <UploadImages onImageUpload={handleImageUrl} />

                            {/* <input type="text" className="mail_text" placeholder="Imagen principal del producto" name="productMainImage" onChange={(e) => {
                                setproductMainImage(e.target.value);
                            }} /> */}

                            <UploadManyImages onImagesUpload={handleImageUrls} />                            
                            {/* <input type="text" className="mail_text" placeholder="Imagen del producto" name="productImages" onChange={(e) => {
                                setProductImages(e.target.value.split(','));
                            }} /> */}
                            <input type="text" className="mail_text" placeholder="Descripcion detallada del producto" name="ProductDescription" onChange={(e) => {
                                setProductDescription(e.target.value)
                            }} />
                            <input type="number" className="mail_text" placeholder="Stock inicial del producto" name="ProductStock" onChange={(e) => {
                                setProductStock(parseFloat(e.target.value))
                            }} />
                            <h3 className="question_text">Producto en oferta?</h3>

                            <div className="form-check form-check-inline ms-3">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={true} onChange={(e) => {
                                setProductOffer(e.target.value === 'true');
                            }} />
                                <label className="form-check-label" htmlFor="inlineRadio1">Si</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={false} onChange={(e) => {
                                setProductOffer(e.target.value === 'false');
                            }} />
                                <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                            </div>
                            <input type="number" className="mail_text" placeholder="Descuento" name="ProductDiscount" onChange={(e) => {
                                setProductDiscount(parseFloat(e.target.value))
                            }} />
                            <select className="form-select form-select-lg mail_text" aria-label="Large select example" onChange={(e) => setProductCategory(e.target.value)}>
                                <option value="none" readOnly>Categoria</option>
                                {datacategories.map((e) => (
                                    <option value={e._id} key={e._id}>{e.categoryName}</option>
                                ))}
                            </select>
                            <textarea className="massage-bt" placeholder="Comentario" rows="5" id="comment" name="ProductComment"></textarea>
                            <div className="botones d-flex">
                            <div className="send_bt more me-3"><a href="#">Ver productos</a></div>
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

export default AddProduct