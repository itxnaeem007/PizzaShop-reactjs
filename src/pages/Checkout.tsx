import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import getCartFromLS from 'utils/getCartFromLS';
import { CheckoutInfo, Loader } from 'components';
import { removeAllItemsFromCart } from '../redux/cart/slice';

type InputValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  time: string;
};

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValues, setInputValues] = React.useState<InputValues>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    time: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const submitOrder = () => {
    const order = {
      ...inputValues,
      orderTimeSent: new Date().toLocaleString(),
      order: getCartFromLS(),
    };

    localStorage.setItem('order', JSON.stringify(order));
    setIsLoading(true);
  };

  // We set loading when we submit order, then redirect to home page
  if (isLoading) {
    setTimeout(() => {
      dispatch(removeAllItemsFromCart());

      window.location.replace('/');

      setIsLoading(false);
    }, 1000);

    return <Loader />;
  }

  return (
    <div className="container container--cart">
      <div className="cart__top">
        <h2 className="checkout__title">
          <svg
            enableBackground="new 0 0 48 48"
            height="30px"
            version="1.1"
            viewBox="0 0 48 48"
            width="30px"
            xmlSpace="preserve"
            className="pay-icon"
          >
            <path
              clipRule="evenodd"
              d="M47,40L47,40c0,2.762-2.238,5-5,5l0,0H6l0,0c-2.762,0-5-2.238-5-5V11  c0-2.209,1.791-4,4-4l0,0h20.171l8.099-2.934c0.513-0.187,1.081,0.078,1.268,0.589L35.391,7H39c2.209,0,4,1.791,4,4v2l0,0  c2.209,0,4,1.791,4,4V40z M5,9L5,9c-1.104,0-2,0.896-2,2s0.896,2,2,2h3.445l0,0h0.189c0.013-0.005,0.021-0.016,0.034-0.021L19.65,9  H5z M34.078,9.181l-1.062-2.924l-0.001,0v0L30.964,7h0.003l-5.514,2h-0.01l-11.039,4h21.062L34.078,9.181z M41,11  c0-1.104-0.896-2-2-2h-2.883l1.454,4H41l0,0V11z M43,15H5l0,0c-0.732,0-1.41-0.211-2-0.555V40c0,1.657,1.344,3,3,3h36  c1.657,0,3-1.343,3-3v-7h-4c-2.209,0-4-1.791-4-4s1.791-4,4-4h4v-8C45,15.896,44.104,15,43,15z M45,31v-4h-4c-1.104,0-2,0.896-2,2  s0.896,2,2,2H45z M41,28h2v2h-2V28z"
              fillRule="evenodd"
            />
          </svg>
          Checkout
        </h2>
      </div>

      <div className="checkout">
        <div className="checkout__item">
          <label htmlFor="firstName">
            ???????? ??????
            <input
              className="checkout__item-input"
              id="firstName"
              type="text"
              name="firstName"
              placeholder="???????? ??????"
              value={inputValues.firstName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="lastName">
            ???????? ??????????????
            <input
              className="checkout__item-input"
              id="lastName"
              type="text"
              name="lastName"
              placeholder="???????? ??????????????"
              value={inputValues.lastName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="phone">
            ?????????? ????????????????
            <input
              className="checkout__item-input"
              id="phone"
              type="tel"
              name="phone"
              placeholder="+7 (...) .."
              value={inputValues.phone}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="email">
            ??????????
            <input
              className="checkout__item-input"
              id="email"
              type="email"
              name="email"
              placeholder="..@mail.ru | ..@gmail.com"
              value={inputValues.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="address">
            ????????????
            <input
              className="checkout__item-input"
              id="address"
              type="text"
              name="address"
              placeholder="??????????, ??????????, ??????, ??????????????, ????????????????.."
              value={inputValues.address}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="time">
            ???????????????? ?????????? ????????????????
            <input
              className="checkout__item-input"
              id="time"
              name="time"
              type="datetime-local"
              value={inputValues.time}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      <CheckoutInfo />

      <BottomButtons submitOrder={submitOrder} />
    </div>
  );
};

const BottomButtons: React.FC<{ submitOrder: () => void }> = ({
  submitOrder,
}) => {
  return (
    <div className="cart__bottom-buttons">
      <Link
        to="/cart"
        className="button button--outline button--add go-back-btn"
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>?????????????????? ??????????</span>
      </Link>
      <Link to="/checkout">
        <div role="none" onClick={submitOrder} className="button pay-btn">
          <span>?????????????????? ??????????</span>
        </div>
      </Link>
    </div>
  );
};

export default Checkout;
