import { httpAxios } from "@/helper/httpsHelper";

export async function addTask(task) {
  const result = await httpAxios
    .post("/api/works", task)
    .then((response) => response.data);
    return result
}

export async function getTaskOfUser(userId){
  const result = await httpAxios
    .get(`/api/users/${userId}/works`)
    .then((response) => response.data);
    return result
}

export async function DeleteTask(taskId){
  const result = await httpAxios
    .delete(`/api/works/${taskId}`)
    .then((response) => response.data);
    return result
}