import instance from "./instance";

const authServices = {
    register: async(data)=>{
        return await instance.post('/auth/register',data);
    },
    login: async(data)=>{
        return await instance.post('/auth/login',data)
    }
}

export default authServices;