import products from "../../services/products";
import { type Product } from "../../interfaces/products";
import { useEffect, useState } from "react";
import { Header } from "../../components";
import Swal from "sweetalert2";

export default function Home() {
  const [nItem, setNum] = useState(
    Number(JSON.parse(localStorage.getItem("n_item") ?? "[0]"))
  );

  const addProducts = (product: Product) => {
    const productsCart = JSON.parse(
      localStorage.getItem("products_cart") || "[]"
    );

    product.product_code = `${product.id}_${new Date().getTime()}`;
    productsCart.push(product);
    setNum(nItem + 1);
    localStorage.setItem("products_cart", JSON.stringify(productsCart));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Añadido correctamente!",
      showConfirmButton: false,
      background: "#242424",
      color: "#fff",
      timer: 1250,
    });
  };

  useEffect(() => {
    localStorage.setItem("n_item", JSON.stringify(nItem));
  }, [nItem]);

  return (
    <>
      <Header />
<div className="mx-auto px-4 mb-5">
  <h1 className="mt-3 text-center text-white">Lista de Cursos</h1>
  <div className="flex justify-center">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
      {products.map((product: Product) => (
        <div
          className="bg-white rounded-lg shadow-md p-4 text-center"
          key={product.product_code}
          style={{ width: "21rem" }}
        >
          <img
            className="mx-auto border border-gray-300 shadow-sm rounded-lg mt-4"
            style={{ width: "90%" }}
            src={product.image}
            alt=""
          />
          <div className="bg-white p-4">
            <h4 className="mb-2 font-bold">{product.name}</h4>
            <p className="mb-4">{product.type}</p>
            <p className="text-justify mb-4">{product.description}</p>
            <p className="mb-4">$ {product.price}</p>
            <div className="grid">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => addProducts(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    </>
  );
}
