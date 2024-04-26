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

  if (request.nextUrl.pathname.startsWith('/admin')) {
    url.pathname = '/student/home'
    if (!user_data.is_admin) return NextResponse.redirect(url)
  }  
  if (request.nextUrl.pathname.startsWith('/student')) {
    url.pathname = '/faculty/home'
    if (user_data.is_faculty) return NextResponse.redirect(url)
  }
  if (request.nextUrl.pathname.startsWith('/faculty')) {
    url.pathname = '/student/home'
    if (!user_data.is_faculty) return NextResponse.redirect(url)
  }

  // check if user is trying to access /student or /faculty
  if (request.nextUrl.pathname === '/student') {
    url.pathname = '/student/home'
    return NextResponse.redirect(url)
  }
  if (request.nextUrl.pathname === '/faculty') {
    url.pathname = '/faculty/home'
    return NextResponse.redirect(url)
  }
  if (request.nextUrl.pathname === '/admin') {
    url.pathname = '/admin/home'
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
    '/faculty/:path*',
    '/admin/:path*',
  ],
}