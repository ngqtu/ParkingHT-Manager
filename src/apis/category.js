import axios from "customize-axios";
import { authHeader } from "ultils/AuthHeader";

export const apiCategoryVehicle = async (token) => {
    return await axios.get('/vehicle-category/get-all',
        {
            headers: authHeader(token),
        });
}

export const apiAllCategory = async () => {
    return await axios.get('/vehicle-category/getAllCategoryD');
}

export const apiDeleteCategoryVehicle = async (cid) => {
    return await axios.put('/vehicle-category/delete/' + cid, {});
}

export const apiCreateCategoryVehicle = async (category) => {
    return await axios.post('/vehicle-category/create', category);
}

export const apiUpdateCategoryVehicle = async (category) => {
    return await axios.put('/vehicle-category/update', category);
}