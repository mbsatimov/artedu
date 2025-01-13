interface Course {
  description: string;
  end_date: string;
  has_homework: boolean;
  id: number;
  picture_url?: string;
  published_date: string;
  title: string;
  video_url?: string;
  views_count: number;
  task: {
    quiz: {
      id: number;
      question: string;
      options: {
        id: number;
        label: string;
      }[];
    }[];
    homework_url?: string;
  };
}

type CourseResponse = Course;
type CoursesResponse = Course[];

interface CourseTaskRequestData {
  homework?: File;
  quiz_answers: {
    question_id: number;
    selected_option_id: number;
  }[];
}
