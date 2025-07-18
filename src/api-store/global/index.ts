import type { ApplicationForm } from "@/lib/types";
import { api } from "../index";

const basePath = "/global";

export const provincesOrDistricts = async (provinceId?: number) => {
  const response = await api({
    path: `${basePath}/getprovincesordistricts`,
    method: "POST",
    params: {
      provinceId,
    },
  });
  return response;
};

export const submit = async (values: ApplicationForm) => {
  const response = await api({
    path: `/case`,
    method: "POST",
    data: values,
  });
  return response;
}