"use client"
import { useState } from "react"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import { AiOutlineMenu } from "react-icons/ai"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const toggleOpen = () => setIsOpen((value) => !value)

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            hidden 
            md:block
            cursor-pointer 
            rounded-full 
            px-4 
            py-3 
            text-sm 
            font-semibold 
            transition 
            hover:bg-neutral-100 
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            flex 
            cursor-pointer 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            border-[1px] 
            border-neutral-200 
            transition 
            hover:shadow-md 
            p-4 
            md:px-2 
            md:py-1
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            right-0 
            top-12 
            w-[40vw] 
            md:w-3/4
            overflow-hidden 
            rounded-xl 
            bg-white 
            text-sm 
            shadow-md 
          "
        >
          <div className="flex flex-col cursor-pointer ">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
