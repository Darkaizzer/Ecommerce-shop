import React, { createContext, useState, useEffect } from "react";

//creatr context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  //cart state
  const [cart, setCart] = useState([]);

// item amount state 
  const [itemAmount, setItemAmount] = useState(0)
  //total price state общая цена
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount
    }, 0);
    setTotal(total)
  })
  
  // update  item amout 
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem)  => {
        return accumulator + currentItem.amount
      }, 0);
      setItemAmount(amount)
    }
  }, [cart]);

  //add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };
  // очищение карточек

  const clearCart = () => {
    setCart([]);
  };

  //плюс добовление товара
  const increaseAmout = (id) => {
    const item = cart.find((item) => item.id === id);
    addToCart(item, id);
  };

  // минус отнимание товара
  const decreaseAmout = (id) => {
    const cartItem = cart.find((item) =>  {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } 
      if (cartItem.amount < 2) {
        removeFromCart(id)
      }
    
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmout,
        decreaseAmout,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
