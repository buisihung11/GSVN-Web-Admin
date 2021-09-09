export type Province = {
  code: string;
  name: string;
  unit: string;
};

export type District = {
  code: string;
  name: string;
  unit: string;
  province_code: string;
  province_name: string;
  full_name: string;
};
