import React, { useState } from 'react'
import { useFormik } from 'formik'
import "./ModelPopup.css";
import { axiosPut } from "../../axiosServices";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';



const EditDetailsProduct = ({ productById, setEditModal }) => {
    const { name, code, description, type, marketingDate,image } = productById;
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null); 

    const formik = useFormik({
      initialValues: {
        name,
        code,
        description,
        type,
        marketingDate,
        image,
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        handleEdit(values);
      },
    });

    const handleEdit = async (values) => {
      setLoading(true);
      try {
          const res = await axiosPut(`/product/${productById._id}`, values);
          setLoading(false);
          setEditModal(false);
          console.log(res);
          toast.success("Product updated successfully!");
      } catch (err) {
          console.log(err);
  
          if (err.response && err.response.data && err.response.data.message) {
            setErrorMessage(`Failed to update product: ${err.response.data.message}`);
          } else if (
              err.response &&
              err.response.data &&
              err.response.data.code === 11000
          ) {
            setErrorMessage("Failed to update product: Another code must be chosen because this code already exists.");
          } else {
            setErrorMessage("Failed to update product.");
          }
      }
  };
  

    const handleExit = () => {
      setEditModal(false);
    };

    return (
        <div className="modalContainer">
        <form action="" onSubmit={formik.handleSubmit}>
        <div className="modalBox">
        <div className="modalHeader">
        <h2>Update Product Details</h2> 
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
                    defaultValue={name}
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
                  defaultValue={code}
                  onChange={formik.handleChange}
                  values={formik.values.code}
                />
                {errorMessage && <div className="alert-error">{errorMessage}</div>}
              </div>      
                </div>
                <div className="input-box">
                <label htmlFor="">Description</label>
                <textarea
                id="description"
                name="description"
                defaultValue={description}
                onChange={formik.handleChange}
                values={formik.values.description}
                />
                </div>
                <div className="input-box">
                <label htmlFor="">Image</label>
                <input type="text" name="image"
                    required
                    defaultValue={image}
                    onChange={formik.handleChange}
                    values={formik.values.image}
                />
            </div>
                
                <div className="input-container">
                <div className="input-box">
                <label htmlFor="">Type</label>
                <select name="type"
                required
                defaultValue={type}
                onChange={formik.handleChange}
                  values={formik.values.type}>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Field Crop">Field Crop</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button className="add-btn" type="submit">
                {loading ? "Editing" : "Edit and Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
}

export default EditDetailsProduct;