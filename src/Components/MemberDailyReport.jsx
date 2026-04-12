import React, { memo } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { LuListRestart } from "react-icons/lu";

function MemberDailyReport(props) {
    return (
        <div className='my-2 p-5  bg-white'>

            {/* <MdOutlineRemoveCircleOutline
                className='float-right cursor-pointer'
                onClick={() => removeMember(member.id, member.name)}
              /> */}

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
                        <span>Lives: </span><input type="text" className='bg-white m-1 p-1 w-[40%]' placeholder='Lives' value={props.member.riskLives} onChange={(e) => props.updateRiskLives(props.member.id, e.target.value)} />
                        <span>Premium: </span><input type="text" className='bg-white m-1 p-1 cols-3' placeholder='Premium' value={props.member.riskPremium} onChange={(e) => props.updateRiskPremium(props.member.id, e.target.value)} />
                    </div>


                </div>

                <div>
                    <div>
                        <span className='font-bold'>Savings: </span>
                    </div>

                    <div className="w-full grid grid-cols-4 items-center">
                        <span>Lives: </span><input type="text" className='bg-white m-1 p-1' placeholder='Lives' value={props.member.savingsLives} onChange={(e) => props.updateSavingsLives(props.member.id, e.target.value)} />
                        <span>Premium: </span><input type="text" className='bg-white m-1 p-1 cols-3' placeholder='Premium' value={props.member.savingsPremium} onChange={(e) => props.updateSavingsPremium(props.member.id, e.target.value)} />
                    </div>


                </div>


            </div>
        </div>
    )
}

export default memo(MemberDailyReport);
