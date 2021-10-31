import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon } from '@heroicons/react/solid'
import { useState, useMemo, useRef, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { shuffle } from 'lodash'
import { RainIcon, SnowIcon, SunIcon } from '@components/icons'
import { classNames } from '@utils/classNames'
import { useSongs } from '@queries/useSongs'

const enum Weather {
  rainy = 'Rainy',
  sunny = 'Sunny',
  snowy = 'Snowy',
}

const WeatherIcon = ({ type = Weather.sunny, shouldAnimate }: { type: Weather, shouldAnimate: boolean }) => {
  const components = {
    [Weather.rainy]: RainIcon,
    [Weather.sunny]: SunIcon,
    [Weather.snowy]: SnowIcon
  }

  const Svg = components[type]

  return (
    <Svg className={
      classNames(
        'h-8 w-8 md:h-12 md:w-12',
        shouldAnimate && 'animate-wiggle'
      )}
    />
  )
}

export const Player = () => {
  const { data: songs = [] } = useSongs()

  const shuffledSongs = useMemo(() => {
    return shuffle(songs)
  }, [songs])

  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const playerRef = useRef<ReactAudioPlayer>()
  const audioElement = playerRef.current?.audioEl.current

  const song = useMemo(() => {
    return shuffledSongs?.[currentSongIndex] || {}
  }, [shuffledSongs, currentSongIndex])

  useEffect(() => {
    if (isPlaying) {
      audioElement?.play()
    }
  }, [song.music_uri])

  const playNextSong = () => {
    setCurrentSongIndex(currentSongIndex =>
      currentSongIndex < songs.length
        ? currentSongIndex + 1
        : 0
    )
  }

  const playPreviousSong = () => {
    setCurrentSongIndex(currentSongIndex =>
      currentSongIndex > 0
        ? currentSongIndex - 1
        : songs.length - 1
    )
  }
  return (
    <div className='md:space-y-2 text-lg md:text-4xl text-gray-900'>
      <h1 className='text-center relative font-bold select-none'>
        <img src={song.image_uri} />
        animal crossing radio
        <div className='absolute -top-8 md:-top-12 left-1/2 transform -translate-x-1/2 flex items-center content-center'>
          <WeatherIcon shouldAnimate={isPlaying} type={song.weather} />
        </div>
      </h1>
      <ReactAudioPlayer
        ref={playerRef}
        src={song.music_uri}
        controls={false}
        onEnded={playNextSong}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className='flex items-center justify-center'>
        <RewindIcon role='button' className='transform hover:scale-105 h-8 w-8 hover:text-green-800' onClick={playPreviousSong} />
        {isPlaying
          ? <PauseIcon role='button' className='transform hover:scale-105 h-8 w-8 md:h-9 md:w-9 hover:text-green-800 transition-all duration-75' onClick={() => audioElement.pause()} />
          : <PlayIcon role='button' className='transform hover:scale-105 duration-75 h-8 w-8 md:h-9 md:w-9 g hover:text-green-800' onClick={() => audioElement.play()} />
        }
        <FastForwardIcon role='button' className='transform hover:scale-105 h-8 w-8 hover:text-green-800' onClick={playNextSong} />
      </div>
    </div>
  )
}