export function Cart({ cart }) {
    const totalPrice = cart.reduce((total, shoe) => total + shoe.price * shoe.quantity, 0);
  
    return (
      <div className='cart'>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((shoe) => (
              <div key={shoe.id} className='cart-item flex justify-between'>
                <img src={shoe.image} alt={shoe.name} className='w-12 h-12' />
                <p>{shoe.name}</p>
                <p>{shoe.quantity}</p>
                <p>${shoe.price * shoe.quantity}</p>
              </div>
            ))}
            <div className='total flex justify-between mt-4'>
              <p>Total:</p>
              <p>${totalPrice}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  