import Head from 'next/head'
import { PlayIcon, PauseIcon } from '@heroicons/react/outline'
import { useState, useMemo, useRef } from 'react'
import ReactAudioPlayer from 'react-audio-player'

import { useSongs } from '/lib/queries/useSongs'

export default function Home() {
  const { data: songs } = useSongs()
  const [currentSongIndex, setCurrentSongIndex] = useState(0)

  const playerRef = useRef()

  const songURI = useMemo(() => {
    const { music_uri } = songs?.[currentSongIndex] || {}
    return music_uri
  }, [songs, currentSongIndex])


  return (
    <div>
      <Head>
        <title>Animal Crossing Radio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-lg font-bold'>
          animal crossing radio
        </h1>
        <ReactAudioPlayer
          ref={playerRef}
          src={songURI}
          autoPlay
          controls
        />
        <p className='hidden'>
          <PlayIcon role='button' className='h-8 w-8' />
          <PauseIcon role='button' className='h-8 w-8' />
        </p>
      </main>
    </div>
  )
}
