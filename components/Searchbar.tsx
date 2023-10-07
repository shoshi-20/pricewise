'use client';

import { scrapeAndStoreProduct } from '@/lib/actions';
import {FormEvent, useState} from 'react';

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading,setIsLoading]=useState(false)
  const isValidAmazonUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostName = parsedUrl.hostname;
      if (
        hostName.includes('amazon.com') ||
        hostName.includes('amazon.') ||
        hostName.endsWith('amazon')) return true;
    } catch (error) {return false;}
    return false;
  };
  const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonUrl(searchPrompt);
    // alert(isValidLink?'valid link':'invalid link')
    if(!isValidLink)alert('please provide a valid Amazon link');
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        type='text'
        value={searchPrompt}
        onChange={(e) => {
          setSearchPrompt(e.target.value);
        }}
        placeholder='Enter product link'
        className='searchbar-input'
      />

      <button 
       type='submit' 
       className='searchbar-btn'
       disabled={searchPrompt===''}
       >
      {isLoading?'Searching...':'Search'} 
      </button>
    </form>
  );
};

export default Searchbar;
