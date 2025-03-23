interface Course {
  created_at: string;
  description: string;
  homework: string | null;
  id: number;
  image: string;
  student_homework: boolean;
  test_result: number | null;
  title: string;
  video?: string;
  views_count: number;
  additional_materials: {
    id: number;
    name: string;
    file: string;
  }[];
  questions?: {
    id: number;
    question: string;
    answers: {
      id: number;
      answer: string;
    }[];
  }[];
}

type CoursePreview = Omit<Course, 'questions'>;

type CourseResponse = ApiResponse<Course>;
type CoursesResponse = ApiResponse<CoursePreview[]>;

type CourseTaskRequestData = {
  question: number;
  answer: number;
}[];
