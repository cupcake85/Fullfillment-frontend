import axios from "axios";
import { CreateOrder } from "./interface/interface";

export const getOrder = async () => {
  try {
    const request = await axios.get("http://192.168.2.57:3000/orders");
    const sortedData = request?.data?.data?.items;
    return sortedData;
  } catch (error) {
    throw error;
  }
};

export const postOrder = async (body: CreateOrder) => {
  try {
    await axios.post("http://192.168.2.57:3000/orders", body);
    return;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id: number) => {
  try {
    const requestOrder = await axios.get(
      "http://192.168.2.57:3000/orders/" + id
    );
    const data = requestOrder.data.data.items;
    return data;
  } catch (error) {
    throw error;
  }
};

export const putOrderById = async (id: number, body: Partial<CreateOrder> ) => {
  try {
    const requestOrder = await axios.put(
      "http://192.168.2.57:3000/orders/" + id,
      body
    );
    const data = requestOrder.data.data.items;
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrderById = async (id: number) => {
  try {
    const requestOrder = await axios.delete(
      "http://192.168.2.57:3000/orders/" + id
    );
  } catch (error) {
    throw error;
  }
};
