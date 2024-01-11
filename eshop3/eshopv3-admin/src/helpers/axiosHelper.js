import { axiosInstance } from "./axiosInstance";

export async function axiosPost(url, data, config = {}) {
  try {
    const response = await axiosInstance.post(url, data, { ...config });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function axiosGet(url, config = {}) {
  try {
    const response = await axiosInstance.get(url, { ...config });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function axiosPut(url, data, config = {}) {
  try {
    const response = await axiosInstance.put(url, { ...data }, { ...config });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function axiosPatch(url, data, config = {}) {
  try {
    const response = await axiosInstance.patch(url, { ...data }, { ...config });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function axiosDel(url, config = {}) {
  try {
    const response = await axiosInstance.delete(url, { ...config });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
