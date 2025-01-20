interface Category {
  id: number;
  name: string;
}

type CategoryResponse = ApiResponse<Category>;
type CategoriesResponse = ApiResponse<Category[]>;
