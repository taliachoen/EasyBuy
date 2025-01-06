import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StoreCard from "../../component/Store/StoreCard";
import { FaArrowLeft } from "react-icons/fa";

const url = "https://dummyjson.com/products/";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  async function getProduct() {
    try {
      const { data } = await axios.get(`${url}${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="h-[80%] relative">
        <div id="backButton" onClick={() => navigate("/store")} className="left-10 top-10 absolute">
        <FaArrowLeft size={30} color="white"/>
        </div>
      <div className="flex justify-center items-center h-full">
        <StoreCard {...product} />
      </div>
    </div>
  );
}
