import axios, { AxiosInstance } from "axios";

const serverURL = import.meta.env.VITE_API_SERVER_URL;
interface ServiceEndpoints {
  [key: string]: number;
}

const createServiceApi = (service: string): AxiosInstance => {
  const portMap: ServiceEndpoints = {
    record: 32701,
    user: 31338,
    video: 30077,
    // 다른 서비스들의 포트 번호 추가
  };

  const servicePort = portMap[service];
  const serviceEndpoint = `${serverURL}:${servicePort}`;
  return axios.create({
    baseURL: serviceEndpoint,
  });
};

interface ClientAPI {
  [key: string]: AxiosInstance;
}

const clientApi: ClientAPI = {
  record: createServiceApi("record"),
  user: createServiceApi("user"),
  video: createServiceApi("video"),
  // 다른 서비스들 추가
};

export default clientApi;
