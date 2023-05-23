import { User } from "@prisma/client"

export type SafeUser = Omit<
  User,
  "emailVerified" | "updatedAt" | "createdAt"
> & {
  createdAt: string
  updatedAt: string
  emailVerified?: string | null
}
