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
        <h2>Full Detail</h2>
        <img src={productById.image}/>
        <h1>{productById.name}</h1>
        <p>Code: {productById.code}</p>
        <p>Description: {productById.description}</p>
        <p>Type: {productById.type}</p>
        <p className='date'>Marketing Date: {formatDate(productById.marketingDate)}</p>
      </div>
    </nav>
  );
};

export default LeftNav;
