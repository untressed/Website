import React from 'react';
import emptyCartImage from '../assets/empty-cart-illustration.webp';

const EmptyCart = () => {
    return (
        <div className="text-center py-5">
            <div className="mb-4">
                <img
                    src={emptyCartImage}
                    alt="Empty Cart"
                    className="img-fluid"
                    style={{ maxWidth: '300px' }}
                />
            </div>
            <h3 className="fw-bold mb-2">Empty Cart!</h3>
            <p className="text-secondary fs-5">
                You have no plans in Cart.<br />
                Let's get you some
            </p>
        </div>
    );
};

export default EmptyCart;
