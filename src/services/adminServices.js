import instance from "./instance"; 

const adminServices = {
    adminRegister: async (data) => {
        return await instance.post('/admin/register', data);
    },
    adminLogin: async (data) => {
        return await instance.post('/admin/login', data);
    },
    createRoom : async (roomData) => {
        return await instance.post('/admin/create-room',roomData)
    },
};

export default adminServices;
