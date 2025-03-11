import React, { useRef, useEffect } from "react";

interface CartoonProps {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const CartoonItem: React.FC<CartoonProps> = ({ name, image, species, status }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      console.log("Div Element Loaded:", divRef.current);
      divRef.current.style.border = "2px solid blue";
    }
  }, []);

  return (
    <div className="cartoon-item" ref={divRef}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p><strong>Species:</strong> {species}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};

export default CartoonItem;
