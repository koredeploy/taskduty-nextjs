"use client";

import { RiArrowLeftSLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface FormData {
  taskTitle: string;
  description: string;
  tags: string;
}

const EditTask: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSingleTask = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`/api/tasks/${id}`);
      if (res.status === 200) {
        // Pre-fill the form with the fetched data
        setValue("taskTitle", res.data.data.taskTitle);
        setValue("tags", res.data.data.tags);
        setValue("description", res.data.data.description);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      setError("Failed to fetch task details.");
    }
  };

  useEffect(() => {
    if (id) {
      getSingleTask();
    }
  }, [id]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await axios.put(`/api/tasks/${id}`, data);
      if (res.status === 200) {
        router.push('/alltask'); // Redirect to tasks list after successful update
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the task.");
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return <div>No task ID provided</div>;
  }

  return (
    <div className='w-[80%] container mx-auto'>
        <div className="flex flex-row gap-2 items-center">
          <RiArrowLeftSLine onClick={()=> router.back()} className="text-4xl font-semibold cursor-pointer" />
        <h1 className='text-4xl font-semibold py-10 flex items-center'> New Task</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
        <div className='relative'>
          <label className='text-gray-400 absolute z-10 left-8 -top-5 bg-white text-2xl'>Task Title</label>
          <input
            className='w-full border p-5 rounded-md px-8 relative'
            {...register("taskTitle", {
              required: "Task Title is required"
            })}
            type="text"
            placeholder="E.g Project Defence, Assignment..."
          />
        </div>
        {errors.taskTitle && <p className='text-red-600 font-semibold'>{errors.taskTitle.message}</p>}
        
        <div className='relative'>
          <label className='text-gray-400 absolute z-10 left-8 -top-4 bg-white text-2xl'>Description</label>
          <textarea
            {...register("description", {
              required: "Description is required"
            })}
            className='border p-5 rounded-md px-8 relative pb-40 w-full'
            placeholder="Briefly describe your task..."
          />
        </div>
        {errors.description && <p className='text-red-600 font-semibold'>{errors.description.message}</p>}
        
        <div className='relative'>
          <label className='absolute z-10 left-8 -top-4 text-gray-500 bg-white text-2xl px-3'>Tags</label>
          <div className='flex items-center justify-between relative'>
            <select
              className='border p-5 text-gray-400 bg-white rounded-md px-8 relative w-full appearance-none'
              {...register("tags", {
                required: "Tags is required"
              })}
            >
              <option value="">Select a tag</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
            </select>
            <IoIosArrowDown className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none' />
          </div>
        </div>
        {errors.tags && <p className='text-red-600 font-semibold'>{errors.tags.message}</p>}
        
        <button type='submit' className='bg-purple-800 text-white font-bold w-full my-10 p-5 rounded-md' disabled={loading}>
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
      {error && <p className='text-red-600 font-semibold'>{error}</p>}

      <div className="flex justify-center items-center pb-8">
        <button className='text-purple-800 text-center underline' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>back to top</button>
      </div>
    </div>
  );
}

export default EditTask;