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
    allocateRoom: async (roomData) => {
     //   return await instance.post('/admin/allocate-room', roomData);
   // },
    {
        console.log('Sending request with data:', roomData);
        try {
            const response = await instance.post('/admin/allocate-room', roomData);
            console.log('Received response:', response);
            return response;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}
};

export default adminServices;
