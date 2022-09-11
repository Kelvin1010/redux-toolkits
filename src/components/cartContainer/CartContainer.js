import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../store/cartSlice';
import { openModal } from '../../store/closeModal';
import CartItem from '../cartItem/CartItem'

function CartContainer() {

    const { cartItems, total, amount }  = useSelector(
        (state) => state.cart
    )

    const dispatch = useDispatch();

    if( amount < 1) {
        return (
            <section className='cart'>
                <header>
                    <h2>Your Bag</h2>
                    <h4 className='empty-cart'>Your cart is empty</h4>
                </header>
            </section>
        )
    }

    return (
        <section className='cart'>
            <header>
                <h2>Your Bag</h2>
            </header>
            <div>
                {cartItems.map((item) => (
                    <CartItem key={item.id} {...item}/>
                ))}
            </div>
            <footer>
                <hr/>
                <div className='cart-total'>
                    <h4>
                        total <span>${Number.parseFloat(total).toFixed(2)}</span>
                    </h4>
                </div>
                <button className='btn clear-btn' 
                    onClick={() => {
                        dispatch(openModal())
                    }}
                >
                    Clear Cart
                </button>
            </footer>
        </section>
    )
}

export default CartContainer