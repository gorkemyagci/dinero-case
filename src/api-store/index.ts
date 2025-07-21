import type {
  RecordType,
  ApiResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "@/lib/types";
import { removeUndefined } from "@/lib/utils/modify";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export const SERVICE_URL = import.meta.env.VITE_API_URL;

export class CustomError extends Error {
  public info: ApiErrorResponse;

  constructor(message: string, info?: ApiErrorResponse) {
    super(message);
    this.name = "CustomError";
    this.info = info || {
      status: 500,
      title: "Internal Server Error",
      message: "Bir hata oluştu",
    };
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
  headers?: Record<string, string>;
}

export async function api({
  path,
  method = "GET",
  contentType = "application/json",
  data = undefined,
  params = {},
  headers = {},
}: API_PROPS): Promise<ApiResponse> {
  const config: AxiosRequestConfig = {
    url: `${SERVICE_URL}${path}`,
    method,
    headers: {
      "Content-Type": contentType,
      ...headers,
    },
    params: removeUndefined(params),
    data,
    validateStatus: () => true,
  };

  try {
    const response = await axios(config);

    if (response.status === 204) {
      return {
        status: 204,
        title: "Success",
        message: "İşlem başarıyla tamamlandı",
      };
    }

    if (response.status === 401) {
      throw new CustomError(
        "Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.",
        {
          status: 401,
          title: "Unauthorized",
          message: "Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.",
        }
      );
    }

    if (response.status === 403) {
      throw new CustomError("Bu işlem için yetkiniz bulunmuyor.", {
        status: 403,
        title: "Forbidden",
        message: "Bu işlem için yetkiniz bulunmuyor.",
      });
    }

    if (response.status === 0 || response.status === 404) {
      throw new CustomError(
        "Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.",
        {
          status: response.status || 404,
          title: "Connection Error",
          message: "Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.",
        }
      );
    }

    if (response.status < 200 || response.status >= 300) {
      const errorData = response.data as ApiErrorResponse;
      throw new CustomError(errorData?.message || "Bir hata oluştu", {
        status: response.status,
        title: errorData?.title || "Error",
        message: errorData?.message || "Bir hata oluştu",
        errors: errorData?.errors,
      });
    }

    const successData = response.data as ApiSuccessResponse;
    return {
      status: response.status,
      title: successData?.title || "Success",
      message: successData?.message || "İşlem başarıyla tamamlandı",
      data: successData?.data,
    };
  } catch (err) {
    if (err instanceof CustomError) throw err;

    if (axios.isAxiosError(err)) {
      if (err.code === "NETWORK_ERROR" || err.code === "ERR_NETWORK") {
        throw new CustomError(
          "Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.",
          {
            status: 0,
            title: "Network Error",
            message:
              "Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.",
          }
        );
      }

      if (err.code === "ECONNABORTED") {
        throw new CustomError(
          "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.",
          {
            status: 408,
            title: "Request Timeout",
            message: "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.",
          }
        );
      }

      const errorData = err.response?.data as ApiErrorResponse;
      throw new CustomError(errorData?.message || err.message, {
        status: err.response?.status || 500,
        title: errorData?.title || "API Error",
        message: errorData?.message || err.message,
        errors: errorData?.errors,
      });
    }

    throw new CustomError("Beklenmeyen bir hata oluştu.", {
      status: 500,
      title: "Unknown Error",
      message: "Beklenmeyen bir hata oluştu.",
    });
  }
}
