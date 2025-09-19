"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon, Clock, Shield, Trash2, Plus, Eye, Settings, Car, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { bookingStore } from "@/lib/booking-store"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

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

export default function AdminPage() {
  const { t } = useLanguage()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [blockReason, setBlockReason] = useState<string>("")
  const [appointments, setAppointments] = useState(bookingStore.getAppointments())
  const [blockedSlots, setBlockedSlots] = useState(bookingStore.getBlockedSlots())
  const [showBlockDialog, setShowBlockDialog] = useState(false)

  const refreshData = () => {
    setAppointments(bookingStore.getAppointments())
    setBlockedSlots(bookingStore.getBlockedSlots())
  }

  const handleBlockTimeSlot = () => {
    if (selectedDate && selectedTime) {
      const dateString = format(selectedDate, "yyyy-MM-dd")
      bookingStore.blockTimeSlot(dateString, selectedTime, blockReason || "admin-blocked")
      refreshData()
      setShowBlockDialog(false)
      setSelectedDate(undefined)
      setSelectedTime("")
      setBlockReason("")
    }
  }

  const handleUnblockTimeSlot = (date: string, time: string) => {
    bookingStore.unblockTimeSlot(date, time)
    refreshData()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="bg-primary p-2 rounded-lg">
                    <Car className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">HB Mechanics</h1>
                    <p className="text-sm text-muted-foreground">{t("header.slogan")}</p>
                  </div>
                </Link>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t("admin.backToMain")}</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">{t("admin.title")}</h2>
                <p className="text-muted-foreground">Manage appointments and availability</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Block Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  {t("admin.blockTimeSlots")}
                </CardTitle>
                <CardDescription>{t("admin.blockTimeSlotsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      {t("admin.blockNewTimeSlot")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("admin.blockTimeSlot")}</DialogTitle>
                      <DialogDescription>{t("admin.selectDateAndTime")}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label>{t("admin.date")}</Label>
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
                              {selectedDate ? selectedDate.toLocaleDateString() : t("admin.pickADate")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label>{t("admin.time")}</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder={t("admin.selectTime")} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>{t("admin.reason")}</Label>
                        <Input
                          value={blockReason}
                          onChange={(e) => setBlockReason(e.target.value)}
                          placeholder={t("admin.reasonPlaceholder")}
                          className="mt-2"
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={handleBlockTimeSlot}
                          disabled={!selectedDate || !selectedTime}
                          className="flex-1"
                        >
                          {t("admin.blockTimeSlot")}
                        </Button>
                        <Button variant="outline" onClick={() => setShowBlockDialog(false)} className="flex-1">
                          {t("admin.cancel")}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Currently Blocked Slots */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">{t("admin.currentlyBlockedSlots")}</h3>
                  {blockedSlots.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("admin.noBlockedTimeSlots")}</p>
                  ) : (
                    <div className="space-y-2">
                      {blockedSlots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">{format(new Date(slot.date), "PPP")}</div>
                            <div className="text-sm text-muted-foreground">{slot.time}</div>
                            {slot.reason !== "admin-blocked" && (
                              <div className="text-xs text-muted-foreground">{slot.reason}</div>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnblockTimeSlot(slot.date, slot.time)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* View Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  {t("admin.recentAppointments")}
                </CardTitle>
                <CardDescription>{t("admin.viewAllBookedAppointments")}</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("admin.noAppointmentsBookedYet")}</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {appointments
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((appointment) => (
                        <div key={appointment.id} className="p-4 bg-card border border-border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium">{appointment.customerName}</div>
                              <div className="text-sm text-muted-foreground">{appointment.customerPhone}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {format(new Date(appointment.date), "MMM dd, yyyy")}
                              </div>
                              <div className="text-sm text-muted-foreground">{appointment.time}</div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {t("admin.service")}:{" "}
                            {appointment.service.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </div>
                          {appointment.vehicleInfo && (
                            <div className="text-sm text-muted-foreground mb-1">
                              {t("admin.vehicle")}: {appointment.vehicleInfo}
                            </div>
                          )}
                          {appointment.notes && (
                            <div className="text-sm text-muted-foreground">
                              {t("admin.notes")}: {appointment.notes}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{appointments.length}</div>
                    <div className="text-sm text-muted-foreground">{t("admin.totalAppointments")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{blockedSlots.length}</div>
                    <div className="text-sm text-muted-foreground">{t("admin.blockedTimeSlots")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">
                      {appointments.filter((apt) => new Date(apt.date) >= new Date()).length}
                    </div>
                    <div className="text-sm text-muted-foreground">{t("admin.upcomingAppointments")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
