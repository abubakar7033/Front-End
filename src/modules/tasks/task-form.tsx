'use client';
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import toast from 'react-hot-toast';
import { createTask, getTaskById, updateTask } from "@/api/index";
import { colors } from "@/constant";
import { useParams, useRouter } from "next/navigation";
import Input from "@/component/Input";
import Button from "@/component/Button";
import RadioButton from "@/component/RadioButton";
import { CiCirclePlus } from "react-icons/ci";
import Loader from "@/component/Loader";
import { AxiosError } from "axios";

const taskSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(300, "Title is too long")
        .refine((value) => value.split(/\s+/).length < 250, {
            message: "Title can only have a maximum of 250 words",
        }),
    color: z.enum(
        ["#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#007AFF", "#5856D6", "#FF2D55", "#A2845E"],
        { errorMap: () => ({ message: "Color is required" }) }
    ),
});
type Params = {
    id?: string;
}
const TaskForm: React.FC = () => {
    const params = useParams<Params>();
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formOnSubmit, setFormOnSubmit] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [colorError, setColorError] = useState<string | null>(null);

    const getTaskByIdHandler = async () => {
        try {
            const response = await getTaskById(params?.id);
            if (response) {
                setTitle(response.title);
                setSelectedColor(response.color);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message || "Failed to fetch task details.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setTitleError(null);
        setColorError(null);

        try {
            taskSchema.parse({ title, color: selectedColor });
            setIsLoading(true);

            if (params?.id) {
                await updateTask(params?.id, { title, color: selectedColor });
            } else {
                await createTask({ title, color: selectedColor });
            }

            setFormOnSubmit(true);
            toast.success(`Task ${params?.id ? "successfully updated" : "successfully added"} to your To-Do list!`);
            setTitle('')
            setSelectedColor('')
            setIsLoading(false);
            router.push('/')
        } catch (err) {
            setIsLoading(false);
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    if (error.path[0] === "title") {
                        toast.error(error?.message);
                        setTitleError(error.message);
                    }
                    if (error.path[0] === "color") {
                        toast.error(error?.message);
                        setColorError(error.message);
                    }
                });
            } else {
                if (err instanceof AxiosError) {
                    toast.error(err?.response?.data?.message || "Failed to fetch task details.");
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (titleError) setTitleError(null);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        if (colorError) setColorError(null);
    };

    useEffect(() => {
        if (params?.id) {
            getTaskByIdHandler();
        }
    }, [params?.id]);

    return (
        <div className="w-full max-w-3xl mx-auto p-4 mt-2">
            <div className="my-10">
                <FaArrowLeft
                    className="text-white my-4 text-sm"
                    onClick={() => router.push('/')}
                />
            </div>

            <form onSubmit={handleAddTask}>
                <p className="text-primary my-4 mt-4 text-sm font-bold">Title</p>
                <Input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Ex: Brush your teeth"
                    className="border border-primaryBackground rounded-lg w-full gap-3 bg-primaryBorder text-primaryGray mb-4 outline-none"
                />
                {titleError && <div className="text-red-500 text-sm mb-2">{titleError}</div>}

                <div className="flex gap-2 mb-4 flex-col">
                    <h2 className="text-primary text-sm font-bold">Color</h2>
                    <div className="w-full flex flex-wrap justify-center md:justify-normal gap-4">
                        {colors?.length &&
                            colors.map((color) => (
                                <RadioButton
                                    key={color}
                                    label=""
                                    name="color"
                                    value={color}
                                    checked={selectedColor === color}
                                    onChange={(e) => handleColorSelect(e.target.value)}
                                    color={color}
                                />
                            ))
                        }
                    </div>
                    {colorError && <div className="text-red-500 text-sm mb-2">{colorError}</div>}
                    <Button
                        type="submit"
                        className="mt-8 h-10 bg-secondary px-4 py-2 flex items-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader variant="threeDot" />
                        ) : (
                            <>
                                <span className="text-primaryGray text-sm font-bold">
                                    {formOnSubmit ? "Save" : params.id ? "Update Task" : "Add Task"}
                                </span>
                                <span
                                    className={`text-sm bg-transparent text-primaryGray ${formOnSubmit ? "" : "text-lg flex items-center justify-center"}`}
                                >
                                    {formOnSubmit ? (
                                        <FaCheck className="text-white text-sm" />
                                    ) : (
                                        <CiCirclePlus className="text-primaryGray text-xl" />
                                    )}
                                </span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
