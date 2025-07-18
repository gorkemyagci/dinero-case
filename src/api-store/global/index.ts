import type { ApplicationForm, ApiResponse } from "@/lib/types";
import { api } from "../index";

const basePath = "/global";

export const provincesOrDistricts = async (provinceId?: number): Promise<ApiResponse> => {
  const response = await api({
    path: `${basePath}/getprovincesordistricts`,
    method: "POST",
    params: {
      provinceId,
    },
  });
  return response;
};

export const submit = async (values: ApplicationForm): Promise<ApiResponse> => {
  const response = await api({
    path: `/case`,
    method: "POST",
    data: values,
  });
  return response;
};