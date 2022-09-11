import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './components/cartContainer/CartContainer';
import Modal from './components/model/Modal';
import NavBar from './components/navbar/NavBar';
import { calculateTotals, getCartItems } from './store/cartSlice';

function App() {
  const {cartItems, isLoading} = useSelector((state) => state.cart);
  const {isOpen} = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  },[
    cartItems
  ])
  useEffect(() => {
    dispatch(getCartItems())
  },[])
  if(isLoading) {
    return(
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <div className="App">
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </div>
  );
}

export default App;
