import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

function AssignTaskModal({ isOpen, onClose, task, onAssign, users }) {
  const [selectedUser, setSelectedUser] = useState('');

  const handleAssign = () => {
    if (selectedUser) {
      onAssign(task, selectedUser);
      onClose();
    }
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Assign Task
              </Dialog.Title>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <XIcon className="h-6 w-6" />
              </button>
              {task ? (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Task: {task.title}</p>
                  <p className="text-sm text-gray-500">Description: {task.description}</p>
                  <p className="text-sm text-gray-500">Due Date: {task.dueDate?.date} {task.dueDate?.time}</p>
                  <p className="text-sm text-gray-500">Created At: {task.createdAt?.date} {task.createdAt?.time}</p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-500">Loading task details...</p>
              )}
              <div className="mt-4">
                <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
                  Assign to:
                </label>
                <select
                  id="user-select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.userName} value={user.userName}>
                      {user.userName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  onClick={handleAssign}
                >
                  Assign Task
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AssignTaskModal;
