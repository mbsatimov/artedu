interface User {
  first_name: string;
  id: number;
  last_name: string;
  phone_number: string;
}

type UserResponse = ApiResponse<User>;
