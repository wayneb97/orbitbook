import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib_supabase';

export default function BookingPage() {
  const router = useRouter();
  const { business } = router.query;

  const [slots, setSlots] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', tickets: {} });

  useEffect(() => {
    if (business) {
      loadSlots();
      loadTickets();
    }
  }, [business]);

  const loadSlots = async () => {
    const { data } = await supabase.from('slots').select('*').eq('business_slug', business);
    setSlots(data);
  };

  const loadTickets = async () => {
    const { data } = await supabase.from('tickets').select('*').eq('business_slug', business);
    setTickets(data);
  };

  const submitBooking = async () => {
    const { name, email, tickets } = formData;
    const { error } = await supabase.from('bookings').insert([
      {
        name,
        email,
        tickets: JSON.stringify(tickets),
        slot_id: selectedSlot,
        business_slug: business,
      },
    ]);
    if (!error) alert('Booking successful!');
  };

  return (
    <div className='p-6 text-white bg-black min-h-screen'>
      <h1 className='text-2xl mb-4'>Book at {business}</h1>

      <div className='mb-4'>
        <label className='block'>Name</label>
        <input
          className='p-2 bg-gray-800 text-white w-full'
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className='mb-4'>
        <label className='block'>Email</label>
        <input
          className='p-2 bg-gray-800 text-white w-full'
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1'>Select a Slot</label>
        <select
          className='p-2 bg-gray-800 text-white w-full'
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value=''>-- Choose Slot --</option>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.date} @ {slot.time}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <h2 className='mb-2'>Tickets</h2>
        {tickets.map((t) => (
          <div key={t.id} className='mb-1'>
            <label>{t.name} (£{t.price})</label>
            <input
              type='number'
              min='0'
              className='ml-2 w-20 p-1 bg-gray-800 text-white'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tickets: { ...formData.tickets, [t.id]: e.target.value },
                })
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={submitBooking}
        className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
      >
        Confirm Booking
      </button>
    </div>
  );
}
