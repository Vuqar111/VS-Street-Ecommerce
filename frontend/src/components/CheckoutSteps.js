import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="rowcheckout checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Daxil Ol</div>
      <div className={props.step2 ? 'active' : ''}>Çatdırılma</div>
      <div className={props.step3 ? 'active' : ''}>Sifariş</div>
      <div className={props.step4 ? 'active' : ''}>Ödəniş</div>
    </div>
  );
}
