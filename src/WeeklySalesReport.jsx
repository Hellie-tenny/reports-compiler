import { Link } from 'react-router-dom';
import WeeklyReport from './Components/WeeklyReport';
import { useState } from 'react';

export default function WeeklySalesReport({ members, setMembers, weekNo, budgets, teamSettings}) {

    const [finalWeeklyReport, setFinalWeeklyReport] = useState("");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(finalWeeklyReport)
            .then(() => alert('Copied to clipboard!'))
            .catch((err) => console.error('Failed to copy:', err));

        setFinalWeeklyReport("");
    }

    const updateMemberTotalWeeklySales = (id, totalWeeklySales) => {


        const totalWeeklyUpdatedSales = members.map((member) => {
            // console.log(totalWeeklySales);
            return member.id === id ? { ...member, total: totalWeeklySales } : member
        });

        console.log(totalWeeklyUpdatedSales);
    };

    const compileReport = () => {

        const updatedMembers = members.map((member) => {

            const calculatedTotals = member.weekly.reduce((acc, day) => {

                acc.totalRiskLives += Number(day.riskLives)
                acc.totalRiskApe += Number(day.riskApe)
                acc.totalSavingsLives += Number(day.savingsLives)
                acc.totalSavingsApe += Number(day.savingsApe)

                return acc;

            }, { totalRiskLives: 0, totalRiskApe: 0, totalSavingsLives: 0, totalSavingsApe: 0 });

            return { ...member, total: calculatedTotals }

        });

        setMembers(updatedMembers);

        const totalRiskLives = updatedMembers.reduce((acc, member) => {
            return acc += Number(member.total.totalRiskLives);
        },

            0);

        const totalRiskApe = updatedMembers.reduce((acc, member) => {
            return acc += Number(member.total.totalRiskApe);
        },

            0);

        const totalSavingsLives = updatedMembers.reduce((acc, member) => {
            return acc += Number(member.total.totalSavingsLives);
        },

            0);

        const totalSavingsApe = updatedMembers .reduce((acc, member) => {
            return acc += Number(member.total.totalSavingsApe);
        },

            0);

        const totalLives = totalRiskLives + totalSavingsLives;
        const totalApe = Number(totalRiskApe + totalSavingsApe)*12;
        const totalLivesVariance = Number(totalLives) - budgets.weeklyLivesBudget;
        const totalRiskApeVariance = Number(totalRiskApe)*12 - Number(budgets.weeklyRiskApeBudget);
        const totalSavingsApeVariance = Number(totalSavingsApe)*12 - Number(budgets.weeklySavingsApeBudget);
        const totalApeVariance = totalApe - Number(budgets.weeklyBudget);
        // const totalApeVariance = totalApe - 10987500;

        const intro = `${teamSettings.teamName} WEEK ${weekNo} SALES REPORT`+"\n";

        const membersReports = updatedMembers.map((member) => {
            if(Number(member.total.totalRiskLives)+Number(member.total.totalSavingsLives) === 0){
                return `${member.id}.${member.name}................0`;
            } else if(Number(member.total.totalSavingsLives) === 1 && Number(member.total.totalRiskLives) === 0) {
                return `${member.id}.${member.name}................${member.total.totalSavingsLives} Life ${Number(Number(member.total.totalSavingsApe)*12).toLocaleString()} - 0r`;
            } else if(Number(member.total.totalRiskLives) === 1 && Number(member.total.totalSavingsLives) === 0){
                return `${member.id}.${member.name}................${member.total.totalRiskLives} Life ${Number(Number(member.total.totalRiskApe)*12).toLocaleString()} - ${member.total.totalRiskLives}r`;
            } else if(Number(member.total.totalSavingsLives) > 1 && Number(member.total.totalRiskLives) === 0) {
                return `${member.id}.${member.name}................${member.total.totalSavingsLives} Lives ${(Number(member.total.totalSavingsApe)*12).toLocaleString()} - ${member.total.totalRiskLives}r`;
            } else {
                return `${member.id}.${member.name}................${Number(member.total.totalSavingsLives)+Number(member.total.totalRiskLives)} Lives ${Number((member.total.totalSavingsApe+member.total.totalRiskApe)*12).toLocaleString()} - ${member.total.totalRiskLives}r`;
            }
        }).join("\n");

        console.log(membersReports)

        const summary = `
        
Lives budget : ${budgets.weeklyLivesBudget}
Achieved: ${totalLives}
Risk: ${totalRiskLives}
Savings: ${totalSavingsLives}
Lives Variance: ${totalLivesVariance > 0 ? "+" + totalLivesVariance : totalLivesVariance}

Risk 
Budget: ${Number(budgets.weeklyRiskApeBudget).toLocaleString()}
Achieved: ${(Number(totalRiskApe)*12).toLocaleString()}
Variance: ${totalRiskApeVariance > 0 ? "+" + Number(totalRiskApe).toLocaleString() : Number(totalRiskApeVariance).toLocaleString()}

Savings
Budget: ${Number(budgets.weeklySavingsApeBudget).toLocaleString()}
Achieved: ${(Number(totalSavingsApe)*12).toLocaleString()}
Variance: ${totalSavingsApeVariance > 0 ? "+" + Number(totalSavingsApeVariance).toLocaleString() : Number(totalSavingsApeVariance).toLocaleString()}

Weekly Budget: ${Number(budgets.weeklyBudget).toLocaleString()}
Total APE: ${Number(totalApe).toLocaleString()}
Variance:  ${totalApeVariance > 0 ? "+" + Number(totalApeVariance).toLocaleString() : Number(totalApeVariance).toLocaleString()}

Regards...
        
        `;

        const weeklyReport = intro+membersReports+summary;

        setFinalWeeklyReport(weeklyReport);

    }

    return (
        <div>

            <div className='bg-black w-full p-4 flex justify-between'>
                <h2 className='text-white'>
                    <Link to="/" className='text-white hover:text-gray-300 mr-4'>
                        Daily Sales Report
                    </Link>
                </h2>
            </div>

            <div className='p-[2rem]'>
                {
                    members.map((member) =>
                    (
                        <WeeklyReport member={member} key={member.id} setMembers={setMembers} members={members} />
                    )
                    )
                }

                <button className='bg-black text-white p-1 rounded-sm cursor-pointer mx-auto'
                    onClick={compileReport}
                >
                    Compile
                </button>

                <div className="w-full">
                    <pre>
                        {finalWeeklyReport}
                    </pre>

                    {
                        finalWeeklyReport === "" ? "" : <button className='bg-black text-white p-1 rounded-sm cursor-pointer mx-auto' onClick={copyToClipboard}>
                            Copy
                        </button>
                    }

                </div>

            </div>


        </div>
    );
}
