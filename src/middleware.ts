import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {

  const url = request.nextUrl.clone()
  const user = cookies().get('user')

  if (!user) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const user_data = JSON.parse(user.value)

  // check if student is trying to access faculty page or vice versa
  if (request.nextUrl.pathname.startsWith('/student')) {
    url.pathname = '/teaching_faculty/home'
    if (user_data.is_faculty) return NextResponse.redirect(url)
  }
  if (request.nextUrl.pathname.startsWith('/teaching_faculty')) {
    url.pathname = '/student/home'
    if (!user_data.is_faculty) return NextResponse.redirect(url)
  }

  // check if user is trying to access /student or /teaching_faculty
  if (request.nextUrl.pathname === '/student') {
    url.pathname = '/student/home'
    return NextResponse.redirect(url)
  }
  if (request.nextUrl.pathname === '/teaching_faculty') {
    url.pathname = '/teaching_faculty/home'
    return NextResponse.redirect(url)
  }
  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/student/:path*',
    '/teaching_faculty/:path*'
  ],
}