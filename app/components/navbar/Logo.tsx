"use client"

import Image from "next/image"
import React from "react"

import { useRouter } from "next/navigation"

const Logo = () => {
  return (
    <Image
      alt="Logo"
      className="hidden cursor-pointer md:block"
      src="/images/logo.png"
      width={100}
      height={100}
    />
  )
}

export default Logo
