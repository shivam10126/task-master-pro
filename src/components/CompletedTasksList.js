import React from 'react';

function CompletedTasksList({ tasks }) {
  const statusColors = {
    High: 'bg-red-100 border-red-300',
    Medium: 'bg-yellow-100 border-yellow-300',
    Low: 'bg-green-100 border-green-300',
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <div key={index} className={`${statusColors[task.status]} rounded-lg p-4 shadow-sm`}>
            <h3 className="font-medium mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            <div className="text-xs text-gray-500">
              <p>Completed by: {task.assigneeName}</p>
              <p>Completed on: {task.completedAt.date} at {task.completedAt.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedTasksList;