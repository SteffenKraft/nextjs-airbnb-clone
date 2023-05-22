import Navbar from "@/app/components/navbar/Navbar"
import Modal from "@/app/components/modals/Modal"
import "./globals.css"
import { Nunito } from "next/font/google"

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
        <Modal isOpen actionLabel="Submit" />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
