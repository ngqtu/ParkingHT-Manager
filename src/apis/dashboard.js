import axios from "customize-axios";
import { authHeader } from "ultils/AuthHeader";

export const apiDashboard = async (token) => {
    return await axios.get('/api/dashboard',
    {
        headers: authHeader(token),
    });
}