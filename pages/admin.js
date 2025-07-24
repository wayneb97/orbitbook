import { useEffect, useState } from 'react';
import { supabase } from '../lib_supabase';

export default function Admin() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function fetchBusinesses() {
      const { data, error } = await supabase.from('businesses').select('*');
      if (!error) setBusinesses(data);
    }
    fetchBusinesses();
  }, []);

  return (
    <div className='p-8 text-white bg-black min-h-screen'>
      <h1 className='text-2xl mb-4'>OrbitBook Admin Dashboard</h1>
      <h2 className='text-xl mb-2'>Businesses</h2>
      <ul>
        {businesses.map((biz) => (
          <li key={biz.id} className='mb-2 border-b border-gray-700 pb-2'>
            <strong>{biz.name}</strong> — {biz.slug}
          </li>
        ))}
      </ul>
    </div>
  );
}
