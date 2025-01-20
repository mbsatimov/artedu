interface LoginRequestData {
  password: string;
  phone_number: string;
}

type LoginResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
}>;

interface RegisterRequestData {
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
}

type RegisterResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
}>;
