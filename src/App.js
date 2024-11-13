import React, { useState } from "react";
import { PlusIcon, DownloadIcon, UserCircleIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/solid';
import TaskTimeline from './components/TaskTimeline';
import CompletedTasksList from './components/CompletedTasksList';
import Leaderboard from './components/Leaderboard';
import Modal from './components/Modal';
import EditTaskModal from './components/EditTaskModal';
import DeleteTaskModal from './components/DeleteTaskModal';
import AssignTaskModal from './components/AssignTaskModal';

const initialData = {
  "companyName": "Tech Solutions Inc.",
  "userName": "John Doe",
  "tasks": [
    {
      "title": "Develop Login Page",
      "description": "Create a responsive login page with authentication.",
      "createdAt": { "date": "2024-11-01", "time": "09:00" },
      "status": "High",
      "dueDate": { "date": "2024-11-07", "time": "17:00" }
    },
    {
      "title": "Develop sign up Page",
      "description": "Create a responsive signup page with authentication.",
      "createdAt": { "date": "2024-11-01", "time": "01:00" },
      "status": "High",
      "dueDate": { "date": "2024-11-07", "time": "02:00" }
    },
    {
      "title": "Implement Drag-and-Drop",
      "description": "Add drag-and-drop functionality to the Kanban board.",
      "createdAt": { "date": "2024-11-03", "time": "10:30" },
      "status": "Medium",
      "dueDate": { "date": "2024-11-10", "time": "12:00" }
    },
    {
      "title": "Write Documentation",
      "description": "Document the app's functionality and user guide.",
      "createdAt": { "date": "2024-11-05", "time": "11:45" },
      "status": "Low",
      "dueDate": { "date": "2024-11-15", "time": "15:30" }
    },
    {
      "title": "Design Kanban Board UI",
      "description": "Design the user interface for the Kanban board layout.",
      "createdAt": { "date": "2024-10-20", "time": "08:15" },
      "status": "High",
      "dueDate": { "date": "2024-10-25", "time": "17:00" }
    },
    {
      "title": "Set Up Project Repository",
      "description": "Initialize and set up the GitHub repository for the project.",
      "createdAt": { "date": "2024-10-15", "time": "07:30" },
      "status": "Medium",
      "dueDate": { "date": "2024-10-18", "time": "15:00" }
    },
    {
      "title": "Database Integration",
      "description": "Connect app with a database for data persistence.",
      "createdAt": { "date": "2024-11-02", "time": "13:00" },
      "status": "High",
      "dueDate": { "date": "2024-11-12", "time": "17:30" }
    },
    {
      "title": "Implement Notification System",
      "description": "Develop a notification system for task updates.",
      "createdAt": { "date": "2024-11-04", "time": "09:30" },
      "status": "Medium",
      "dueDate": { "date": "2024-11-15", "time": "12:00" }
    }
  ],
  "completedTasks": [
    {
      "title": "Design Kanban Board UI",
      "description": "Design the user interface for the Kanban board layout.",
      "assigneeName": "Alice Johnson",
      "createdAt": { "date": "2024-10-20", "time": "08:15" },
      "assignedAt": { "date": "2024-10-20", "time": "09:00" },
      "completedAt": { "date": "2024-10-25", "time": "16:45" },
      "status": "High",
      "dueDate": { "date": "2024-10-25", "time": "17:00" }
    },
    {
      "title": "Set Up Project Repository",
      "description": "Initialize and set up the GitHub repository for the project.",
      "assigneeName": "John Doe",
      "createdAt": { "date": "2024-10-15", "time": "07:30" },
      "assignedAt": { "date": "2024-10-16", "time": "09:00" },
      "completedAt": { "date": "2024-10-18", "time": "14:00" },
      "status": "Medium",
      "dueDate": { "date": "2024-10-18", "time": "15:00" }
    },
    {
      "title": "Implement User Authentication",
      "description": "Add authentication to secure the app.",
      "assigneeName": "Bob Smith",
      "createdAt": { "date": "2024-10-12", "time": "10:00" },
      "assignedAt": { "date": "2024-10-12", "time": "11:00" },
      "completedAt": { "date": "2024-10-14", "time": "15:30" },
      "status": "High",
      "dueDate": { "date": "2024-10-14", "time": "16:00" }
    },
    {
      "title": "Write API Documentation",
      "description": "Document all API endpoints and usage.",
      "assigneeName": "Alice Johnson",
      "createdAt": { "date": "2024-10-10", "time": "08:45" },
      "assignedAt": { "date": "2024-10-11", "time": "09:00" },
      "completedAt": { "date": "2024-10-13", "time": "12:30" },
      "status": "Medium",
      "dueDate": { "date": "2024-10-13", "time": "13:00" }
    },
    {
      "title": "Optimize Database Queries",
      "description": "Improve the efficiency of database queries.",
      "assigneeName": "John Doe",
      "createdAt": { "date": "2024-10-01", "time": "14:20" },
      "assignedAt": { "date": "2024-10-01", "time": "15:00" },
      "completedAt": { "date": "2024-10-05", "time": "17:00" },
      "status": "Low",
      "dueDate": { "date": "2024-10-06", "time": "17:00" }
    }
  ],
  "assignedTasks": [
    {
      "title": "Develop Dashboard Layout",
      "description": "Create the layout for the main dashboard screen.",
      "assigneeName": "Emma Green",
      "createdAt": { "date": "2024-11-05", "time": "10:00" },
      "assignedAt": { "date": "2024-11-06", "time": "09:15" },
      "status": "High",
      "dueDate": { "date": "2024-11-12", "time": "17:00" }
    },
    {
      "title": "Configure Deployment Pipeline",
      "description": "Set up CI/CD pipeline for automated deployment.",
      "assigneeName": "Oliver Brown",
      "createdAt": { "date": "2024-11-02", "time": "13:30" },
      "assignedAt": { "date": "2024-11-03", "time": "09:00" },
      "status": "High",
      "dueDate": { "date": "2024-11-08", "time": "18:00" }
    },
    {
      "title": "Develop Notification System",
      "description": "Implement notification alerts for task updates.",
      "assigneeName": "Sophia Miller",
      "createdAt": { "date": "2024-11-01", "time": "08:45" },
      "assignedAt": { "date": "2024-11-02", "time": "10:00" },
      "status": "Medium",
      "dueDate": { "date": "2024-11-09", "time": "12:00" }
    },
    {
      "title": "Implement Task Filtering",
      "description": "Add filters for task priority and due dates.",
      "assigneeName": "Liam Thompson",
      "createdAt": { "date": "2024-11-04", "time": "15:15" },
      "assignedAt": { "date": "2024-11-05", "time": "09:30" },
      "status": "Low",
      "dueDate": { "date": "2024-11-13", "time": "17:00" }
    },
    {
      "title": "User Profile Page Design",
      "description": "Design the UI for the user profile page.",
      "assigneeName": "Ava Wilson",
      "createdAt": { "date": "2024-11-03", "time": "14:00" },
      "assignedAt": { "date": "2024-11-04", "time": "11:00" },
      "status": "Medium",
      "dueDate": { "date": "2024-11-10", "time": "16:00" }
    },
    {
      "title": "Research Accessibility Standards",
      "description": "Gather information on WCAG guidelines.",
      "assigneeName": "James Lee",
      "createdAt": { "date": "2024-11-07", "time": "10:45" },
      "assignedAt": { "date": "2024-11-08", "time": "08:30" },
      "status": "Low",
      "dueDate": { "date": "2024-11-15", "time": "15:30" }
    },
    {
      "title": "Implement Dark Mode Toggle",
      "description": "Add a dark mode toggle to settings.",
      "assigneeName": "Ella Perez",
      "createdAt": { "date": "2024-10-30", "time": "11:00" },
      "assignedAt": { "date": "2024-10-31", "time": "09:15" },
      "status": "High",
      "dueDate": { "date": "2024-11-07", "time": "18:00" }
    },
    {
      "title": "Set Up Database Schema",
      "description": "Define schema for tasks, users, and projects.",
      "assigneeName": "Lucas Roberts",
      "createdAt": { "date": "2024-10-29", "time": "10:00" },
      "assignedAt": { "date": "2024-10-30", "time": "08:45" },
      "status": "High",
      "dueDate": { "date": "2024-11-05", "time": "16:00" }
    },
    {
      "title": "Unit Testing for API Endpoints",
      "description": "Write unit tests for main API routes.",
      "assigneeName": "Mia Sanchez",
      "createdAt": { "date": "2024-10-25", "time": "09:15" },
      "assignedAt": { "date": "2024-10-26", "time": "10:00" },
      "status": "Medium",
      "dueDate": { "date": "2024-11-01", "time": "15:00" }
    }
  ],
  "users": [
    {
      "userName": "Emma Green",
      "totalTasksCompleted": 15
    },
    {
      "userName": "Oliver Brown",
      "totalTasksCompleted": 12
    },
    {
      "userName": "Sophia Miller",
      "totalTasksCompleted": 10
    },
    {
      "userName": "Liam Thompson",
      "totalTasksCompleted": 20
    },
    {
      "userName": "Ava Wilson",
      "totalTasksCompleted": 8
    },
    {
      "userName": "James Lee",
      "totalTasksCompleted": 18
    },
    {
      "userName": "Ella Perez",
      "totalTasksCompleted": 14
    },
    {
      "userName": "Lucas Roberts",
      "totalTasksCompleted": 16
    },
    {
      "userName": "Mia Sanchez",
      "totalTasksCompleted": 9
    },
    {
      "userName": "William Clark",
      "totalTasksCompleted": 11
    },
    {
      "userName": "Isabella Martin",
      "totalTasksCompleted": 17
    },
    {
      "userName": "Henry Scott",
      "totalTasksCompleted": 13
    }
  ]
};

function App() {
  const [boardData, setBoardData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'Medium',
    dueDate: '',
    dueTime: ''
  });

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...");
  };

  const handleCreateTask = () => {
    const now = new Date();
    const createdAt = {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].slice(0, 5)
    };
    const updatedTasks = [
      ...boardData.tasks,
      {
        ...newTask,
        createdAt,
        dueDate: {
          date: newTask.dueDate,
          time: newTask.dueTime
        }
      }
    ];
    setBoardData({ ...boardData, tasks: updatedTasks });
    setNewTask({ title: '', description: '', status: 'Medium', dueDate: '', dueTime: '' });
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleAssignTask = (task) => {
    setSelectedTask(task);
    setIsAssignModalOpen(true);
  };

  const handleSaveEditedTask = (editedTask) => {
    const updatedTasks = boardData.tasks.map(task =>
      task === selectedTask ? editedTask : task
    );
    setBoardData({ ...boardData, tasks: updatedTasks });
    setIsEditModalOpen(false);
  };

  const handleConfirmDeleteTask = () => {
    const updatedTasks = boardData.tasks.filter(task => task !== selectedTask);
    setBoardData({ ...boardData, tasks: updatedTasks });
    setIsDeleteModalOpen(false);
  };

  const handleConfirmAssignTask = (task, userName) => {
    const now = new Date();
    const assignedAt = {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].slice(0, 5)
    };
    const updatedTask = { ...task, assigneeName: userName, assignedAt };
    const updatedUnassignedTasks = boardData.tasks.filter(t => t !== task);
    const updatedAssignedTasks = [...boardData.assignedTasks, updatedTask];
    setBoardData({
      ...boardData,
      tasks: updatedUnassignedTasks,
      assignedTasks: updatedAssignedTasks
    });
    setIsAssignModalOpen(false);
  };

  return (
      <div className="p-4 max-w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{boardData.companyName} Task Board</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {boardData.userName}</span>
            <UserCircleIcon className="w-8 h-8 text-gray-600" />
          </div>
        </div>
  
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Task
            </button>
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150 ease-in-out"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
              {showLeaderboard ? (
                <>
                  <ClockIcon className="w-5 h-5 mr-2" />
                  Show Timelines
                </>
              ) : (
                <>
                  <ChartBarIcon className="w-5 h-5 mr-2" />
                  Show Leaderboard
                </>
              )}
            </button>
          </div>
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150 ease-in-out"
            onClick={handleDownloadPDF}
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        </div>
  
          <div className={`${showLeaderboard ? "block" :"hidden"}  mt-8 `}>
            <Leaderboard showLeaderboard={showLeaderboard}  users={boardData.users} />
          </div>

          <div className={`${showLeaderboard ? "hidden" :"block"} space-y-8 transition-all duration-200  `}>
            <TaskTimeline 
              title="Tasks" 
              tasks={boardData.tasks} 
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onAssignTask={handleAssignTask}
            />
            <TaskTimeline 
              title="Assigned Tasks" 
              tasks={boardData.assignedTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onAssignTask={handleAssignTask}
            />
            <CompletedTasksList tasks={boardData.completedTasks} />
          </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        newTask={newTask}
        setNewTask={setNewTask}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={selectedTask}
        onSave={handleSaveEditedTask}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteTask}
      />

      <AssignTaskModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        task={selectedTask}
        onAssign={handleConfirmAssignTask}
        users={boardData.users}
      />
    </div>
  );
}

export default App;