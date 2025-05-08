import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // states and variables
  const [popup, setPopup] = useState(false);
  const [newMember, setnewMember] = useState("");
  const [members, setMembers] = useState([]);
  // const [sales, setSales] = useState([]);

  // functions and stuff
  function addMember() {
    let member = { name: newMember, risk: 0, savings: 0 };
    let updatedMembers = [...members, member];
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    console.log(members)
  }

  // useEffect to initialize the app
  useEffect(() => {
  const storedMembers = localStorage.getItem('members');
  if (storedMembers) {
    try {
      setMembers(JSON.parse(storedMembers));
    } catch (e) {
      console.error('Failed to parse members from localStorage:', e);
    }
  }
}, []);


  return (
    <div className='container'>

      <div className={`absolute bg-[rgba(0,0,0,0.5)] w-full h-full ${popup ? `flex` : 'hidden'} justify-center items-center`}>

        <div className="bg-white w-[40%] p-4 h-auto">

          <div className="flex justify-end w-full pb-5">
            <span className='cursor-pointer' onClick={() => setPopup(!popup)}>
              x
            </span>
          </div>

          <input type="text" placeholder='Member name...' className='w-[90%]' value={newMember} onChange={(e) => setnewMember(e.target.value)} />
          <button className='bg-black text-white p-1 rounded-sm hover:cursor-pointer w-[10%]'
            onClick={() => addMember()}>
            Add
          </button>

        </div>


      </div>

      <div className='bg-black w-full p-4'>
        <h2 className='text-white'>
          Daily Sales Reporting Tool
        </h2>
      </div>

      <div className="w-full p-[2rem]">
        <button className="justify-end float-right bg-black text-white p-1 rounded-sm cursor-pointer" onClick={() => setPopup(!popup)}>
          Add Member
        </button>
      </div>

      <div className="w-[70%] mx-auto">
        {
          members.map((member) => (
            <div className='my-2 bg-gray-200 p-5'>
              {member.name}
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App
