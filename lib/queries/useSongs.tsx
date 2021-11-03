import axios, { Method } from "axios";
import { useQuery } from "react-query";

type RequestData = {
  hour: number
}

const getSongs = async ({ hour }: RequestData) => {
  const response = await axios.request({
    method: 'GET' as Method,
    url: '/api/music',
    params: {
      hour
    }
  })
  return response.data
}

export const useSongs = ({ hour }: RequestData) => {
  return useQuery(['songs', hour], () => getSongs({ hour }))
}