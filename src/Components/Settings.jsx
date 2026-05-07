import React from 'react';
import { Link } from 'react-router-dom';

export default function Settings(props) {
  return (
    <div className='bg-gray-200 h-[100vh] overflow-y-auto w-screen'>
      <div className='bg-black w-full p-4 flex justify-between'>
        <Link to="/" className='text-white hover:text-gray-300'>Back to Daily Reports</Link>
        <h2 className='text-white'>Settings</h2>
      </div>
      <div className='p-4'>

        <div className='py-4'>
          <span className='font-bold block'>Team Settings</span>
          <span>Team Name: </span><input type="text" className='border border-gray-300 rounded-sm my-2' value={props.teamSettings.teamName} onChange={(e) => props.editTeamName(e.target.value)} placeholder='Edit Team name' /> <br />
          <span>Team Icon: </span><input type="text" className='border border-gray-300 rounded-sm my-2' value={props.teamSettings.teamIcon} onChange={(e) => props.editTeamIcon(e.target.value)} placeholder='Edit Team Icon' />
        </div>

        <div className='py-4'>
          <span className='font-bold block'>Budget Settings</span>
          <span>Daily Budget: </span><input type="text" className='border border-gray-300 rounded-sm my-2' value={props.budgets.dailyBudget} onChange={(e) => props.editDailyBudget(e.target.value)} placeholder='Edit Team name' /> <br />
          <span>Weekly Budget: </span><input type="text" className='border border-gray-300 rounded-sm my-2' placeholder='Edit Team Weekly Budget' disabled/> <br />
          <span>Daily Lives Budget: </span><input type="text" className='border border-gray-300 rounded-sm my-2' value={props.budgets.dailyLivesBudget} onChange={(e) => props.editDailyLivesBudget(e.target.value)} placeholder='Edit Daily Lives Budget' />
        </div>

      </div>
    </div>
  );
}