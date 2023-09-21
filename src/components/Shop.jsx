import React, { useState, useEffect, } from "react";
import pro2 from "../assets/images/product-2.png"
import pro1 from "../assets/images/product-1.png"
import pro3 from "../assets/images/product-3.png"
import { useTranslation } from 'react-i18next';

const Shop = () => {
    const [cart, setCart] = useState([])
    const { t } = useTranslation(['home']);
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Product 1",
            url: pro1,
            cart: false,
            quantity: 1,
        },
        {
            id: 2,
            name: "Product 2",
            url: pro2,
            cart: false,
            quantity: 1,
        },
        {
            id: 3,
            name: "Product 3",
            url: pro3,
            cart: false,
            quantity: 1,
        }
    ])
    function addtocart(item) {
        let cart2 = [...cart]
        cart2.push({ ...item })
        products.map((i) => {
            if (i.id == item.id) {
                i.cart = true
            }
        })
        setCart(cart2)

    }
    function removetocart(item) {
        let cart2 = cart.filter((i) => i.id != item.id)
        products.map((i) => {
            if (i.id == item.id) {
                i.cart = false
            }
        })
        setCart(cart2)

    }
    function increase(item) {
        let x = cart.map((i) => {

            if (item.id == i.id) {
                console.log('hola')
                i.quantity += 1
            }
            return i
        })
        setCart(x)

    }
    function decrease(item) {
        let x = cart.map((i) => {

            if (item.id == i.id && i.quantity > 1) {
                console.log('hola')
                i.quantity -= 1
            }
            return i
        })
        setCart(x)
    }
    // function total() {
    //     let x = 0
    //     cart.map((i) => {
    //         x += i.price * i.quantity

    //     })
    //     return x
    // }
    return (
        <div className='container mt-2'>
            <div className='row justify-content-center'>
                {products.map((item) => (
                    <div className='col-3' key={item.id}>
                        <div className="card"  >
                            <img src={item.url} className="card-img-top" style={{ width: '100%', height: '290px' }} />
                            <div className="card-body">
                                <h6 className="card-title">
                                    {item.name}
                                </h6>
                                {
                                    item.cart === false ? (
                                        <button className='btn btn-primary' onClick={() => addtocart(item)}>
                                            {t("Add")}
                                        </button>
                                    ) : (
                                        <button className='btn btn-primary' disabled>
                                            {t("Add")}
                                        </button>
                                    )
                                }
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

            <div className='row mt-3'>
                <table className="table  text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t("product")}</th>
                            <th scope="col">{t("productN")}</th>
                            <th scope="col">{t("Quantity")}</th>
                            <th scope="col">{t("Remove")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((i, index) => (

                                < tr key={i.id}>
                                    <th scope="row">{index + 1}</th>
                                    <th scope="row">
                                        <img src={i.url} style={{ width: '4rem' }} />
                                    </th>
                                    <td>{i.name}</td>
                                    <td>
                                        <button
                                            onClick={() => decrease(i)}
                                            className="btn btn-primary btn-sm"
                                            
                                        >
                                            -
                                        </button>
                                        <span style={{ fontSize: '1rem', margin: '0 0.5rem' }}>{i.quantity}</span>
                                        <button
                                            onClick={() => increase(i)}

                                            className="btn btn-primary btn-sm "
                                            size="sm"
                                        >
                                            +
                                        </button>
                                    </td>

                                    <td>
                                        <button onClick={() => removetocart(i)} className="btn btn-danger">
                                        {t("Remove")}
                                        </button>
                                    </td >
                                </tr >
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}
export default Shop;