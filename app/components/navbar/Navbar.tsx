"use client"

import { User } from "@prisma/client"
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

interface NavBarProps {
  currentUser?: User | null
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white shadow-sm">
      <div className="border-b py-4">
        <Container>
          <div
            className="
              flex 
              flex-grow 
              items-center 
              justify-between 
              gap-3 
              md:gap-0
            "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
