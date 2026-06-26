import React, { memo } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { LuListRestart } from "react-icons/lu";

function MemberDailyReport(props) {
    const isUnavailable = props.member.activeStatus !== "availabe";
    return (
        <div className='my-2 p-5  bg-white'>

            {/* <MdOutlineRemoveCircleOutline
                className='float-right cursor-pointer'
                onClick={() => removeMember(member.id, member.name)}
              /> */}
            <select value={props.member.activeStatus || "available"} onChange={(e) => {props.changeActiveStatus(props.member.id, e.target.value)} }>
                <option value="available">Available</option>
                <option value="sl">Sick Leave</option>
                <option value="cl">Compassionate Leave</option>
                <option value="ml">Martenity Leave</option>
                <option value="pl">Partenity Leave</option>
                <option value="al">Anual Leave</option>
                <option value="stl">Study Leave</option>
            </select>

            <MdOutlineDeleteForever
                className='float-right cursor-pointer text-2xl text-gray-600'
                onClick={() => props.removeMember(props.member.id, props.member.name)}
            />

            <LuListRestart
                className='float-right text-2xl cursor-pointer text-gray-600'
                onClick={() => props.resetSales(props.member.id)}
            />

            <div className='flex-2'>
                <span className='font-bold'>{props.member.id}. {props.member.name}</span>
            </div>
            <div className='p-4 rounded-sm'>
                <div>
                    <div>
                        <span className='font-bold'>Risk: </span>
                    </div>

                    <div className='w-full grid grid-cols-4 items-center'>
                        <span>Lives: </span><input type="text" className={`bg-white m-1 p-1 w-[full] disabled:opacity-50 disabled:cursor-not-allowed`} placeholder='Lives' value={props.member.riskLives} onChange={(e) => props.updateRiskLives(props.member.id, e.target.value)} disabled={props.member.activeStatus !== "available"} />
                        <span>Premium: </span><input type="text" className={`bg-white m-1 p-1 w-[full] disabled:opacity-50 disabled:cursor-not-allowed`} placeholder='Premium' value={props.member.riskPremium} onChange={(e) => props.updateRiskPremium(props.member.id, e.target.value)} disabled={props.member.activeStatus !== "available"} />
                    </div>


                </div>

                <div>
                    <div>
                        <span className='font-bold'>Savings: </span>
                    </div>

                    <div className="w-full grid grid-cols-4 items-center">
                        <span>Lives: </span><input type="text" className={`bg-white m-1 p-1 w-[w-full] disabled:opacity-50 disabled:cursor-not-allowed`} placeholder='Lives' value={props.member.savingsLives} onChange={(e) => props.updateSavingsLives(props.member.id, e.target.value)} disabled={props.member.activeStatus !== "available"} />
                        <span>Premium: </span><input type="text" className={`bg-white m-1 p-1 w-[w-full] disabled:opacity-50 disabled:cursor-not-allowed`} placeholder='Premium' value={props.member.savingsPremium} onChange={(e) => props.updateSavingsPremium(props.member.id, e.target.value)} disabled={props.member.activeStatus !== "available"} />
                    </div>


                </div>


            </div>
        </div>
    )
}

export default memo(MemberDailyReport);
