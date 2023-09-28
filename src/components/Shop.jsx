import React, { useState, useEffect } from "react";
import pro2 from "../assets/images/glass.png";
import pro1 from "../assets/images/ice.png";
import pro3 from "../assets/images/egg.png";
import pro4 from "../assets/images/cookies.png";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../assets/css/shop.css";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const { t } = useTranslation(["home"]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Ice Cream (Taro)",
      url: pro1,
      cart: false,
      quantity: 1,
      price: 0.7 + "$",
      sale: 0.9 + "$",
    },
    {
      id: 2,
      name: "morning glory",
      url: pro2,
      cart: false,
      quantity: 1,
      price: 0.3 + "$",
      sale: 0.5 + "$",
    },
    {
      id: 3,
      name: "Eggs",
      url: pro3,
      cart: false,
      quantity: 1,
      price: 15 + "$",
      sale: 17 + "$",
    },
    {
      id: 4,
      name: "Cookies",
      url: pro4,
      cart: false,
      quantity: 1,
      price: 0.7 + "$",
      sale: 0.9 + "$",
    },
  ]);

  const [cookies, setCookie] = useCookies(["user"]);

  function addtocart(item) {
    let cart2 = [...cart];
    cart2.push({ ...item });
    products.map((i) => {
      if (i.id == item.id) {
        i.cart = true;
      }
    });
    setCart(cart2);
  }
  function removetocart(item) {
    let cart2 = cart.filter((i) => i.id != item.id);
    products.map((i) => {
      if (i.id == item.id) {
        i.cart = false;
      }
    });
    setCart(cart2);
  }
  function increase(item) {
    let x = cart.map((i) => {
      if (item.id == i.id) {
        console.log("hola");
        i.quantity += 1;
      }
      return i;
    });
    setCart(x);
  }
  function decrease(item) {
    let x = cart.map((i) => {
      if (item.id == i.id && i.quantity > 1) {
        console.log("hola");
        i.quantity -= 1;
      }
      return i;
    });
    setCart(x);
  }
  // function total() {
  //     let x = 0
  //     cart.map((i) => {
  //         x += i.price * i.quantity

  //     })
  //     return x
  // }

  // ฟังก์ชันสำหรับบันทึกข้อมูล state cart ลงใน Firestore
  const saveCartToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, cookies.Name), {
        Cart: cart
      });
      console.log("Test ID ", docRef.id);
    } catch (e) {
      console.error("error adding document: ", e);
    }
  };

  return (
    <div className="container mt-2">
      <h3 className="mt-5 mb-4 text-center"><strong>RECOMMENDED FOR YOU</strong></h3>
      <div className="row justify-content-center">
        {products.map((item) => (
          <div className="col-3" key={item.id}>
            <div className="card">
              <img
                src={item.url}
                className="card-img-top"
                style={{ width: "100%", height: "290px" }}
              />
              <div className="card-body">
                <h5 style={{ color: "#D40303" }}><strong>Sale!</strong></h5>
                <h4 className="card-title">{item.name}</h4>
                <div className="card-prices">
                  <h5 className="card-price"><strong>{item.price}</strong></h5>
                  <h6 className="sale">
                    <span className="strike-through">{item.sale}</span>
                  </h6>
                </div>


                {item.cart === false ? (
                  <button
                    className="btn btn btn-dark mt-3 "
                    onClick={() => addtocart(item)}
                  >
                    {t("Add")}
                  </button>
                ) : (
                  <button className="btn btn btn-dark mt-3" disabled>
                    {t("Add")}
                  </button>
                )}
                {/* {
                                    item.cart == true
                                    &&
                                    <button className='btn btn-success' onClick={() => addtocart(item)}>
                                        Added
                                    </button>
                                } */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-3">
        <h3 className="mt-5 mb-4 text-center"><strong>MY CART</strong></h3>
        <table className="table text-center table-hover table-striped">
          <thead  className="table-dark">
            <tr>
              <th scope="col"><strong style={{ fontSize: "1.2rem", margin: "0 0.5rem" }}>{t("Nu")}</strong></th>
              <th scope="col"><strong style={{ fontSize: "1.2rem", margin: "0 0.5rem" }}>{t("product")}</strong></th>
              <th scope="col"><strong style={{ fontSize: "1.2rem", margin: "0 0.5rem" }}>{t("productN")}</strong></th>
              <th scope="col"><strong style={{ fontSize: "1.2rem", margin: "0 0.5rem" }}>{t("Quantity")}</strong></th>
              <th scope="col"><strong style={{ fontSize: "1.2rem", margin: "0 0.5rem" }}>{t("Remove")}</strong></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((i, index) => (
              <tr key={i.id}>
                <th scope="row" >
                  <span style={{ fontSize: "1.3rem", margin: "0 0.5rem" }}>{index + 1}</span>
                </th>
                <th scope="row">
                  <img src={i.url} style={{ width: "7rem" }} />
                </th>
                <td>
                  <span style={{ fontSize: "1.3rem", margin: "0 0.5rem" }}>
                    {i.name}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => decrease(i)}
                    className="btn btn-dark btn-sm"
                  >
                    -
                  </button>
                  <span style={{ fontSize: "1.2rem", margin: "0 0.5rem" }}>
                    {i.quantity}
                  </span>
                  <button
                    onClick={() => increase(i)}
                    className="btn btn-dark btn-sm "
                    size="sm"
                  >
                    +
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => removetocart(i)}
                    className="btn btn-danger"
                  >
                    {t("Remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        {cookies.Name &&
          <button className="btn btn-primary" onClick={saveCartToFirestore}>
            บันทึกข้อมูล
          </button>
        }
      </div>
    </div>
  );
};
export default Shop;
