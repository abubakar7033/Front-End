'use client';
import React, { useEffect, useState } from "react";
import TaskDetails from "./task-details";
import toast from "react-hot-toast";
import { deleteTask, getTask, updateTask } from "@/api/index";
import { Task } from "@/type/task";
import { useRouter } from "next/navigation";
import Button from "@/component/Button";
import { AxiosError } from "axios";

const TodoApp: React.FC = () => {
    const router = useRouter()
    const [tasks, setTasks] = useState<Task[]>([]);
    const [todoList, setTodoList] = useState<object>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getAllTask = async (page: number = 1, limit: number = 10) => {
        try {
            setIsLoading(true)

            const response = await getTask(page, limit);
            setTasks(response?.tasks)
            setTodoList(response)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(true)
        }
    };
    useEffect(() => {
        getAllTask();
    }, []);

    const handleToggleComplete = async (taskId: string, currentStatus: boolean) => {
        try {
            let response = await updateTask(taskId, { completed: currentStatus });
            setTasks([]);
            await getAllTask();

            toast.success(`Task successfully marked as ${currentStatus ? "completed" : "incomplete"}!`);
        } catch (error) {
        }
    };

    const onDeleteHandler = async (taskId: string) => {
        try {
            await deleteTask(taskId)
            getAllTask()
            toast.success("Task successfully deleted to your To-Do list!")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message || "Failed to fetch task details.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }

    }
    return (
        <div className="w-full relative top-[-45px]">
            <div className="w-full max-w-3xl mx-auto py-2 px-8 mb-6">
                <Button
                    className="w-full flex gap-2 py-2 bg-secondary font-semibold rounded-md transition-all items-center justify-center"
                    onClick={() => router.push('/task/create')}
                >
                    <span className=" text-primaryGray text-sm font-bold">Create Task</span>
                    <span className="bg-transparent text-primaryGray border rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold">+</span>
                </Button>
                <TaskDetails tasks={tasks} todoList={todoList} onToggleComplete={handleToggleComplete} onDeleteHandler={onDeleteHandler} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default TodoApp;
