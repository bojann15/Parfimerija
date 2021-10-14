import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalContext } from '../../context/globalState';
import API from '../../api';
import ProductItem from '../../utilis/productItem/ProductItem';

const DetailProduct = () => {
    const { id } = useParams();
    const { products, addCart } = useContext(GlobalContext);
    const [detailProduct, setDetailProduct] = useState([]);



    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await API.get(`/products/${id}`);

                setDetailProduct(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData();

    }, [id])


    return (
        <>
            <div className="detail">
                <img src={detailProduct.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>

                    <span>€{detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>Buy Now</Link>
                </div>
            </div>
            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null;
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct;
