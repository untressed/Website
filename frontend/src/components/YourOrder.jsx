import React from 'react';
import '../App.css';
import CartItem from './CartItem';

const YourOrder = ({
    items,
    handleIncrement,
    handleDecrement,
    handleRemove,
    subtotal,
    taxes,
    total,
    onCheckout
}) => {
    return (
        <>
            {/* List of Cart Items */}
            {items.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemove={handleRemove}
                />
            ))}

            {/* Order Summary */}
            <div className="row mt-5">
                <div className="col-12">
                    <h4 className="mb-4">Order Summary</h4>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fs-5">Subtotal</span>
                        <span className="fs-5 fw-bold">${subtotal}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="fs-5">Taxes</span>
                        <span className="fs-5 fw-bold">${taxes}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
                        <span className="fs-5">Discount/Offers</span>
                        <div className="flex-grow-1 text-end">
                            <input
                                type="text"
                                placeholder="Enter Your Promo Code"
                                className="promo-input"
                            />
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <span className="h4 fw-bold">Total</span>
                        <span className="h4 fw-bold">${total}</span>
                    </div>

                    <div className="text-end mb-5">
                        <button
                            className="checkout-btn"
                            onClick={onCheckout}
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YourOrder;
