import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { axiosDelete } from "../../../axiosServices";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup"; 
import { toast } from 'react-toastify';


const Card = ({ productData, handleEdit, handleReRender}) => {
  const { name, code, description,image } = productData
  const [dropDown, setDropdown] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDelete = async (id) => {
    try {
      const res = await axiosDelete(`/product/${id}`);
      console.log(res);
      handleReRender();
      setShowDeletePopup(false);
      toast.success("Product deleted successfully!"); 
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product."); 
    }
  };

  const addEllipsisAfterWords = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(" ") + " ...";
    }
    return text;
  };
  
  return (
    <div className="card-component">
    <div className="card-inner">
    <div className="dropdownContainer">
          <BsThreeDotsVertical size={20} onClick={() => setDropdown(!dropDown)} />
          {
            dropDown && <ul className="dropdown"
            onMouseLeave={() => setDropdown(false)}
            >
            <li onClick={()=>handleEdit(productData._id)}>Edit</li>
            <li onClick={()=>setShowDeletePopup(productData._id)}>Delete</li>
            </ul>
          }
          </div>
          <div className="profileImage">
          <img
          src={image}
          alt={name}
          />
          </div>
        <div className="product-detail">
        <h3>{name}</h3>
        <p>{code}</p>
        </div>
        </div>
        <div className="job-role">
        <p>{addEllipsisAfterWords(description, 3)}</p>
      </div>

          {showDeletePopup && (
            <DeleteConfirmationPopup
              onCancel={() => setShowDeletePopup(false)}
              onConfirm={() => {
                setShowDeletePopup(false);
                handleDelete(productData._id);
              }}
              />
              )}
              </div>
    );
  };

  export default Card;
