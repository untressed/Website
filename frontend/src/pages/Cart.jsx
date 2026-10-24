import React, { useState, useEffect } from 'react';
import '../App.css';
import YourOrder from '../components/YourOrder';
import EmptyCart from '../components/EmptyCart';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    // Initial Load from LocalStorage (Lazy Initialization)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedItems = localStorage.getItem('cartItems');
            const parsed = storedItems ? JSON.parse(storedItems) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Failed to parse cart items:", error);
            return [];
        }
    });

    // Update LocalStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Listen for external updates (e.g. from Pricing Modal)
    useEffect(() => {
        const handleCartUpdate = () => {
            try {
                const storedItems = localStorage.getItem('cartItems');
                if (storedItems) {
                    const parsed = JSON.parse(storedItems);
                    if (Array.isArray(parsed)) {
                        setCartItems(parsed);
                    }
                }
            } catch (error) {
                console.error("Failed to sync cart:", error);
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const handleIncrement = (id) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrement = (id) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item;
            }
            return item;
        }));
    };

    const handleRemove = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        // Dispatch event to notify Navbar/other components
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // Pricing Logic
    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const subtotalVal = calculateSubtotal();
    const taxesVal = subtotalVal * 0.05; // 5% Tax
    const totalVal = subtotalVal + taxesVal;

    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4 pt-4">My Cart</h2>

            {cartItems.length > 0 ? (
                <YourOrder
                    items={cartItems}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    handleRemove={handleRemove}
                    subtotal={subtotalVal.toFixed(2)}
                    taxes={taxesVal.toFixed(2)}
                    total={totalVal.toFixed(2)}
                    onCheckout={() => setIsCheckoutModalOpen(true)}
                />
            ) : (
                <EmptyCart />
            )}

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                items={cartItems}
                subtotal={subtotalVal.toFixed(2)}
                taxes={taxesVal.toFixed(2)}
                total={totalVal.toFixed(2)}
                onClearCart={clearCart}
            />
        </div>
    );
};

export default Cart;
