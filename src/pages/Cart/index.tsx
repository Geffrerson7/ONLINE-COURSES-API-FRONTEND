import { useState, useEffect, useRef } from "react";
import { type Product } from "../../interfaces/products";
import { Header } from "../../components";
import Swal from "sweetalert2";
import refreshToken from "../../services/refreshToken";

export default function Cart() {
  const userData = JSON.parse(localStorage.getItem("userData") ?? "");
  const authTokens = JSON.parse(localStorage.getItem("authTokens") ?? "");
  const [accessToken, setAccessToken] = useState(authTokens.access);

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products_cart") ?? "[]")
  );

  const [nItem, setNum] = useState(
    Number(JSON.parse(localStorage.getItem("n_item") ?? "[]"))
  );

  const [total, setTotal] = useState(0);

  const dataFetchedRef = useRef(false);

  const deleteProducts = (product: Product) => {
    const newProducts = products.filter(
      (productO: Product) => productO.product_code !== product.product_code
    );
    setProducts(newProducts);
    setNum(nItem - 1);
    localStorage.removeItem("products_cart");
    localStorage.removeItem("n_item");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Eliminado!",
      showConfirmButton: false,
      background: "#242424",
      color: "#fff",
      timer: 1250,
    });
  };

  useEffect(() => {
    const sum = products.reduce(
      (acc: number, product: Product) => acc + product.price,
      0
    );
    setTotal(sum);
  }, [products]);

  useEffect(() => {
    localStorage.setItem("products_cart", JSON.stringify(products));
    localStorage.setItem("n_item", JSON.stringify(nItem));
  }, [products]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const mp = new MercadoPago(import.meta.env.VITE_PUBLIC_KEY, {
      locale: "en-US",
    });

    const bricksBuilder = mp.bricks();

    const renderCardPaymentBrick = async (bricksBuilder: any) => {
      const today = new Date().toISOString().replace("T", " ").slice(0, 19);
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      const settings = {
        initialization: {
          amount:
            products.length > 0
              ? products.reduce(
                  (acc: number, product: Product) => acc + product.price,
                  0
                )
              : 0,
          payer: {
            email: "",
          },
        },
        customization: {
          visual: {
            style: {
              theme: "dark",
            },
          },
        },
        callbacks: {
          onReady: () => {},
          onSubmit: async (cardFormData: any) => {
            const response: any = await fetch(
              "http://127.0.0.1:8000/payment/create/",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: "Bearer " + accessToken,
                },

                body: JSON.stringify(cardFormData),
              }
            ).then((response) => {
              if (response.ok) {
                Swal.fire(
                  "Created!",
                  "The payment was created successfully.",
                  "success"
                ).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("products_cart");
                    localStorage.removeItem("n_item");
                    location.reload();
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "An error occurred!",
                });
              }
            });
            console.log("response", await response.json());
          },
          onError: (error: any) => {},
        },
      };
      window.cardPaymentBrickController = await bricksBuilder.create(
        "cardPayment",
        "cardPaymentBrick_container",
        settings
      );
    };
    renderCardPaymentBrick(bricksBuilder);
  }, [nItem, total, products]);

  return (
    <>
      <Header />
      <div className="mx-auto px-16 mt-3">
        <h1 className="text-white text-center">Carrito de compras</h1>
        {products.length === 0 && (
          <div className="custom-noProduct text-white">No hay productos añadidos</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
          <div>
            <h4 className="text-white">Payment</h4>
            <hr className="text-white mt-2" />
            <div id="cardPaymentBrick_container" className="mb-5 mt-4"></div>
          </div>
          <div>
            <h4 className="text-white">Orden Summary</h4>
            <hr className="text-white mt-2" />
            {products.map((product: Product) => (
              <div
                className="bg-white rounded-lg shadow-md p-4 mb-3 mt-4"
                key={product.product_code}
              >
                <div className="grid grid-cols-12">
                  <div className="col-span-2 flex iems-center">
                    <img
                      className="rounded"
                      src={product.image}
                      width={100}
                      style={{
                        border: "1px solid #ddd",
                        boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
                      }}
                      alt=""
                    />
                  </div>
                  <div className="col-span-8">
                    <h5 className="font-bold">{product.name}</h5>
                    <p>{product.type}</p>
                  </div>
                  <div className="col-span-2 ml-12 items-center text-center justify-center">
                    <p className="font-bold">$ {product.price.toFixed(2)}</p>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      onClick={() => deleteProducts(product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-md mt-4">
              <div className="p-4">
                <div className="grid grid-cols-3">
                  {/* Fila 1 */}
                  <div className="col-span-2 mb-2">
                    <p>Productos</p>
                  </div>
                  <div className="col-span-1 text-right mb-2">
                    <p>{nItem}</p>
                  </div>
                  {/* Fila 2 */}
                  <div className="col-span-2 mb-2">
                    <p>Costo de envio</p>
                  </div>
                  <div className="col-span-1 text-right mb-2">
                    <p>0.00</p>
                  </div>
                  {/* Fila 3 */}
                  <div className="col-span-2">
                    <p>Total</p>
                  </div>
                  <div className="col-span-1 text-right">
                    <h3> $ {total.toFixed(2)} </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
