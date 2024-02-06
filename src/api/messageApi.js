import axios from "axios";
const baseURL = "https://roomque-server.onrender.com";
const messageInstance  = axios.create({baseURL:baseURL})

export const getMessages = (id) => messageInstance.get(`/message/${id}`)
export const addMessage = (data) => messageInstance.post('/message',data)
