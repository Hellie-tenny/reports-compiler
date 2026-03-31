import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function WeeklyReport({ members }) {
  const location = useLocation();
  const locationMembers = location.state?.members;
  const resolvedMembers = members ?? locationMembers ?? [];
  const displayMembers = Array.isArray(resolvedMembers) ? resolvedMembers : [resolvedMembers];

  return (
    <div>
      <header className="bg-black text-white p-4 flex items-center">
        <Link to="/" className="text-white hover:text-gray-300">
          Daily report
        </Link>
      </header>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Weekly Report</h1>

        {displayMembers.length > 0 ? (
          displayMembers.map((m) => (
            <div key={m.id} className="my-4 p-5 bg-white rounded shadow-sm">
              <div className="mb-3 text-lg font-bold">{m.id}. {m.name}</div>

              <div className="mb-2 p-3 border rounded">
                <div className="font-semibold">Risk</div>
                <div className="flex gap-4">
                  <div>Lives: {m.riskLives || 0}</div>
                  <div>Premium: {m.riskPremium || 0}</div>
                </div>
              </div>

              <div className="p-3 border rounded">
                <div className="font-semibold">Savings</div>
                <div className="flex gap-4">
                  <div>Lives: {m.savingsLives || 0}</div>
                  <div>Premium: {m.savingsPremium || 0}</div>
                </div>
              </div>

              <div className="mt-3 p-3 border rounded bg-gray-50">
                <div className="font-semibold mb-2">Weekly Breakdown</div>
                {m.weekly && Object.keys(m.weekly).length > 0 ? (
                  Object.entries(m.weekly).map(([day, dayValues]) => (
                    <div key={day} className="mb-4">
                      <div className="font-medium mb-2">{day}</div>

                      <div className="mb-2">
                        <div className="font-semibold">Risk</div>
                        <div className="flex items-end gap-4 mt-1">
                          <label className="flex flex-col text-sm">
                            <span>Lives</span>
                            <input
                              className="border p-1 rounded w-24"
                              type="number"
                              defaultValue={dayValues?.riskLives ?? 0}
                              readOnly
                            />
                          </label>
                          <label className="flex flex-col text-sm">
                            <span>APE</span>
                            <input
                              className="border p-1 rounded w-24"
                              type="number"
                              defaultValue={dayValues?.riskAPE ?? 0}
                              readOnly
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold">Savings</div>
                        <div className="flex items-end gap-4 mt-1">
                          <label className="flex flex-col text-sm">
                            <span>Lives</span>
                            <input
                              className="border p-1 rounded w-24"
                              type="number"
                              defaultValue={dayValues?.savingsLives ?? 0}
                              readOnly
                            />
                          </label>
                          <label className="flex flex-col text-sm">
                            <span>APE</span>
                            <input
                              className="border p-1 rounded w-24"
                              type="number"
                              defaultValue={dayValues?.savingsApe ?? 0}
                              readOnly
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No weekly data available.</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No member data supplied. Pass a `member` prop to show cards.</p>
        )}
      </div>
    </div>
  );
}
