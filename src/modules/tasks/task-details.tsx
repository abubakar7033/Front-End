import TaskList from "./tasks-list";
import Image from "next/image";
import clipBoard from '../../../public/Clipboard.svg'
import { Task, TaskListProps } from "@/type";
import Loader from "@/component/Loader";


const TaskDetails: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDeleteHandler, isLoading }) => {
    const completedTasks: 0 | Task[] = tasks?.length && tasks?.filter((task) => task?.completed);

    return (
        <div className="w-full mt-4">
            <div className={`w-full mb-4 flex items-center justify-between ${tasks.length === 0 ? 'border-b border-primaryBackground' : ''} pb-2`}>
                <p className="text-primary flex items-center gap-2">
                    <span className="text-primary text-sm font-bold">Task</span> <span className="text-xs bg-primaryBackground text-lightGray  w-4 h-4  rounded-full px-2.5 flex items-center justify-center ">{tasks?.length}</span>
                </p>
                <p className="flex items-center justify-between gap-2 text-primary">
                    <span className="text-primaryPurple text-sm font-bold">Completed</span>
                    <span className="w-full text-xs bg-primaryBackground px-2 text-lightGray rounded-full h-4 flex items-center justify-center">
                        {completedTasks && completedTasks?.length || 0} de {tasks?.length || 0}
                    </span>
                </p>

            </div>
            <div className="w-full ">

                {
                    isLoading ? (
                        <div className="w-full flex items-center justify-center">
                            <Loader variant="threeDot" className="text-white text-2xl" />
                        </div>
                    ) : tasks?.length > 0 ? (
                        tasks.map((task) => (
                            <TaskList
                                key={task.id}
                                task={task}
                                onToggleComplete={onToggleComplete}
                                onDeleteHandler={onDeleteHandler}
                            />
                        ))
                    ) :
                        <div className="flex flex-col items-center justify-center">
                            <Image src={clipBoard} alt="error" className="mt-6 mb-4" />
                            <p className="text-gray-500 mb-4 text-center">
                                You don't have any tasks registered yet.
                            </p>
                            <p className="text-gray-500 mb-4 text-center">Create tasks and organize your to-do items.</p>
                        </div>
                }

            </div>
        </div>
    );
};

export default TaskDetails;
