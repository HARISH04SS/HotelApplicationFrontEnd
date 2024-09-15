import instance from "./instance";

const authServices = {
    register: async(data)=>{
        return await instance.post('/auth/register',data);
    }
}

export default authServices;