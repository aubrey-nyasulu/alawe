import { Metadata } from "next"

import LandingPage from "@/ui/store/Home/LandingPage"

export const metadata: Metadata = {
  title: 'Welcome',
}

export default function Home() {
  return (
    <LandingPage />
  )
}
