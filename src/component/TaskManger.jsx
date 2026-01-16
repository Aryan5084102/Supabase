import React, { useEffect, useState } from 'react';
import {supabase} from '../supabase-client'

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title:  '', description: '' });

  const onChangeHandler = (e) =>{
    setNewTask({...newTask, [e.target.name] : e.target.value})
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    const {data, error} = await supabase.from('task').insert(newTask).select().single()
    console.log(data);
    setNewTask({ title: '', description: '' })

    fetchTasks()
  }

  const deleteTask = async(id) =>{
    const {data, error} = await supabase.from('task').delete().eq('id', id)
  }

  // const editTask = async(id) =>{
  //   const {data, error} = await supabase.from('task').select('*').eq('id', id)
  //   setNewTask({title: data[0].title, description: data[0].description})
  // }

  const fetchTasks = async () =>{
    const {data, error} = await supabase.from('task').select('*').order('created_at', {ascending: true})
    setTasks(data)
  }

  const signOut = async () =>{
    const {error} = await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
        
        <form onSubmit={submitHandler} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Task Title"
            name='title'
            value={newTask.title}
            onChange={onChangeHandler}
            className="w-full p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <textarea
            placeholder="Task Description"
            rows="4"
            name='description'
            value={newTask.description}
            onChange={onChangeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all font-mono text-sm"
          />
          <button  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Add Task
          </button>
        </form>
        
        <button onClick={signOut} className='bg-red-500 float-right cursor-pointer text-white text-base font-bold py-3 px-4 rounded shadow-sm '>Sign out</button>

        <div className="space-y-4">
          {tasks?.map((task) => (
            <div key={task.id} className="border border-gray-100 bg-gray-50 rounded-lg p-5 relative group shadow-sm">
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => editTask(task.id)} className="bg-amber-400 hover:bg-amber-500 text-white text-xs font-bold py-1 px-4 rounded shadow-sm transition-colors">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-3 rounded shadow-sm transition-colors">
                  Delete
                </button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {task?.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {task?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TaskManager;