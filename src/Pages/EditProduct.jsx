import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import UploadImages from '../Components/UploadImages';
import UploadManyImages from '../Components/UploadManyImages';

function EditProduct() {

    const location = useLocation();
    const { _id, productName, productTag, productMainImage, productImages, productPrice, productSizes, productColor, 
    productSummary, productDescription, productStock, productOffer, productDiscount, productCategory, productComment } = location.state;

    const [newProductName, setProductName] = useState(`${productName}`);
    const [newProductPrice, setProductPrice] = useState(productPrice);
    const [newProductTag, setProductTag] = useState(`${productTag}`);
    const [newProductSizes, setProductSizes] = useState(`${productSizes}`);
    const [newProductColors, setProductColors] = useState(productColor);
    const [newProductSummary, setProductSummary] = useState(`${productSummary}`);
    const [newProductDescription, setProductDescription] = useState(`${productDescription}`);
    // const [newProductMainImage, setProductMainImage] = useState(`${productMainImage}`);
    const [newProductMainImage, setProductMainImage] = useState(`${productMainImage}`);
    const [newProductImages, setProductImages] = useState(productImages);
    // const [newProductImages, setProductImages] = useState(productImages);
    const [newProductStock, setProductStock] = useState(productStock);
    const [newProductOffer, setProductOffer] = useState(productOffer);
    const [newProductDiscount, setProductDiscount] = useState(productDiscount);
    const [newProductCategory, setProductCategory] = useState(`${productCategory}`);
    const [newProductComment, setProductComment] = useState(`${productComment}`);

    const handleImageUrl = (url) => {
      if(url == ''){ 
        setProductMainImage(newProductMainImage)
        // setProductMainImage(url)
      }else{ setProductMainImage(url)}
    };

    const handleImageUrls = (urls) => {
      if(url == ''){ 
        setProductImages(newProductImages)
      }else{ setProductImages(urls);}
    };

    const [datacategories, setDataCategories] = useState([]);
    const url = `${import.meta.env.VITE_API_LINK}/categories`;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url);
            const result = await response.json();
            setDataCategories(result);
        }
        catch (error){
            console.error(error);
        }
    };

    const data = {
        productName: newProductName,
        productPrice: newProductPrice,
        productTag: newProductTag,
        productSizes: newProductSizes,
        productColors: newProductColors,
        productSummary: newProductSummary,
        productDescription: newProductDescription,
        productMainImage: newProductMainImage,
        productImages: newProductImages,
        productStock: newProductStock,
        productOffer: newProductOffer,
        productDiscount: newProductDiscount,
        productCategory: newProductCategory,
        productComment: newProductComment
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(`http://localhost:3000/products/put/${_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            throw new Error('Error al enviar la solicitud PUT');
          }
      
          const responseData = await response.json();
          console.log('Producto actualizado:', responseData);
          console.log(data)
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <h1 className="contact_taital">Editar Producto</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="contact_section_2">
          <div className="row">
            <div className="col-md-12">
              <div className="mail_section_1">
                <input type="text" className="mail_text" placeholder={productName} defaultValue={productName} name="ProductName" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductName(newProductName);
                    setProductTag(newProductName.toUpperCase());
                  } else {
                    setProductName(e.target.value);
                    setProductTag(e.target.value.toUpperCase());
                  }
                }} />
                <input type="text" className="mail_text" placeholder={productTag} defaultValue={productTag} name="ProductTag" readOnly />
                <input type="number" className="mail_text" placeholder={productPrice} defaultValue={productPrice} name="ProductPrice" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductPrice(newProductPrice);
                  } else {
                    setProductPrice(parseFloat(e.target.value));
                  }
                }} />
                <input type="text" className="mail_text" placeholder={productSizes} defaultValue={productSizes} name="ProductSizes" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductSizes(newProductSizes);
                  } else {
                    setProductSizes(e.target.value.split(','));
                  }
                }} />
                <input type="text" className="mail_text" placeholder={productColor} defaultValue={productColor} name="ProductColors" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductColors(newProductColors);
                  } else {
                    setProductColors(e.target.value.split(','));
                  }
                }} />
                <input type="text" className="mail_text" placeholder={productSummary} defaultValue={productSummary} name="ProductSummary" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductSummary(newProductSummary);
                  } else {
                    setProductSummary(e.target.value);
                  }
                }} />

                <UploadImages onImageUpload={handleImageUrl} />   
                {/* <input type="text" className="mail_text" placeholder={productMainImage} defaultValue={productMainImage} name="ProductMainImage" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductMainImage(newProductImages);
                  } else {
                    setProductMainImage(e.target.value);
                  }
                }} /> */}

                <UploadManyImages onImagesUpload={handleImageUrls}/>
                {/* <input type="text" className="mail_text" placeholder={productImages} defaultValue={productImages} name="ProductImages" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductImages(newProductImages);
                  } else {
                    setProductImages(e.target.value.split(','));
                  }
                }} /> */}
                <input type="text" className="mail_text" placeholder={productDescription} defaultValue={productDescription} name="ProductDescription" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductDescription(newProductDescription);
                  } else {
                    setProductDescription(e.target.value);
                  }
                }} />
                <input type="number" className="mail_text" placeholder={productStock} defaultValue={productStock} name="ProductStock" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductStock(newProductStock);
                  } else {
                    setProductStock(parseFloat(e.target.value));
                  }
                }} />

                <h3 className="question_text">¿Producto en oferta?</h3>
                <div className="form-check form-check-inline ms-3">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={true} onChange={(e) => setProductOffer(e.target.value === 'true')} />
                  <label className="form-check-label" htmlFor="inlineRadio1">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={false} onChange={(e) => setProductOffer(e.target.value === 'false')} />
                  <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                </div>
                <input type="number" className="mail_text" placeholder={productDiscount} defaultValue={productDiscount} name="ProductDiscount" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductDiscount(newProductDiscount);
                  } else {
                    setProductDiscount(parseFloat(e.target.value));
                  }
                }} />
                <select className="form-select form-select-lg mail_text" aria-label="Large select example" onChange={(e) => setProductCategory(e.target.value)}>
                  <option value="none" readOnly>Categoria</option>
                  {datacategories.map((e) => (
                    <option value={e._id} key={e._id}>{e.categoryName}</option>
                  ))}
                </select>
                <textarea className="massage-bt" placeholder={productComment} defaultValue={productComment} rows="5" id="comment" name="ProductComment" onChange={(e) => {
                  if (e.target.value === '') {
                    setProductComment(newProductComment);
                  } else {
                    setProductComment(e.target.value);
                  }
                }} ></textarea>
                <div className="botones d-flex">
                  <div className="send_bt more me-3"><a href="/products">Ver productos</a></div>
                  <div className="send_bt ms-3"><a href="#" onClick={handleSubmit}>Guardar</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
