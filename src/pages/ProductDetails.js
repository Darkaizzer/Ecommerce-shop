import React, { useContext } from "react";
// import useParams
import { useParams } from "react-router-dom";
// import cart context
import { CartContext } from "../contexts/CartContext";
// import producr context
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  // get product id from the url
  const { id } = useParams();
  const { addToCart } = useContext(ProductContext);
  const { products } = useContext(CartContext);
  // get the single product based on the id
  const product = products.find((item) => {
    return item.id === parseInt(id);
  });
  // if product is not found
  if (!product) {
    return (
     <section className=" h-screen flex justify-center items-center">Loading...</section>
   )
  }
  const { title, price, description, image } = product;
  return <section>
    <div className=" container mx-auto">
      <div>image</div>
    </div>
  </section>;
};

export default ProductDetails;
