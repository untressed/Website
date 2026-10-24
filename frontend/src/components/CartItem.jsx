import React from 'react';
import '../App.css';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
    return (
        <div className="card cart-card mb-4 p-4">
            <div className="row align-items-center">
                <div className="col-lg-8">
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-secondary mb-3">
                        {item.description}
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                        {item.tags && item.tags.map((tag, index) => (
                            <span key={index} className="cart-tag">
                                {typeof tag === 'string' ? tag : (tag?.category || 'Service')}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="col-lg-4 d-flex justify-content-lg-end align-items-center mt-3 mt-lg-0 gap-3">
                    <div className="quantity-control">
                        <span
                            role="button"
                            className="fw-bold px-2"
                            onClick={() => onDecrement(item.id)}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            -
                        </span>
                        <span className="mx-2">{item.quantity}</span>
                        <span
                            role="button"
                            className="fw-bold px-2"
                            onClick={() => onIncrement(item.id)}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            +
                        </span>
                    </div>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
            </div>
            {/* Price indicator for the item row */}
            <div className="row mt-3">
                <div className="col-12 text-end">
                    <span className="fw-bold fs-5 text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
