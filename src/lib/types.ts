export type RecordType = Record<string, any>;

export interface ApplicationForm {
  firstName: string;
  lastName: string;
  telephone: string;
  linkedinUrl: string;
  cv: string;
  salaryExpectation: number;
  province: string;
  district: string;
  address: string;
  eMail: string;
}

export interface ApiSuccessResponse<T = any> {
  status: number;
  title: string;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  status: number;
  title: string;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T = any> {
  status: number;
  title: string;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
