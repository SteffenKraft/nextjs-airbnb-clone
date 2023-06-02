"use client"
import React, { useMemo, useState } from "react"
import Heading from "../Heading"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import { categories } from "../navbar/Categories"
import { FieldValues, useForm } from "react-hook-form"
import CategoryInput from "../inputs/CategoryInput"
import CountrySelect from "../inputs/CountrySelect"
import Counter from "../inputs/Counter"
import dynamic from "next/dynamic"

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY)

  const onBack = () => setStep((value) => value - 1)
  const onNext = () => setStep((value) => value + 1)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      gestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const category = watch("category")
  const location = watch("location")
  const gestCount = watch("gestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")

  const Map = useMemo(
    () =>
      dynamic(() => import("../Maap"), {
        ssr: false,
      }),
    [location]
  )

  const rentModal = useRentModal()

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these describes your home?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3 
          max-h-[50vh] 
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={() => setCustomValue("category", item.label)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={gestCount}
          onChange={(value) => setCustomValue("gestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    )
  }

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <p>Footer</p>
    </div>
  )

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Rent"
      actionLabel={step === STEPS.PRICE ? "Create" : "Next"}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : "Back"}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RentModal
