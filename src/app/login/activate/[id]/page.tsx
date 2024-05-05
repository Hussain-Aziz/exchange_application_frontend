import { baseEndpoint } from '../../../../constants/endpoints'
import ActivateContent from './content'

export default async function Page({params}: {params: {id: string}}) {
  const response = await fetch(baseEndpoint + 'activate/' + params.id + '/')
  const data = await response.json()
  return (
    <>
    {response.ok ? data.message : data.detail}
    <ActivateContent />
    </>
  )
}