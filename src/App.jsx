import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // states and variables
  const [popup, setPopup] = useState(false);
  const [newMember, setnewMember] = useState("");
  const [members, setMembers] = useState([]);
  const [finalReport, setFinalReport] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [weekNo, setWeekNo] = useState("");
  const [appData, setAppData] = useState({})
  // const [sales, setSales] = useState([]);

  // functions and stuff
  function addMember() {
    let member = { id: members.length + 1, name: newMember, riskLives: null, riskApe: null, savingsLives: null, savingsApe: null };
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

  function updateRiskApe(id, number) {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, riskApe: number } : member
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

  function updateSavingsApe(id, number) {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, savingsApe: number } : member
    )
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  }

  function compileReport() {

    const totalRiskLives = members.reduce((sum, member) => sum + Number(member.riskLives), 0);
    const totalSavingsLives = members.reduce((sum, member) => sum + Number(member.savingsLives), 0);
    const totalLives = totalRiskLives + totalSavingsLives;

    const totalSavingsApe = members.reduce((sum, member) => sum + Number(member.riskApe), 0);
    const totalRiskApe = members.reduce((sum, member) => sum + Number(member.savingsApe), 0);
    const totalApe = totalSavingsApe + totalRiskApe;
    const riskApeVariance = Number(totalRiskApe - 1430357).toLocaleString();
    const totalLivesVariance = totalLives - 12;
    const totalSavingsApeVariance = totalSavingsApe - 1430357;
    const totalApeVariance = totalApe - 286071400;

    const weekAndDate = `Lion Daily Sales Report
${reportDate} ${weekNo}

    `;

    const reports = members.map(
      (member) => {
        if (Number(member.riskLives) === 0 && Number(member.savingsLives) === 0) {
          return `
${member.id}. ${member.name}:0
`
        } else if (Number(member.riskLives) > 0 && Number(member.savingsLives) === 0) {
          return `
${member.id}. ${member.name}: ${member.riskLives}r. ${Number(member.riskApe).toLocaleString()}
`
        } else if (Number(member.savingsLives) > 0 && Number(member.riskLives) === 0) {
          return `
${member.id}. ${member.name}: ${member.savingsLives}s. ${Number(member.savingsApe).toLocaleString()}
`
        } else {
          return `
${member.id}. ${member.name}: ${member.riskLives}r. ${Number(member.riskApe).toLocaleString()}, ${member.savingsLives}s. ${Number(member.savingsApe).toLocaleString()}
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
        <input type="text" value={reportDate} /> Week NO.<input type="text" placeholder='Week No.' value={weekNo} onChange={(e) => updateWeekNo(e.target.value)} />
        <button className="justify-end float-right bg-black text-white p-1 rounded-sm cursor-pointer" onClick={() => setPopup(!popup)}>
          Add Member
        </button>
      </div>

      <div className="w-[70%] mx-auto">
        {
          members.map((member) => (
            <div className='my-2 bg-gray-200 p-5'>
              <div className='flex-2'>
                <span className='font-bold'>{member.id}. {member.name}</span>
              </div>
              <div className='p-4 rounded-sm'>
                <div>
                  <div>
                    <span className='font-bold'>Risk: </span>
                  </div>

                  <span>Lives: </span><input type="text" className='bg-white m-1 p-1' placeholder='Lives' value={member.riskLives} onChange={(e) => updateRiskLives(member.id, e.target.value)} />
                  <span>APE: </span><input type="text" className='bg-white m-1 p-1' placeholder='APE' value={member.riskApe} onChange={(e) => updateRiskApe(member.id, e.target.value)} />
                </div>

                <div>
                  <div>
                    <span className='font-bold'>Savings: </span>
                  </div>

                  <span>Lives: </span><input type="text" className='bg-white m-1 p-1' placeholder='Lives' value={member.savingsLives} onChange={(e) => updateSavingsLives(member.id, e.target.value)} />
                  <span>APE: </span><input type="text" className='bg-white m-1 p-1' placeholder='APE' value={member.savingsApe} onChange={(e) => updateSavingsApe(member.id, e.target.value)} />
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
