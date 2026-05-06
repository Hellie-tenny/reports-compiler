import React from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div className='bg-gray-200 h-[100vh] overflow-y-auto w-screen'>
      <div className='bg-black w-full p-4 flex justify-between'>
        <Link to="/" className='text-white hover:text-gray-300'>Back to Daily Reports</Link>
        <h2 className='text-white'>Settings</h2>
      </div>
      <div className='p-4'>
        <p>This is the settings page.</p>
        {/* Add settings content here */}
      </div>
    </div>
  );
}