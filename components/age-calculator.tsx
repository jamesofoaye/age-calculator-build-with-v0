"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { validateDate, calculateAge } from "../utils/date"
import { cn } from "@/lib/utils"

interface FormErrors {
  day?: string
  month?: string
  year?: string
  date?: string
}

interface AgeResult {
  years: number
  months: number
  days: number
}

export default function AgeCalculator() {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [result, setResult] = useState<AgeResult | null>(null)

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Check for empty fields
    if (!formData.day) newErrors.day = "This field is required"
    if (!formData.month) newErrors.month = "This field is required"
    if (!formData.year) newErrors.year = "This field is required"

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return false
    }

    const day = parseInt(formData.day)
    const month = parseInt(formData.month)
    const year = parseInt(formData.year)

    // Validate ranges
    if (day < 1 || day > 31) newErrors.day = "Must be a valid day"
    if (month < 1 || month > 12) newErrors.month = "Must be a valid month"
    if (year > new Date().getFullYear()) newErrors.year = "Must be in the past"

    // Validate date as a whole
    if (!validateDate(day, month, year)) {
      newErrors.date = "Must be a valid date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const age = calculateAge(
        parseInt(formData.day),
        parseInt(formData.month),
        parseInt(formData.year)
      )
      setResult(age)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-[840px] p-12 rounded-3xl rounded-br-[100px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-3 gap-6 max-w-[544px]">
            <div className="space-y-1">
              <label
                htmlFor="day"
                className={cn(
                  "text-sm font-bold tracking-[0.25em] text-gray-500",
                  errors.day && "text-red-500"
                )}
              >
                DAY
              </label>
              <Input
                id="day"
                name="day"
                placeholder="DD"
                value={formData.day}
                onChange={handleInputChange}
                className={cn(
                  "text-2xl font-bold p-4 h-auto",
                  errors.day && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.day && (
                <p className="text-red-500 text-xs italic">{errors.day}</p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="month"
                className={cn(
                  "text-sm font-bold tracking-[0.25em] text-gray-500",
                  errors.month && "text-red-500"
                )}
              >
                MONTH
              </label>
              <Input
                id="month"
                name="month"
                placeholder="MM"
                value={formData.month}
                onChange={handleInputChange}
                className={cn(
                  "text-2xl font-bold p-4 h-auto",
                  errors.month && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.month && (
                <p className="text-red-500 text-xs italic">{errors.month}</p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="year"
                className={cn(
                  "text-sm font-bold tracking-[0.25em] text-gray-500",
                  errors.year && "text-red-500"
                )}
              >
                YEAR
              </label>
              <Input
                id="year"
                name="year"
                placeholder="YYYY"
                value={formData.year}
                onChange={handleInputChange}
                className={cn(
                  "text-2xl font-bold p-4 h-auto",
                  errors.year && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.year && (
                <p className="text-red-500 text-xs italic">{errors.year}</p>
              )}
            </div>
          </div>

          {errors.date && (
            <p className="text-red-500 text-xs italic mt-0.5">{errors.date}</p>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center sm:justify-end">
              <Button
                type="submit"
                size="icon"
                className="h-16 w-16 rounded-full bg-purple-600 hover:bg-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g></svg>
                <span className="sr-only">Calculate age</span>
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-8 space-y-2">
          <p className="text-6xl font-extrabold italic">
            <span className="text-purple-600">{result?.years ?? "--"}</span> years
          </p>
          <p className="text-6xl font-extrabold italic">
            <span className="text-purple-600">{result?.months ?? "--"}</span> months
          </p>
          <p className="text-6xl font-extrabold italic">
            <span className="text-purple-600">{result?.days ?? "--"}</span> days
          </p>
        </div>
      </Card>
    </div>
  )
}

