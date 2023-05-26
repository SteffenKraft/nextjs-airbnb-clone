import Navbar from "@/app/components/navbar/Navbar"
import "./globals.css"
import { Nunito } from "next/font/google"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./components/providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"
import getCurrentUser from "./actions/getCurrentUser"
import RentModal from "./components/modals/RentMoodal"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <RentModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
