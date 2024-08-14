// import plusIcon from "../shoeCard/plus.png"
import plusIcon from "/src/assets/plus.png"
import minusIcon from "/src/assets/minus.png"

export function ShoeCard({ shoe, addToCart, removeFromCart }) {
  return (
    <div className="card border border-secondary-border rounded-xl border-solid p-2">
      <div>
        <img className="w-full max-h-[350px]" src={shoe.image} alt="shoe" />
      </div>
      {/* <div className='pt-2 flex flex-col gap-1'>
          <span className='text-sm text-[#A1A1AA]'>{shoe.reference}</span>
          <h1>{shoe.title}</h1>
        </div> */}
      <div className="py-2 mt-3 flex justify-between rounded-xl px-3  items-center">
        <div className="flex flex-col gap-1">
          {/* <span className='text-xs text-[#A1A1AA]'>Shoe Name</span> */}
          <div className="text-sm xl:text-base flex gap-1">
            {/* <img src={author} alt='author' /> */}
            <p>{shoe.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {/* <span className="text-xs ">Price</span> */}
          <div className="text-sm xl:text-base flex gap-1 items-center">
            <div className="flex gap-1">
              <span>$</span>
              <p>{shoe.price}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <button
          onClick={() => removeFromCart(shoe.id)}
          className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition-colors"
        >
          <img src={minusIcon} alt="minus" className="w-4 h-4"/>

        </button>
        <button
          onClick={() => addToCart(shoe)}
          className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition-colors"
        >
          <img src={plusIcon} alt="plus" className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
}
