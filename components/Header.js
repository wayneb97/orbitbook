export default function Header({ title }) {
  return (
    <header className='bg-gray-900 text-white p-4'>
      <h1 className='text-xl font-semibold'>{title}</h1>
    </header>
  );
}
