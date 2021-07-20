import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:  `${window._env_.ENV_API_BASE_URL}`
 });

 axiosInstance.interceptors.request.use(
    async config => {
       const token = localStorage.getItem("x-access-token");
       const tenantId = localStorage.getItem("x-tenant-id");
       const channelId = localStorage.getItem("x-channel-id");
       config.headers = {
          'x-access-token': token,
          'Content-Type': 'application/json',
          'x-channel-id': channelId,
          "x-tenant-id": tenantId,
       }
       return config;
    },
    error => {
       Promise.reject(error?.response)
    });


    axiosInstance.interceptors.response.use((response) => {
        return response
     }, async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
           console.log('----------------TOKEN EXPIRED-----------------------')
           originalRequest._retry = true;
           const response = await refreshToken();
           if (response) {
              setToken(response.headers);
              console.log('----------------TOKEN REFRESHED -----------------------')
              return axiosInstance(originalRequest);
           }else{
              window.location.replace('/loginfailed')
           }
          
        }
        return Promise.reject(error?.response);
     });

     const setToken = (headers) => {
        localStorage.setItem('x-access-token', headers['x-access-token'])
        localStorage.setItem('x-refresh-token', headers['x-refresh-token'])
     }

     const refreshToken = async () => {
        try {
           const refreshToken = localStorage.getItem("x-refresh-token");
           console.log('----------------REFRESHING TOKEN -----------------------')
           const header = {
              'x-refresh-token': refreshToken,
              'Content-Type': 'application/json',
           }
           return await axiosInstance.post('/refresh-token', null, { headers: header })
        } catch (error) {
     
        }
     }

    class NetworkService {

        onPost(url, model, config) {
           return axiosInstance.post(url, model);
        }
        onPut(url, model, config) {
           return axiosInstance.put(url, model);
        }
      
        onGet(url, config) {
           return axiosInstance.get(url, config);
        }

        onDel(url, config) {
         return axiosInstance.delete(url, config);
      }
    }
     
     export default new NetworkService();