import { Group } from "@/types/api";
import axios from "axios";

const API = axios.create({
    baseURL: `${process.env.DEV_SERVER_URL}/api`,
});

/** Get groups list */
export const getGroups = () => API.get<Group[]>('/group').then(response => response.data);