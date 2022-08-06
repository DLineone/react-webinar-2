import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Layout from '../layout';
import List from "../list";

function Modal(props){
  if(!props.show){
    return null;
  }

  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <Layout head={<><h1>Корзина</h1> <button onClick={props.onModalClose}>Закрыть</button></>}>
        <List items={props.cart}
            onDeleteFromCart={props.onDeleteFromCart}
        />
        <div className={cn('summary')}>
          <div className={cn('text')}>
            <strong>Итого</strong>
          </div>
          <div className={cn('stats')}>
            <strong>{props.getCartStats().sumPrice} ₽</strong>
          </div>
        </div>
      </Layout>
    </div>
  )
}

Modal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onModalClose: propTypes.func,
  onDeleteFromCart: propTypes.func,
  getCartStats: propTypes.func
}

Modal.defaultProps = {
  cart: [],
  onModalClose: () => {},
  onDeleteFromCart: () => {},
  getCartStats: () => {}
}

export default React.memo(Modal);
  