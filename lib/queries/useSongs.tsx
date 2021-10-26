import axios, { Method } from "axios";
import { useQuery } from "react-query";

const options = { method: 'GET' as Method, url: 'https://acnhapi.com/v1a/backgroundmusic/' };

const getSongs = async () => {
  const response = await axios.request(options)
  console.log('response.data', response.data)

  return response.data
}

export const useSongs = () => {
  return useQuery('songs', getSongs)
}