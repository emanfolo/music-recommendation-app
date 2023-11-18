import Image from 'next/image'
import {Header, LandingPage, MoodForm} from "./components"
export default function Home() {
  return (
    <div className="overscroll-none">
      <head>
        <title>Discover new music</title>
      </head>
      <LandingPage />

      {/* <div className="container w-screen">
        <Header />
        <MoodForm />
      </div> */}
    </div>
  )
}
