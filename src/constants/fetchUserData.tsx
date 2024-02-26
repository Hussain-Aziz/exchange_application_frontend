export default async function fetchUserData(pageNum: number, searchText: string, endpoint: string): Promise<{
  pagination: {
    total_pages: number
  },
  models: any[]
}> {

  const models = [
    {
      id: 0,
      course_code: 'CMP 305',
      course_name: 'Data Structures and Algorithms',
      student_id: '12345',
      student_name: 'John Doe'
    },
    {
      id: 1,
      course_code: 'COE 312',
      course_name: 'Software Design',
      student_id: '12346',
      student_name: 'Jane Doe'
    },
  ].filter(model => model.course_code.toLowerCase().includes(searchText.toLowerCase()) || 
                    model.course_name.toLowerCase().includes(searchText.toLowerCase()) || 
                    model.student_id.toLowerCase().includes(searchText.toLowerCase())  || 
                    model.student_name.toLowerCase().includes(searchText.toLowerCase()))

  return {
    pagination: {
      total_pages: 1
    },
    models: models
  }
}