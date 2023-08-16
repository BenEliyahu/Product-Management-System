import React, { useEffect, useState } from 'react';
import './LeftNav.css';
import { axiosGet } from '../../axiosServices';

const LeftNav = ({ productId }) => {
  const [productById, setProductById] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getProductById = async () => {
    try {
      const res = await axiosGet(`/product/${productId}`);
      setProductById(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getProductById();
  }, [productId]);

  return (
    <nav className='leftNav'>
      <div className="productDetail">
        <h2>Full Details</h2>
        <img src={productById.image}/>
        <h1>{productById.name}</h1>
        <p><h4>Code:</h4>{productById.code}</p>
        <p><h4>Description:</h4> {productById.description}</p>
        <p><h4>Type:</h4>{productById.type}</p>
        <p className='date'>Marketing Date: {formatDate(productById.marketingDate)}</p>
      </div>
    </nav>
  );
};

export default LeftNav;
