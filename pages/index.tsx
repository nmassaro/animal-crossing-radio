import Head from 'next/head'
import { Player } from '@components/Player'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Animal Crossing Radio</title>
        <meta name="a music player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-gray-800 min-h-screen flex flex-col items-center justify-center'>
        <Player />
      </main>
    </div>
  )
}
