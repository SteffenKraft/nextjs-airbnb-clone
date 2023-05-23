import Navbar from "@/app/components/navbar/Navbar"
import "./globals.css"
import { Nunito } from "next/font/google"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./components/providers/ToasterProvider"
import LoginrModal from "./components/modals/LoginModal"
import getCurrentUser from "./actions/getCurrentUser"

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
        <LoginrModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
