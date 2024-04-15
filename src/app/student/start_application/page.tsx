import {startApplicationEndpoint} from '../../../constants/endpoints';
import {cookies} from 'next/headers';
import StartApplicationContent from './content';
import { revalidatePath } from 'next/cache'

export default function Page() {

  const submitToBackend = async (data: any) => {
    "use server"
    const response = await fetch(startApplicationEndpoint, {
      method: 'POST',
      headers: {
        "Authorization": "TOKEN " + cookies().get('token').value
      },
      body: JSON.stringify(data)
    })

    const body = await response.text()
    //take first 200 characters of body

    console.log(data, body.substring(0, 500))
    
    revalidatePath('/student/home')
    
  }

  return <StartApplicationContent submitToBackend={submitToBackend}/>
}