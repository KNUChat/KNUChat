import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "@store/useAuthStore";

const serverURL = import.meta.env.VITE_API_SERVER_URL;
interface ServiceEndpoints {
  [key: string]: number;
}

const CreateServiceApi = (service: string): AxiosInstance => {
  const portMap: ServiceEndpoints = {
    record: 32102,
    user: 32100,
    video: 32408,
    // 다른 서비스들의 포트 번호 추가
  };

  const servicePort = portMap[service];
  const serviceEndpoint = `${serverURL}:${servicePort}`;
  const api = axios.create({
    baseURL: serviceEndpoint,
  });

  // Interceptor를 사용하여 accessToken을 요청에 추가
  // const { authToken } = useAuthStore();
  const authToken = localStorage.getItem("authToken");
  console.log(authToken);
  const accessToken = authToken;
  api.interceptors.request.use((config) => {
    config.headers.Authorization = accessToken;
    return config;
  });
  return api;
};

interface ClientAPI {
  [key: string]: AxiosInstance;
}

const clientApi: ClientAPI = {
  record: CreateServiceApi("record"),
  user: CreateServiceApi("user"),
  video: CreateServiceApi("video"),
};

export default clientApi;
