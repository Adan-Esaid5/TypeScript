
import React from "react";

interface CartoonProps {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const CartoonItem: React.FC<CartoonProps> = ({ name, image, species, status }) => {
  return (
    <div className="cartoon-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p><strong>Species:</strong> {species}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};

export default CartoonItem;
