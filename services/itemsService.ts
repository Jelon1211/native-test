import { IApiConfig, IItem } from "@/types/itemservice";
import axios, { AxiosInstance, AxiosResponse } from "axios";

class ItemsService {
  private axiosInstance: AxiosInstance;

  constructor(config: IApiConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
    });
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    params?: any,
    data?: any
  ): Promise<T> {
    const fullUrl = `${this.axiosInstance.defaults.baseURL}${url}`;
    console.log(
      `Request URL: ${fullUrl}`,
      params ? `Params: ${JSON.stringify(params)}` : "",
      data ? `Data: ${JSON.stringify(data)}` : ""
    );

    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>({
        method,
        url,
        params,
        data,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }

  public async getItems(
    skip: number = 0,
    limit: number = 100,
    order: number = 1,
    sort: string = "id"
  ): Promise<any> {
    const params = { skip, limit, order, sort };
    return this.request<any>("GET", "/items", params);
  }

  public async getItemById(itemId: string): Promise<any> {
    return this.request<any>("GET", `/items/${itemId}`);
  }

  public async createItem(itemData: IItem): Promise<any> {
    return this.request<any>("POST", "/items", {}, itemData);
  }

  public async updateItem(itemId: string, itemData: IItem): Promise<any> {
    return this.request<any>("PUT", `/items/${itemId}`, {}, itemData);
  }

  public async deleteItem(itemId: string): Promise<any> {
    return this.request<any>("DELETE", `/items/${itemId}`);
  }
}

export default ItemsService;
