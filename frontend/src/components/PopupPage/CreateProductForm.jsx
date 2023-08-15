import React, { useState } from "react";
import "./ModelPopup.css";
import { useFormik } from "formik";
import { axiosPost } from "../../axiosServices";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from 'react-toastify';



const CreateProductForm = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 

  
  const createProduct = async (values) => {
    setLoading(true);
    try {
      const res = await axiosPost(`/product`, values);
      setLoading(false);
      setShowModal(false);
      console.log(res);
      toast.success("Product added successfully!"); // Show success message
  } catch (err) {
      console.log(err);

      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(`Failed to add product: ${err.response.data.message}`);
      } else if (
          err.response &&
          err.response.data &&
          err.response.data.code === 11000
      ) {
        setErrorMessage("Failed to add product: Another code must be chosen because this code already exists.");
      } else {
        setErrorMessage("Failed to add product.");
      }
  }
  };
  

  const formik = useFormik({
    initialValues: {
      name: "",
      code: 0,
      description: "",
      type: "",
      image: ''
    },
    onSubmit: (values) => {
      createProduct(values);
    },
  });

  const handleExit = () => {
    setShowModal(false);
  };
  
  
  return (
    <div className="modalContainer">
    <form action="" onSubmit={formik.handleSubmit}>
    <div className="modalBox">
    <div className="modalHeader">
    <h2>New Product Details</h2>
    <button className="exit-btn" onClick={handleExit}>
    <AiOutlineCloseCircle />
    </button>
    </div>
    <div className="modalInner">
    <div className="input-container">
              <div className="input-box">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={50}
                  onChange={formik.handleChange}
                  values={formik.values.name}
                />
              </div>
              <div className="input-box">
              <label htmlFor="">Code</label>
              <input
                type="number"
                name="code"
                required
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              {errorMessage && <div className="alert-error">{errorMessage}</div>}
            </div>
            </div>
            <div className="input-box">
            <label htmlFor="">Description</label>
            <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            values={formik.values.description}
            />
            </div>
            
            <div className="input-box">
            <label htmlFor="">image</label>
            <input type="text" name="image"
              required
              onChange={formik.handleChange}
              values={formik.values.image}
            />
            </div>
            <div className="input-container">
            <div className="input-box">
            <label htmlFor="">Type</label>
            <select
            name="type"
            required
            onChange={formik.handleChange}
            values={formik.values.type}>
            <option value=""></option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Field Crop">Field Crop</option>
            </select>
            </div>
            </div>
            
            <div className="modalFooter">
              <button className="add-btn" type="submit">
                {loading ? "Saving..." : "Save Details"}
              </button>
            </div>
          </div>
          </div>
          </form>
          </div>
          );
        };

export default CreateProductForm;
