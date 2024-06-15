import axios from "customize-axios";
import { authHeader } from "ultils/AuthHeader";

export const apigetallReport = async () => {
    return await axios.get('/report/get-all');
}

export const apiCountReportUnread = async (token) => {
    return await axios.get('/report/get-count-unread/0',
    {
        headers: authHeader(token),
    });
}

export const apiListReportUnread = async (token) => {
    return await axios.get('/report/get-unread/0',
    {
        headers: authHeader(token),
    });
}

export const apiUpdateReport = async (report) => {
    return await axios.put('/report/update', report);
}