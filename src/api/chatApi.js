import axios from "axios";
const baseURL = "http://localhost:3001/";
const chatInstance  = axios.create({baseURL:baseURL})

export const userChats = (id) => chatInstance.get(`/chat/${id}`)
export const getOwner = (id) => chatInstance.get(`/chat/ownerData/${id}`)
export const getUser = (id) => chatInstance.get(`/chat/userData/${id}`)