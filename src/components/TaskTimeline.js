import React from 'react';
import TaskCard from './TaskCard';

function TaskTimeline({ title, tasks, onEditTask, onDeleteTask, onAssignTask }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold p-4 bg-gray-50 border-b border-gray-200">{title}</h2>
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full">
          {hours.map((hour) => (
            <div key={hour} className="flex-shrink-0 w-64 border-r border-gray-200 last:border-r-0">
              <div className="sticky top-0 z-1 bg-gray-50 text-sm font-medium text-gray-500 p-2 border-b border-gray-200">
                {`${hour.toString().padStart(2, '0')}:00`}
              </div>
              <div className="p-2 space-y-3 min-h-[200px]">
                {tasks.filter(task => {
                  const taskHour = title === "Tasks" 
                    ? parseInt(task.createdAt.time.split(':')[0]) 
                    : parseInt(task.assignedAt.time.split(':')[0]);
                  return taskHour === hour;
                }).map((task, index) => (
                  <TaskCard 
                    key={index} 
                    task={task} 
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onAssign={onAssignTask}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskTimeline;