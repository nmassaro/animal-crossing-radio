import axios from 'axios'

export default async function musicApi(request, response) {
  const hour = Number(request.query.hour)

  const { data: allSongs } = await axios.request({
    method: 'GET',
    url: 'https://acnhapi.com/v1a/backgroundmusic/'
  })

  const filteredSongs = allSongs.filter((track) => {
    return track.hour === hour
  })

  return response.status(200).json(filteredSongs)
}