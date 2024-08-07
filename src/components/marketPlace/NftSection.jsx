import author from '../../assets/author.png';
import { nfts } from '../../data/nfts';

export function NftSection() {
  return (
    <div className='grid xlm:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8'>
      {nfts?.map((nft) => (
        <NftCard nft={nft} />
      ))}
    </div>
  );
}

function NftCard({ nft }) {
  return (
    <div className='card border border-secondary-border rounded-xl border-solid p-2'>
      <div>
        <img className='w-full max-h-[350px]' src={nft.img} alt='nft' />
      </div>
      <div className='pt-2 flex flex-col gap-1'>
        <span className='text-sm text-[#A1A1AA]'>{nft.reference}</span>
        <h1>{nft.title}</h1>
      </div>
      <div className='py-2 mt-3 flex justify-between rounded-xl px-3 bg-zinc-800 items-center'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-[#A1A1AA]'>Author</span>
          <div className='text-sm xl:text-base flex gap-1'>
            {/* <img src={author} alt='author' /> */}
            <p>{nft.author}</p>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-[#A1A1AA]'>Price</span>
          <div className='text-sm xl:text-base flex gap-1 items-center'>
            <div className='flex gap-1'>
              <span>$</span>
              <p>{nft.priceUsd}</p>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
}
