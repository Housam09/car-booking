"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Clock, Car, Search, Stethoscope, Thermometer, CheckCircle, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { bookingStore } from "@/lib/booking-store"
import { useLanguage } from "@/lib/language-context"

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
]

export function BookingForm() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleInfo: "",
    notes: "",
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const services = [
    {
      id: "odometer-inspection",
      name: t("service.odometer.title"),
      shortDescription: "Complete vehicle assessment for informed buying decisions",
      description: t("service.odometer.description"),
      duration: t("service.odometer.duration"),
      price: t("service.odometer.price"),
      icon: Search,
      image: "/professional-mechanic-checking-car-odometer-and-in.jpg",
    },
    {
      id: "mechanical-repairs",
      name: t("service.mechanical.title"),
      shortDescription: "Expert repair services by certified technicians",
      description: t("service.mechanical.description"),
      duration: t("service.mechanical.duration"),
      price: t("service.mechanical.price"),
      icon: Car,
      image: "/mechanic-working-on-car-engine-repair-in-professio.jpg",
    },
    {
      id: "diagnostics-scans",
      name: t("service.diagnostics.title"),
      shortDescription: "Advanced computer diagnostics for optimal performance",
      description: t("service.diagnostics.description"),
      duration: t("service.diagnostics.duration"),
      price: t("service.diagnostics.price"),
      icon: Stethoscope,
      image: "/automotive-diagnostic-computer-scanner-connected-t.jpg",
    },
    {
      id: "cooling-system",
      name: t("service.cooling.title"),
      shortDescription: "Complete cooling system maintenance and repair",
      description: t("service.cooling.description"),
      duration: t("service.cooling.duration"),
      price: t("service.cooling.price"),
      icon: Thermometer,
      image: "/mechanic-servicing-car-radiator-and-cooling-system.jpg",
    },
  ]

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd")
      const unavailable = bookingStore.getUnavailableSlots(dateString)
      setUnavailableSlots(unavailable.map((slot) => slot.time))
    }
  }, [selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      selectedService &&
      selectedDate &&
      selectedTime &&
      customerInfo.name &&
      customerInfo.email &&
      customerInfo.phone
    ) {
      const dateString = format(selectedDate, "yyyy-MM-dd")

      // Double-check availability before booking
      if (!bookingStore.isSlotAvailable(dateString, selectedTime)) {
        alert("This time slot is no longer available. Please select another time.")
        return
      }

      bookingStore.addAppointment({
        date: dateString,
        time: selectedTime,
        service: selectedService,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        vehicleInfo: customerInfo.vehicleInfo,
        notes: customerInfo.notes,
      })

      setShowConfirmation(true)
    }
  }

  const selectedServiceData = services.find((s) => s.id === selectedService)

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Service Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              {t("booking.selectService")}
            </CardTitle>
            <CardDescription>Choose the automotive service you need from HB Mechanics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedService === service.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-card",
                    )}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-balance">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2 text-pretty">{service.shortDescription}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {service.duration}
                            </span>
                            <span className="font-semibold text-primary">{service.price}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {selectedServiceData && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <selectedServiceData.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{selectedServiceData.name}</h3>
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                    {selectedServiceData.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {selectedServiceData.duration}
                    </span>
                    <span className="font-semibold text-primary">{selectedServiceData.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Date and Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              {t("booking.selectDate")} & {t("booking.selectTime")}
            </CardTitle>
            <CardDescription>Choose your preferred appointment date and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date">{t("booking.selectDate")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="time">{t("booking.selectTime")}</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={t("booking.selectTime")} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => {
                      const isUnavailable = unavailableSlots.includes(time)
                      return (
                        <SelectItem
                          key={time}
                          value={time}
                          disabled={isUnavailable}
                          className={isUnavailable ? "opacity-50" : ""}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{time}</span>
                            {isUnavailable && (
                              <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1">
                                <X className="h-3 w-3" />
                                {t("booking.unavailable")}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                {selectedDate && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {unavailableSlots.length > 0
                      ? `${unavailableSlots.length} time slots unavailable on this date`
                      : "All time slots available on this date"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t("booking.customerInfo")}</CardTitle>
            <CardDescription>Please provide your contact details and vehicle information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t("booking.name")} *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t("booking.email")} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">{t("booking.phone")} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="vehicle">Vehicle Information</Label>
                <Input
                  id="vehicle"
                  value={customerInfo.vehicleInfo}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, vehicleInfo: e.target.value }))}
                  placeholder="e.g., 2020 Honda Civic"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">{t("booking.notes")}</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Any specific concerns or requests?"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="px-8 py-3 text-lg"
            disabled={
              !selectedService ||
              !selectedDate ||
              !selectedTime ||
              !customerInfo.name ||
              !customerInfo.email ||
              !customerInfo.phone
            }
          >
            {t("booking.book")}
          </Button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <DialogTitle>{t("booking.confirmationTitle")}</DialogTitle>
            </div>
            <DialogDescription className="text-left space-y-3">
              <p>{t("booking.confirmationMessage")}</p>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div>
                  <strong>Service:</strong> {selectedServiceData?.name}
                </div>
                <div>
                  <strong>Date:</strong> {selectedDate && format(selectedDate, "PPP")}
                </div>
                <div>
                  <strong>Time:</strong> {selectedTime}
                </div>
                <div>
                  <strong>Customer:</strong> {customerInfo.name}
                </div>
                <div>
                  <strong>Phone:</strong> {customerInfo.phone}
                </div>
                {customerInfo.vehicleInfo && (
                  <div>
                    <strong>Vehicle:</strong> {customerInfo.vehicleInfo}
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                We'll send you a confirmation email shortly. Please arrive 10 minutes early for your appointment.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowConfirmation(false)}>{t("booking.close")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
