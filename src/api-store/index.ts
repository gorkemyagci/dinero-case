import type { RecordType } from "@/lib/types";
import { removeUndefined } from "@/lib/utils/modify";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export const SERVICE_URL = import.meta.env.VITE_API_URL;

export class CustomError extends Error {
  public info: any;

  constructor(message: string, info?: any) {
    super(message);
    this.name = "CustomError";
    this.info = info || {};
  }
}

interface API_PROPS {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  contentType?:
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  data?: RecordType | undefined;
  params?: Record<string, any> | URLSearchParams | undefined;
  token?: string;
}

export async function api({
  path,
  method = "GET",
  contentType = "application/json",
  data = undefined,
  params = {},
  token,
}: API_PROPS) {
  const jwtToken = token || "";

  const config: AxiosRequestConfig = {
    url: `${SERVICE_URL}${path}`,
    method,
    headers: {
      "Content-Type": contentType,
      Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
    },
    params: removeUndefined(params),
    data,
    validateStatus: () => true,
  };

  try {
    const response = await axios(config);
    if (response.status === 204) return { success: true };
    if (response.status === 403 || response.status === 401) {
      throw new CustomError("Yetkiniz bulunmuyor.", {
        status: response.status,
      });
    }
    if (!response.status || response.status < 200 || response.status >= 300) {
      throw new CustomError(response.data?.message || "API Error", {
        status: response.status,
        data: response.data,
      });
    }
    return response.data;
  } catch (err) {
    if (err instanceof CustomError) throw err;
    if (axios.isAxiosError(err)) {
      throw new CustomError(err.message, {
        status: err.response?.status,
        data: err.response?.data,
      });
    }
    throw err;
  }
}
