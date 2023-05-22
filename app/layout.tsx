import Navbar from "@/app/components/navbar/Navbar"
import "./globals.css"
import { Nunito } from "next/font/google"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./components/providers/ToasterProvider"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
