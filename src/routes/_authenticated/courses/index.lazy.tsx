import { createLazyFileRoute } from '@tanstack/react-router'

import { Main } from '@/components/Layout'

import { CourseList, CourseToolbar } from './-components'

const MainPage = () => {
  return (
    <Main className="space-y-3">
      <CourseToolbar />
      <CourseList />
    </Main>
  )
}

export const Route = createLazyFileRoute('/_authenticated/courses/')({
  component: MainPage,
})
