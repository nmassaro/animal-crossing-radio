import Head from 'next/head'
import { Player } from '@components/Player'
import { useState } from 'react'
import { Toggle } from '@components/Toggle'
import { classNames } from '@utils/classNames'
import { MoonIcon } from '@heroicons/react/solid'

export enum ColourMode {
  dark,
  light
}

export default function Home() {
  const [mode, setMode] = useState<ColourMode>(ColourMode.light)
  const isDarkMode = mode === ColourMode.dark

  return (
    <div>
      <Head>
        <title>Animal Crossing Radio</title>
        <meta name="a music player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classNames(isDarkMode ? 'bg-gray-800' : 'bg-white', 'transition-all duration-600')}>
        <div className='p-4 flex items-center space-x-4 fixed'>
          <Toggle label='Toggle Night Mode' setEnabled={(isEnabled) => isEnabled ? setMode(ColourMode.dark) : setMode(ColourMode.light)} enabled={mode === ColourMode.dark} />
          <MoonIcon className={classNames('h-7 w-7 mb-1', isDarkMode ? 'text-yellow-400' : 'text-gray-900')} />
        </div>
        <div className='min-h-screen flex flex-col items-center justify-center'>
          <Player mode={mode} />
        </div>
      </main>
    </div>
  )
}
