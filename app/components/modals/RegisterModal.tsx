"use client"
import React, { useState } from "react"
import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../Heading"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Input from "@/app/components/inputs/Input"
import Modal from "./Modal"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post("api/register", data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = () => {
    registerModal.onClose()
    loginModal.onOpen()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div>Allready have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggle}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
