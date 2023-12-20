import React, { useState } from 'react';
import './Checkout.css';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../utils/helper';
import { card } from '../../utils/images';
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clearCart } from '../../Stores/Cartslice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  const dispatch = useDispatch();
  const handleSubmittt = (event) =>{
    dispatch(clearCart())
    backk();
  }
  
  let Nav = useNavigate();
  const backk = () => {
    toast.success('Your order has been placed')
    Nav('/')   
}

  //const cartValue = 100; // Simulated cart value
  const { itemsCount, totalAmount} = useSelector((state) => state.cart);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to process the payment based on the selected payment method
    if (paymentMethod === 'creditCard') {
      // Handle credit card payment
    } else if (paymentMethod === 'paypal') {
      // Handle PayPal payment
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className='cart-cfoot-r flex flex-column justify-end'>
              <div className='total-txt flex align-center justify-end'>
                <div className='font-manrope fw-5'>Total ({itemsCount}) items: </div>
                <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalAmount)}</span>
              </div>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          <h1>Payment Method:</h1>
          <div>
            <div className="paypal-logo"><input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={handlePaymentChange}
            /><i>Credit Card</i>
      <img src={card} alt = "visa" />
        </div>
          </div>
          <div>
          <div class="paypal-logo"><input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentChange}
            /><i>Paypal</i>
        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal Logo"/>
    </div>
          </div>
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
        </label>
        {paymentMethod === 'creditCard' && (
          <>
            <label>
              Card Number:
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
            </label>
            <label>
              Expiration Date:
              <input type="text" name="expDate" value={formData.expDate} onChange={handleChange} />
            </label>
            <label>
              CVV:
              <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} />
            </label>
          </>
        )}
        <button type="submit" className="checkout-button"onClick={handleSubmittt}>Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
