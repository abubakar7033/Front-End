import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
if (!backendUrl) {
  throw new Error("BACKEND_URL environment variable is not defined");
}
type CreateTask = {
  title: string;
  color: string;
};

export const createTask = async ({ title, color }: CreateTask) => {
  const response = await axios.post(`${backendUrl}/api/tasks`, {
    title,
    color,
  });
  return response.data;
};

export const getTask = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get(`${backendUrl}/api/tasks`, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getTaskById = async (id: string | undefined) => {
  const response = await axios.get(`${backendUrl}/api/tasks/${id}`);
  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: { completed?: boolean; title?: string; color?: string }
) => {
  const response = await axios.put(`${backendUrl}/api/tasks/${id}`, taskData);
  return response.data;
};
export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${backendUrl}/api/tasks/${id}`);
  return response.data;
};
