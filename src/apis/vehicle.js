import axios from "customize-axios";

export const apiVehicle = async () => {
    return await axios.get('/vehicle/get-all');
}

export const apiDeleteVehicle = async (vid) => {
    return await axios.put('/vehicle/delete/' + vid, {});
}

export const apiEditVehicle = async (vid) => {
    return await axios.put('/vehicle/updateVehicle', vid);
}
