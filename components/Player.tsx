import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon } from '@heroicons/react/solid'
import { useState, useMemo, useRef, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { shuffle } from 'lodash'
import { RainIcon, SnowIcon, SunIcon } from '@components/icons'
import { classNames } from '@utils/classNames'
import { useSongs } from '@queries/useSongs'
import { ColourMode } from 'pages'

const enum Weather {
  rainy = 'Rainy',
  sunny = 'Sunny',
  snowy = 'Snowy',
}

const Icons = {
  [Weather.rainy]: RainIcon,
  [Weather.sunny]: SunIcon,
  [Weather.snowy]: SnowIcon
}

const WeatherIcon = ({ type = Weather.sunny, shouldAnimate }: { type: Weather, shouldAnimate: boolean }) => {

  const Svg = Icons[type]

  return (
    <Svg className={
      classNames(
        'h-8 w-8 md:h-12 md:w-12',
        shouldAnimate && 'animate-wiggle'
      )}
    />
  )
}

type PlayerProps = {
  mode: ColourMode
}

export const Player = ({ mode }: PlayerProps) => {
  const userTime = useMemo(() => {
    return new Date()
  }, [])

  const hourOfDay = userTime.getHours()

  const { data: songs = [], isLoading } = useSongs({ hour: hourOfDay })

  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)


  const isDarkMode = mode === ColourMode.dark
  const playerRef = useRef<ReactAudioPlayer>()
  const audioElement = playerRef.current?.audioEl.current

  const song = useMemo(() => {
    return songs?.[currentSongIndex] || {}
  }, [songs, currentSongIndex])

  useEffect(() => {
    if (isPlaying) {
      audioElement?.play()
    }
  }, [song.music_uri])

  const playNextSong = () => {
    setCurrentSongIndex(currentSongIndex =>
      currentSongIndex < songs.length - 1
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
    <div className={classNames('md:space-y-2', isDarkMode && 'text-white')}>
      <div className='relative'>
        <h1 className='text-xl md:text-4xl text-center relative font-bold select-none'>
          animal crossing radio
        </h1>
        {isLoading ? null : (
          <div className='gap-2 sm:gap-none self-center font-serif absolute -top-8 md:-top-12 left-1/2 transform -translate-x-1/2 grid grid-cols-3 items-center justify-items-center justify-center'>
            <p className='textSm mr-2 whitespace-nowrap'>hour {hourOfDay}</p>
            <WeatherIcon shouldAnimate={isPlaying} type={song.weather} />
            <p className='textSm lowercase'>{song.weather}</p>
          </div>
        )}

      </div>
      <ReactAudioPlayer
        ref={playerRef}
        src={song.music_uri}
        controls={false}
        onEnded={playNextSong}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className='flex items-center justify-center'>
        <RewindIcon role='button' className='transform h-8 w-8 hover:scale-110  transition-all duration-75' onClick={playPreviousSong} />
        {isPlaying
          ? <PauseIcon role='button' className='transform h-8 w-8 md:h-9 md:w-9 hover:scale-110 transition-all duration-75' onClick={() => audioElement.pause()} />
          : <PlayIcon role='button' className='transform h-8 w-8 md:h-9 md:w-9 g hover:scale-110  transition-all duration-75' onClick={() => audioElement.play()} />
        }
        <FastForwardIcon role='button' className='transform h-8 w-8 hover:scale-110  transition-all duration-75' onClick={playNextSong} />
      </div>
    </div>
  )
}