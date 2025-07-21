import type { ApplicationForm, ApiResponse } from "@/lib/types";
import { api } from "../index";

const basePath = "/v1";

export const provincesOrDistricts = async (
  provinceId?: number
): Promise<ApiResponse> => {
  const response = await api({
    path: `${basePath}/global/public/getprovincesordistricts`,
    method: "POST",
    data: {
      provincesId: provinceId,
    },
    headers: {
      "client-id": "2",
      "os-id": "2",
    },
  });
  return response;
};

export const submit = async (values: ApplicationForm): Promise<ApiResponse> => {
  const response = await api({
    path: `/test/case`,
    method: "POST",
    data: values,
  });
  return response;
};
