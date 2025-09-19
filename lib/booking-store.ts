interface Appointment {
  id: string
  date: string
  time: string
  service: string
  customerName: string
  customerEmail: string
  customerPhone: string
  vehicleInfo?: string
  notes?: string
  createdAt: string
}

interface UnavailableSlot {
  date: string
  time: string
  reason: string // 'booked' | 'admin-blocked'
}

// In-memory storage (in a real app, this would be a database)
const appointments: Appointment[] = []
let unavailableSlots: UnavailableSlot[] = []

export const bookingStore = {
  // Get all appointments
  getAppointments: (): Appointment[] => appointments,

  // Add new appointment
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">): Appointment => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    appointments.push(newAppointment)

    // Also add to unavailable slots
    unavailableSlots.push({
      date: appointment.date,
      time: appointment.time,
      reason: "booked",
    })

    return newAppointment
  },

  // Check if a time slot is available
  isSlotAvailable: (date: string, time: string): boolean => {
    return !unavailableSlots.some((slot) => slot.date === date && slot.time === time)
  },

  // Get unavailable slots for a specific date
  getUnavailableSlots: (date: string): UnavailableSlot[] => {
    return unavailableSlots.filter((slot) => slot.date === date)
  },

  // Admin function to block time slots
  blockTimeSlot: (date: string, time: string, reason = "admin-blocked"): void => {
    const existingSlot = unavailableSlots.find((slot) => slot.date === date && slot.time === time)

    if (!existingSlot) {
      unavailableSlots.push({ date, time, reason })
    }
  },

  // Admin function to unblock time slots
  unblockTimeSlot: (date: string, time: string): void => {
    unavailableSlots = unavailableSlots.filter(
      (slot) => !(slot.date === date && slot.time === time && slot.reason === "admin-blocked"),
    )
  },

  // Get all admin-blocked slots
  getBlockedSlots: (): UnavailableSlot[] => {
    return unavailableSlots.filter((slot) => slot.reason === "admin-blocked")
  },
}
