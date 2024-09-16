import instance from "./instance"; 

const adminServices = {
    adminRegister: async (data) => {
        return await instance.post('/admin/register', data);
    },
    adminLogin: async (data) => {
        return await instance.post('/admin/login', data);
    },
};

export default adminServices;
