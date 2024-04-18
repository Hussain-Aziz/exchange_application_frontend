import {startApplicationEndpoint, getHeaders} from '../../../constants/endpoints';
import {cookies} from 'next/headers';
import StartApplicationContent from './content';
import { revalidatePath } from 'next/cache'

export default function Page() {

  const submitToBackend = async (data: any) => {
    "use server"
    await fetch(startApplicationEndpoint, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
    
    revalidatePath('/student/home')
  }

  return <StartApplicationContent submitToBackend={submitToBackend}/>
}