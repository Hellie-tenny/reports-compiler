import { useEffect, useState } from 'react'
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";
import lion from "./assets/lion.png";
import './App.css'

function App() {

  // states and variables
  const [popup, setPopup] = useState(false);
  const [newMember, setnewMember] = useState("");
  const [members, setMembers] = useState([]);
  const [finalReport, setFinalReport] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [weekNo, setWeekNo] = useState(null);
  const [appData, setAppData] = useState({});
  const [removeMemberDialog, setRemoveMemberDialog] = useState(false);
  const [removeMemberSubject, setRemoveMemberSubject] = useState({});
  // const [sales, setSales] = useState([]);

  // functions and stuff
  function addMember() {
    let member = { id: members.length + 1, name: newMember, riskLives: 0, riskPremium: 0, savingsLives: 0, savingsPremium: 0 };
    let updatedMembers = [...members, member];
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    console.log(members)
  }

  function updateRiskLives(id, number) {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, riskLives: number } : member
    )
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  }

  function updateRiskPremium(id, number) {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, riskPremium: number } : member
    )
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  }

  function updateSavingsLives(id, number) {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, savingsLives: number } : member
    )
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  }

  function updateSavingsPremium(id, number) {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, savingsPremium: number } : member
    )
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  }

  function compileReport() {

    const totalRiskLives = members.reduce((sum, member) => sum + Number(member.riskLives), 0);
    const totalSavingsLives = members.reduce((sum, member) => sum + Number(member.savingsLives), 0);
    const totalLives = totalRiskLives + totalSavingsLives;

    const totalSavingsApe = Number(members.reduce((sum, member) => sum + Number(member.riskPremium), 0)) * 12;
    const totalRiskApe = Number(members.reduce((sum, member) => sum + Number(member.savingsPremium), 0)) * 12;
    const totalApe = totalSavingsApe + totalRiskApe;
    const riskApeVariance = Number(totalRiskApe - 1430357).toLocaleString();
    const totalLivesVariance = totalLives - 12;
    const totalSavingsApeVariance = totalSavingsApe - 1430357;
    const totalApeVariance = totalApe - 286071400;

    const weekAndDate = `Lion Daily Sales Report
${reportDate} Week ${weekNo}

    `;

    const reports = members.map(
      (member) => {
        if (Number(member.riskLives) === 0 && Number(member.savingsLives) === 0) {
          return `
${member.id}. ${member.name}:0
`
        } else if (Number(member.riskLives) > 0 && Number(member.savingsLives) === 0) {
          return `
${member.id}. ${member.name}: ${member.riskLives}r. ${Number(member.riskPremium).toLocaleString()}
`
        } else if (Number(member.savingsLives) > 0 && Number(member.riskLives) === 0) {
          return `
${member.id}. ${member.name}: ${member.savingsLives}s. ${Number(member.savingsPremium).toLocaleString()}
`
        } else {
          return `
${member.id}. ${member.name}: ${member.riskLives}r. ${Number(member.riskPremium).toLocaleString()}, ${member.savingsLives}s. ${Number(member.savingsPremium).toLocaleString()}
          `
        }
      }
    ).join("");

    const summary = `

*LIVES* 
 
Total lives budget 12
Total savings ${totalSavingsLives}
Total Risk ${totalRiskLives}
Total lives ${totalLives}

Total lives variance : ${totalLivesVariance > 0 ? "+" : ""}${totalLivesVariance}

*RISK*

Daily risk Budget 1,430,357.00
Total Risk : ${Number(totalRiskApe).toLocaleString()}
Variance :  ${riskApeVariance > 0 ? "+" : ""}${riskApeVariance}

*SAVINGS*

Daily SAVINGS budget 1,430,357.00
Total APE : ${Number(totalSavingsApe).toLocaleString()}
Variance: ${totalSavingsApeVariance > 0 ? "+" : ""}${Number(totalSavingsApeVariance).toLocaleString()}

*Daily budget*

Daily APE budget 2,860,714.00
Total APE : ${totalApe.toLocaleString()}
APE variance: ${totalApeVariance > 0 ? "+" : ""}${Number(totalApeVariance).toLocaleString()}

Regards.
🦁
    `;

    const fullReport = weekAndDate + " " + reports + " " + summary;
    setFinalReport(fullReport);


    console.log(fullReport);
  }

  function updateWeekNo(number) {
    setWeekNo(number);
    const updatedAppData = { ...appData, weekNo: number };
    localStorage.setItem("appData", JSON.stringify(updatedAppData))
  }

  // copyting to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalReport)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => console.error('Failed to copy:', err));

    setFinalReport("");
  };

  function removeMember(id, name) {
    setRemoveMemberDialog(!removeMemberDialog);
    setRemoveMemberSubject({ id: id, name: name });
  }

  function comfirmRemoveMember() {
    const updatedMembers = members.filter((member) => member.id !== removeMemberSubject.id).map((member, index) => (
      {
        ...member,
        id: index + 1
      }
    ));
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
  }

  function getWeekNumber(date = new Date()) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }

  // useEffect to initialize the app
  useEffect(() => {
    const storedMembers = localStorage.getItem('members');
    const storedAppData = localStorage.getItem('appData');

    if (storedMembers) {
      try {
        setMembers(JSON.parse(storedMembers));
      } catch (e) {
        console.error('Failed to parse members from localStorage:', e);
      }
    } else {
      const initialMembers = [
        {
          "id": 1,
          "name": "Kingsley",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 2,
          "name": "Winston",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 3,
          "name": "Cecilia",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 4,
          "name": "Chikumbutso",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 5,
          "name": "Yamikani",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 6,
          "name": "Christopher",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 7,
          "name": "Hellings",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 8,
          "name": "Chifundo",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 9,
          "name": "Rachael",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 10,
          "name": "Balumbechi",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 11,
          "name": "Clive",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 12,
          "name": "Precious",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 13,
          "name": "Edna",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 14,
          "name": "Dorothy",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        },
        {
          "id": 15,
          "name": "Gladson",
          "riskLives": "0",
          "riskPremium": "0",
          "savingsLives": "0",
          "savingsPremium": "0"
        }
      ]
      setMembers(initialMembers);
      localStorage.setItem("members", JSON.stringify(initialMembers));
    }

    if (storedAppData) {
      try {
        setAppData(JSON.parse(storedAppData));
        const parsed = JSON.parse(storedAppData);
        setWeekNo(parsed.weekNo);
      } catch (e) {
        console.error('Failed to parse members from localStorage:', e);
      }
    }

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();

    const today = `${day}/${month}/${year}`;
    setReportDate(today)
    const currentWeek = getWeekNumber();
    setWeekNo(currentWeek);

  }, []);


  return (
    <div className='container bg-gray-200 h-[100vh] overflow-y-auto'>



      <div className={`absolute bg-[rgba(0,0,0,0.5)] w-full h-full ${popup ? `flex` : 'hidden'} justify-center items-center px-20`}>

        <div className="bg-white w-full lg:w-[40%] p-4 h-auto">

          <div className="flex justify-end w-full pb-5">
            <span className='cursor-pointer' onClick={() => setPopup(!popup)}>
              x
            </span>
          </div>

          <input type="text" placeholder='Member name...' className='w-[90%] md:block' value={newMember} onChange={(e) => setnewMember(e.target.value)} />
          <button className='bg-black text-white p-1 rounded-sm hover:cursor-pointer lg:w-[10%]'
            onClick={() => addMember()}>
            Add
          </button>

        </div>


      </div>


      <div className={`absolute bg-[rgba(0,0,0,0.5)] w-full h-full ${removeMemberDialog ? `flex` : 'hidden'} justify-center items-center`}>

        <div className="bg-white w-[40%] p-4 h-auto">
          <HiOutlineXMark className='float-right cursor-pointer' onClick={() => setRemoveMemberDialog(false)} />
          <div className='my-4'>
            <span>
              Are you sure you want to remove {removeMemberSubject.name}?
            </span>
          </div>

          <div>
            <button className='bg-black text-white p-1 rounded-sm cursor-pointer mx-auto' onClick={comfirmRemoveMember}>
              Comfirm
            </button>
          </div>

        </div>


      </div>


      <div className='bg-black w-full p-4'>
        <h2 className='text-white'>
          <img src={lion} alt="Team Lion Logo" className='w-[5%] inline rounded-md mr-2' />
          Daily Sales Reporting Tool
        </h2>
      </div>

      <div className="members w-full">

        <div className="w-full p-[2rem]">
          <input type="text" value={reportDate} /> Week NO. <input type="text" className='w-[10%]' placeholder='Week No.' value={weekNo} onChange={(e) => updateWeekNo(e.target.value)} />
          <button className="justify-end float-right bg-black text-white p-1 rounded-sm cursor-pointer" onClick={() => setPopup(!popup)}>
            Add Member
          </button>
        </div>

      </div>


      <div className="report p-[2rem] lg:w-[70%] mx-auto h-[100%]">
        {
          members.map((member) => (
            <div className='my-2 p-5  bg-white'>
              <MdOutlineRemoveCircleOutline
                className='float-right cursor-pointer'
                onClick={() => removeMember(member.id, member.name)}
              />
              <div className='flex-2'>
                <span className='font-bold'>{member.id}. {member.name}</span>
              </div>
              <div className='p-4 rounded-sm'>
                <div>
                  <div>
                    <span className='font-bold'>Risk: </span>
                  </div>

                  <div className='w-full grid grid-cols-4 items-center'>
                    <span>Lives: </span><input type="text" className='bg-white m-1 p-1 w-[40%]' placeholder='Lives' value={member.riskLives} onChange={(e) => updateRiskLives(member.id, e.target.value)} />
                    <span>Premium: </span><input type="text" className='bg-white m-1 p-1 cols-3' placeholder='Premium' value={member.riskPremium} onChange={(e) => updateRiskPremium(member.id, e.target.value)} />
                  </div>


                </div>

                <div>
                  <div>
                    <span className='font-bold'>Savings: </span>
                  </div>

                  <div className="w-full grid grid-cols-4 items-center">
                    <span>Lives: </span><input type="text" className='bg-white m-1 p-1' placeholder='Lives' value={member.savingsLives} onChange={(e) => updateSavingsLives(member.id, e.target.value)} />
                    <span>Premium: </span><input type="text" className='bg-white m-1 p-1 cols-3' placeholder='Premium' value={member.savingsPremium} onChange={(e) => updateSavingsPremium(member.id, e.target.value)} />
                  </div>


                </div>


              </div>
            </div>
          ))
        }

        <button className='bg-black text-white p-1 rounded-sm cursor-pointer mx-auto'
          onClick={compileReport}
        >
          Compile
        </button>

        <div className="w-full">
          <pre>
            {finalReport}
          </pre>

          {
            finalReport === "" ? "" : <button className='bg-black text-white p-1 rounded-sm cursor-pointer mx-auto' onClick={copyToClipboard}>
              Copy
            </button>
          }

        </div>

      </div>


    </div>
  )
}

export default App
