import React, { useEffect, useState } from "react";
import "./MainSection.css";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Card from "./Card/Card";
import ModelPopup from "../PopupPage/CreateProductForm";
import { axiosGet } from "../../axiosServices";
import EditDetailsModal from "../PopupPage/EditDetailsProduct";

const MainSection = ({ setProductId }) => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productById, setProductById] = useState([]);
  const [reRender, setReRender] = useState(false);


  const getAllProduct = async () => {
    try {
      const res = await axiosGet("/product");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getProductById = async (id) => {
    try {
      const res = await axiosGet(`/product/${id}`);
      setProductById(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = async (e) => {
    const searchValue = e.target.value.trim(); // Trim leading and trailing spaces

    if (searchValue) {
        try {
            const res = await axiosGet(`/searchproduct/${encodeURIComponent(searchValue)}`);
            setProducts(res.data);
        } catch (err) {
            console.log(err.message);
        }
    } else {
        getAllProduct(); // Reset to all products if the search value is empty
    }

    if (searchValue && products.length === 0) {
        setProducts([
            { _id: "no-matching-item", name: "No matching items found" },
        ]);
    }
};
  

const handleEdit = async (id) => {
  try {
    const res = await axiosGet(`/product/${id}`);
    setProductById(res.data);
    setEditModal(true);
  } catch (err) {
    console.log(err);
  }
};

  const handleReRender = () => {
    setReRender(true);
  };

  const handleExit = () => {
    const shouldExit = window.confirm(
      "Are you sure you want to exit the interface?"
    );
    if (shouldExit) {
      window.location.href = "https://github.com/BenEliyahu";
    }
  };

  useEffect(() => {
    getAllProduct();
  }, [showModal, editModal, reRender]);



  return (
    <>
      {showModal && <ModelPopup setShowModal={setShowModal} />}
      {editModal && (
        <EditDetailsModal
          setEditModal={setEditModal}
          productById={productById}
        />
      )}
      <main className="mainContainer">
        <div className="mainWrapper">
          <h1>
            Products <span className="product-count">{products.length}</span>
          </h1>
          <div className="productHeader">
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search by name"
                onChange={handleSearch}
              />
              <BiSearch size={20} />
            </div>
            <button className="add-btn" onClick={() => setShowModal(true)}>
              <IoMdAdd size="20" color="#fffff" />
              Add Product
            </button>
            <button className="exit-o" onClick={handleExit}>
              Exit{" "}
            </button>
          </div>
          <div className="products">
          {products.map((product) => (
            <div key={product._id} onClick={() => setProductId(product._id)}>
              {product._id === "no-matching-item" ? (
                <div className="no-matching-message">{product.name}</div>
              ) : (
                <Card
                  productData={product}
                  handleEdit={() => handleEdit(product._id)} 
                  handleReRender={handleReRender}
                />
              )}
            </div>
          ))}
          
        </div>
        
        </div>
      </main>
      )
    </>
  );
};

export default MainSection;
