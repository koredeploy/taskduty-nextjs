
"use client";
import axios from "axios";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";


interface Task {
  _id: string;
  title: string;
  description: string;
  tags: string;
}

interface ApiResponse {
  data: Task[];
}

const AllTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false) 
  const fetchAllTasks = async () => {
    try {
      setLoading(true)
      const res = await axios.get<ApiResponse>("/api/tasks");
      console.log(res);
      if (res.status === 200) {
        setTasks(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const deleteTask = async (_id: string)=>{
    try {
      const res = await axios.delete(`api/tasks/${_id}`)
      fetchAllTasks()
    } catch (error) {
      
    }
  }



  const showBackToTopBtn = tasks.length > 2 ? "flex" : "hidden" 

  if(loading){
    return(
      <div className=" flex justify-center items-center h-screen text-center ">
        
<div className="w-full gap-x-2 flex justify-center items-center">
  <div
    className="w-5 bg-[#d991c2]  h-5 rounded-full animate-bounce"
  ></div>
  <div
    className="w-5  h-5 bg-[#9869b8] rounded-full animate-bounce"
  ></div>
  <div
    className="w-5 h-5  bg-[#6756cc] rounded-full animate-bounce"
  ></div>
</div>

      </div>
    )
  }


  return (
    <div className="w-10/12 container mx-auto ">
      <div className="flex flex-row py-10 justify-between items-center font-semibold">
        <div>
          <h1 className="text-4xl">My Tasks</h1>
        </div>
        <div>
          <Link href="/createtask" className="text-purple-800">
            {" "}
            + Add New Task
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10">
        {tasks.map((task) => (
          <div
            key={task._id }
            className="border border-gray-400 rounded-md p-4"
          >
            <div className="flex flex-row justify-between items-center font-semibold py-5 border-b-gray-400 border-b">
              <div>
                <span className={task.tags === "urgent" ? "text-red-400" : "text-green-500"}>{task.tags.toUpperCase()}</span>
              </div>
              <div className="flex flex-row gap-2 lg:gap-5">
                <Link href={`alltask/${task._id}`} className="bg-purple-800 text-white py-2 px-6 rounded-md flex items-center gap-2">
                  <FiEdit />
                  <span className="hidden md:inline">Edit</span>
                </Link>
                <button  onClick={() => deleteTask(task._id)} className="text-purple-800 border-purple-800 border py-2 px-6 rounded-md flex items-center gap-2">
                  <RiDeleteBinLine />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </div>
            </div>
            <div className="py-3">
              <h1 className="text-2xl font-medium lg:text-3xl pt-3 pb-3">
                {task.title}
              </h1>
              <p>{task.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={` ${showBackToTopBtn} justify-center items-center pt-4 pb-8`}>
      <button className='text-purple-800 text-center underline' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>back to top</button>
      </div>
    </div>
  );
};

export default AllTask;
