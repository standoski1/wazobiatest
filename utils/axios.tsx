import axios from "axios";
import https from 'https'

export const tokenInstance = (TOKEN:string) => axios.create({
  baseURL: "https://wazobiatst.netlify.app/",
  timeout: 360000,
  httpsAgent: new https.Agent({ keepAlive: true }),
  headers: { 'Content-Type':'application/json', token: `Bearer ${TOKEN}` },
});


export const axiosInstance = axios.create({
    baseURL: "https://wazobiatst.netlify.app/",
    timeout: 360000,
    httpsAgent: new https.Agent({ keepAlive: true }),
});