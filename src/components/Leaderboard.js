import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Leaderboard({ users,showLeaderboard }) {
  // Generate a unique color for each user
  const generateColor = (index) => {
    const hue = (index * 137.508) % 360; // Use golden angle approximation
    return `hsl(${hue}, 70%, 60%)`;
  };

  const data = {
    labels: users.map(user => user.userName),
    datasets: [
      {
        label: 'Tasks Completed',
        data: users.map(user => user.totalTasksCompleted),
        backgroundColor: users.map((_, index) => generateColor(index)),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: showLeaderboard ? false : true},
      title: {
        display: true,
        text: 'User Task Completion Leaderboard',
        font: { size: 18 },
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        title: { 
          display: true, 
          text: 'Number of Tasks Completed', 
          font: { size: 14, weight: 'bold' } 
        } 
      },
           
    },
    animation:{
      duration:2000,
    },
    
    };
  return (
    <div className={`${showLeaderboard ? "block" :"hidden"}  mt-8 bg-white p-6 pt-0 -mt-2 rounded-lg shadow-sm `}>
      <div className='flex justify-center' style={{ height: '550px' }}> 
        <Bar data={data} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, index) => (
          <div key={user.userName} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: generateColor(index) }}
            ></div>
            <span className="text-sm">{user.userName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}