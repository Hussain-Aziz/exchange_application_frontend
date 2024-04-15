import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
  const user = cookies().get('user')

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user_data = JSON.parse(user.value)

  // check if the route is student
    if (request.url.includes('student')) {
        if (user_data.is_faculty) return NextResponse.redirect('/teaching_faculty/home')
    }
    if (request.url.includes('teaching_faculty')) {
        if (!user_data.is_faculty) return NextResponse.redirect('/student/home')
    }

  return NextResponse.next()
}

export const config = {
  matcher: [
    'student/:path*',
    'teaching_faculty/:path*',
    'faculty/:path*',
    'admin/:path*',
]
}