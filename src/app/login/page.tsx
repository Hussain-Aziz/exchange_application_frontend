import LoginContent from './content';
import { cookies } from "next/headers";
import { loginEndpoint } from "../../constants/endpoints";
import { createCipheriv } from "crypto"

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

      const algorithm = process.env.ENCRYPT_ALG || 'aes-256-cbc'
      const secret_key = process.env.ENCRYPT_KEY || 'lmao'
      const IV = process.env.ENCRYPT_IV || 'lmao'

      const cipher = createCipheriv(algorithm, secret_key, Buffer.from(IV))

      const new_token = cipher.update(token, 'utf8', 'hex') + cipher.final('hex')

      cookies().set('token', new_token, { expires: new Date(expiry), secure: true, sameSite: 'strict', httpOnly: true})
      cookies().set('user', JSON.stringify(user), { expires: new Date(expiry), secure: true, sameSite: 'strict', httpOnly: true})

      return user.is_faculty ? '/faculty/home/' : '/student/home/'
    }
    return (await response.json()).non_field_errors[0]
  }

  return (
    <LoginContent login={login}/>
  )
}