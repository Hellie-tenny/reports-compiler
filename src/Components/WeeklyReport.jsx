import React, { useEffect, useState } from 'react';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export default function WeeklyReport({ members, member, setMembers }) {

  const [updatedMember, setUpdatedMember] = useState([member]);
  const [riskLives, setRiskLives] = useState(0);
  const [riskApe, setRiskApe] = useState(0);
  const [savingsLives, setSavingsLives] = useState(0);
  const [savingsApe, setSavingsApe] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const updateRiskLives = (reportDay, newRiskLives) => {

    setRiskLives(newRiskLives);

    const newUpdatedMember = {
      ...member,
      weekly: member.weekly.map(d =>
        d.day === reportDay ? { ...d, riskLives: newRiskLives } : d
      )
    };

    setUpdatedMember(newUpdatedMember);

    const updateMemberById = (id) => {
      return members.map(member => member.id === id ? newUpdatedMember : member);
    }

    const updatedMembers = updateMemberById(member.id);
    console.log(updatedMembers);
    setMembers(updatedMembers);

  }

  const updateRiskApe = (reportDay, newRiskApe) => {
    setRiskLives(newRiskApe);

    const newUpdatedMember = {
      ...member,
      weekly: member.weekly.map(d =>
        d.day === reportDay ? { ...d, riskApe: newRiskApe } : d
      )
    };

    setUpdatedMember(newUpdatedMember);

    const updateMemberById = (id) => {
      return members.map(member => member.id === id ? newUpdatedMember : member);
    }

    const updatedMembers = updateMemberById(member.id);
    console.log(updatedMembers);
    setMembers(updatedMembers);
  }

  const updateSavingsLives = (reportDay, newSavingsLives) => {

    setSavingsLives(newSavingsLives);

    const newUpdatedMember = {
      ...member,
      weekly: member.weekly.map(d =>
        d.day === reportDay ? { ...d, savingsLives: newSavingsLives } : d
      )
    };

    setUpdatedMember(newUpdatedMember);

    const updateMemberById = (id) => {
      return members.map(member => member.id === id ? newUpdatedMember : member);
    }

    const updatedMembers = updateMemberById(member.id);
    console.log(updatedMembers);
    setMembers(updatedMembers);

  }

  const updateSavingsApe = (reportDay, newSavingsApe) => {

    setSavingsApe(newSavingsApe);

    const newUpdatedMember = {
      ...member,
      weekly: member.weekly.map(d =>
        d.day === reportDay ? { ...d, savingsApe: newSavingsApe } : d
      )
    };

    setUpdatedMember(newUpdatedMember);

    const updateMemberById = (id) => {
      return members.map(member => member.id === id ? newUpdatedMember : member);
    }

    const updatedMembers = updateMemberById(member.id);
    console.log(updatedMembers);
    setMembers(updatedMembers);

  }

  return (
    <div className='my-2 p-5  bg-white'>
      <div className='flex items-center justify-between'>
        <span className='font-bold text-2xl'>{member.id}. {member?.name}</span>
        <button onClick={() => setIsExpanded(!isExpanded)} className='text-2xl'>
          {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>

      {isExpanded && (
        <div>
          <div>
            {
              member.weekly.map((day) => (
                <div className='py-4' key={day.day}>

                  <span className='font-bold block'>{day.day}</span>
                  <div className=''>
                    <span className='block font-semibold'>Risk</span>
                    <span>Lives: </span><input type="text" value={day.riskLives} onChange={(e) => { updateRiskLives(day.day, e.target.value) }} /> <span>Premium: </span><input type="text" value={day.riskApe} onChange={(e) => { updateRiskApe(day.day, e.target.value) }} />

                  </div>
                  <div>
                    <span className='block font-semibold pt-2'>Savings</span>
                    <span>Lives: </span><input type="text" value={day.savingsLives} onChange={(e) => { updateSavingsLives(day.day, e.target.value) }} /> <span>Premium: </span><input type="text" value={day.savingsApe} onChange={(e) => { updateSavingsApe(day.day, e.target.value) }} />
                  </div>

                </div>
              ))
            }
          </div>
        </div>
      )}

    </div>
  );
}
