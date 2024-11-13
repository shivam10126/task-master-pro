import React, { useState } from 'react';
import { DotsVerticalIcon, PencilIcon, TrashIcon, UserIcon, ClockIcon, ExclamationIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from 'framer-motion';

function TaskCard({ task, onEdit, onDelete, onAssign }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    High: 'bg-red-100 border-red-300 text-red-800',
    Medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    Low: 'bg-green-100 border-green-300 text-green-800',
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      onClick={handleCardClick}
      className={`p-3 ${statusColors[task.status]} border rounded-lg shadow-sm relative cursor-pointer
                  transition-all duration-300 ease-in-out hover:shadow-md`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-sm font-semibold mb-1 truncate">{task.title}</h3>
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-gray-600 mb-2"
          >
            {task.description}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
        <div className="flex items-center">
          <ClockIcon className="h-3 w-3 mr-1" />
          <span>Due: {task.dueDate.time}</span>
        </div>
        <div className="flex items-center">
          <ExclamationIcon className="h-3 w-3 mr-1" />
          <span>{task.status}</span>
        </div>
      </div>
      {task.assigneeName && (
        <div className="mt-2 text-xs text-gray-600 flex items-center">
          <UserIcon className="h-3 w-3 mr-1" />
          <span className="truncate">{task.assigneeName}</span>
        </div>
      )}
      <div className="absolute top-2 right-2">
        <button
          onClick={handleMenuToggle}
          className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
        >
          <DotsVerticalIcon className="h-5 w-5" />
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden"
            >
              <motion.div className="py-1">
                <motion.button
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                  onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                  onClick={(e) => { e.stopPropagation(); onDelete(task); }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                  onClick={(e) => { e.stopPropagation(); onAssign(task); }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left"
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  Assign
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default TaskCard;