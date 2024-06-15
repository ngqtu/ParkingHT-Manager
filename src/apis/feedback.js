import axios from "customize-axios";
import { authHeader } from "ultils/AuthHeader";

export const apigetFeedback = async () => {
  return await axios.get('/feedback/get-all');
}

export const apiUpdateFeedback = async (feedbackId,feedback) => {
  return await axios.put('/feedback/update/'+feedbackId, feedback);
}

export const apiCountFeedbackUnread = async (token) => {
  return await axios.get('/feedback/get-count-unread/0',
    {
      headers: authHeader(token),
    });
}

export const apiListFeedbackUnread = async (token) => {
  return await axios.get('/feedback/get-unread/0',
    {
      headers: authHeader(token),
    });
}