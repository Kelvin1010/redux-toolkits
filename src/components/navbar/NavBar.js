import React from 'react';
import { useSelector } from 'react-redux';
import { CartIcon } from '../../icons';


function NavBar() {

    //console.log(useSelector(state => state.cart))
    const amount = useSelector(state => state.cart.amount)

    return (
        <>
            <nav>
                <div className='nav-center'>
                    <h3>Redux-toolkit</h3>
                    <div className='nav-container'>
                        
                        <CartIcon />
                        <div className='amount-container'>
                            <p className='total-amount'>
                                {amount}
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    ) 
}

export default NavBar