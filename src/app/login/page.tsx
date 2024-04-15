import LoginContent from './content';
import { cookies } from "next/headers";
import { loginEndpoint } from "../../constants/endpoints";

type LoginSuccess = {
  expiry: string,
  token: string,
  user: {
    username: string,
    is_faculty: boolean,
  }
}

export default function Page() {

  const login = async (username: string, password: string) => {
    "use server"
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    if (response.ok) {
      const data = await response.json() as LoginSuccess
      // store the expiry, token, and user data in secure cookies
      const token = data.token
      const expiry = data.expiry
      const user = data.user
      cookies().set('token', token, { expires: new Date(expiry), secure: true, sameSite: 'strict' })
      cookies().set('user', JSON.stringify(user), { expires: new Date(expiry), secure: true, sameSite: 'strict' })

      return user.is_faculty ? '/teaching_faculty/home/' : '/student/home/'
    }
    return (await response.json()).non_field_errors[0]
  }

  return (
    <LoginContent login={login}/>
  )
}