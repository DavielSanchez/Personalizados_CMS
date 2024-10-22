import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function ShowProducts() {

    const [categories, setCategories] = useState([])
    const url = 'http://localhost:3000/Products'

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            setCategories(result)
        }
        catch (error){
            console.error(error)
        }
    }

  return (
    <>
    <div className="container-fluid pt-5">
    <div className="row px-xl-5 pb-3">
        {
            categories.map((P) => (
                <div className="col-lg-3 col-md-6 pb-1" key={P._id}>
                    <div className="cat-item d-flex flex-column border mb-4" style={{padding: '30px'}}>
                        <p className="text-right">{/* 15 Productos */}</p>
                        <Link to={{pathname: `/product/edit/${P.productTag}`}} className="cat-img position-relative overflow-hidden mb-3"
                            state={{ _id : P._id, productName : P.productName, productTag : P.productTag, productMainImage : P.productMainImage, productImages : P.productImages, 
                            productPrice : P.productPrice, productSizes : P.productSizes, productColor : P.productColors, productSummary : P.productSummary, 
                            productDescription : P.productDescription, productStock : P.productStock, productOffer : P.productOffer, 
                            productDiscount : P.productDiscount, productCategory : P.productCategory }} >
                            <img className="img-fluid" src={P.productMainImage} alt=""/>
                        </Link>
                        <h5 className="font-weight-semi-bold m-0">{P.productName}</h5>
                    </div>
                </div>
            ))
        }
    </div>
</div>
    <div className="container-new">
    <div className="send_bt"><a href="/newproduct">Nuevo Producto</a></div>
    </div>

    </>
  )
}

export default ShowProducts