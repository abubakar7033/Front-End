import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { TaskItemProps } from "@/type";
import CheckBoxButton from "@/component/CheckButton";



const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDeleteHandler }) => {
    const currentStatus = !(task?.completed)
    const router = useRouter()
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        onToggleComplete(e.target.value, currentStatus);
    };

    return (

        <div className={`flex items-center justify-between p-1 rounded bg-${task.color}-500`}

        >
            <div className="flex  w-full gap-3 p-3 border border-primaryBackground bg-primaryBorder rounded-lg">
                <CheckBoxButton
                    label=""
                    name={`task-status-${task?.id}`}
                    value={task?.id}
                    checked={currentStatus}
                    onChange={handleToggle}
                    color={currentStatus === false ? 'bg-primaryPurple' : 'transparent'}
                    className={`w-4 h-4 mt-1 rounded-full cursor-pointer flex justify-center items-center ${currentStatus === false ? 'bg-primaryPurple' : 'border-2 border-primary'
                        }`}
                >
                    {currentStatus === false && <FaCheck className="text-white text-[10px]" />}
                </CheckBoxButton>
                <p
                    className={`text-sm  cursor-pointer font-normal flex-1 text-primaryGray ${task.completed ? "line-through text-secondaryGray" : ""
                        }`}
                    style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap",
                    }}
                    onClick={() => router.push(`/task/update/${task?.id}`)}
                >
                    {task.title}
                </p>

                <RiDeleteBinLine
                    className="text-secondaryGray mt-1 hover:text-red-500 cursor-pointer transition"
                    onClick={() => onDeleteHandler(task.id)}
                />
            </div>
        </div>
    );
};

export default TaskItem;
