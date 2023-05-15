import FeaturesList from '@/components/FeaturesList'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>בקשות</title>
        <meta name="description" content="Ronnen created this app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col items-center max-w-screen-lg min-h-screen mx-auto bg-slate-200'>
        <FeaturesList title="בקשות פיצ'רים" />
      </main >
    </>
  )
}