"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "header.slogan": "We bring the garage to you",
    "header.admin": "Admin",
    "header.hours": "Mon-Sun 9am-11pm",

    // Main page
    "main.title": "Book Your Car Service Appointment",
    "main.subtitle":
      "Professional automotive services you can trust. Schedule your appointment today and keep your vehicle running smoothly.",
    "main.bookService": "Book Your Service",
    "main.intro":
      "Scheduling with HB Mechanics is quick and hassle-free. Simply choose the service you need, pick a time that works for you, and our team will handle the rest. With transparent pricing and reliable mobile service, we make it easy to keep your vehicle in top condition without disrupting your day.",

    // Services
    "service.odometer.title": "Odometer Accuracy Check + Pre-Purchase Inspection",
    "service.odometer.description":
      "Comprehensive vehicle inspection ensuring accurate mileage and identifying potential issues before purchase.",
    "service.odometer.price": "$130",
    "service.odometer.duration": "60 minutes",

    "service.mechanical.title": "Mechanical Repairs",
    "service.mechanical.description":
      "Expert diagnosis and repair of all mechanical issues with transparent hourly rates and quality parts.",
    "service.mechanical.price": "$80/hour",
    "service.mechanical.duration": "Variable",

    "service.diagnostics.title": "Diagnostics and Scans",
    "service.diagnostics.description":
      "Advanced computer diagnostics to identify engine codes and system malfunctions quickly and accurately.",
    "service.diagnostics.price": "$100",
    "service.diagnostics.duration": "60 minutes",

    "service.cooling.title": "Car Cooling System Service",
    "service.cooling.description":
      "Complete cooling system maintenance including radiator service, coolant replacement, and leak detection.",
    "service.cooling.price": "$80",
    "service.cooling.duration": "60 minutes",

    // Booking form
    "booking.selectService": "Select a Service",
    "booking.selectDate": "Select Date",
    "booking.selectTime": "Select Time",
    "booking.customerInfo": "Customer Information",
    "booking.name": "Full Name",
    "booking.email": "Email",
    "booking.phone": "Phone Number",
    "booking.address": "Service Address",
    "booking.notes": "Additional Notes",
    "booking.book": "Book Appointment",
    "booking.unavailable": "Unavailable",
    "booking.confirmationTitle": "Appointment Confirmed!",
    "booking.confirmationMessage":
      "Your appointment has been successfully booked. We will contact you shortly to confirm the details.",
    "booking.close": "Close",

    // Footer
    "footer.contact": "Contact Information",
    "footer.hours": "Business Hours",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Our Services",
    "footer.booking": "Book Service",
    "footer.about": "About Us",
    "footer.contact.link": "Contact",

    // Admin
    "admin.title": "Admin Panel",
    "admin.backToMain": "Back to Main Site",
    "admin.blockTimeSlots": "Block Time Slots",
    "admin.blockTimeSlotsDescription": "Mark specific dates and times as unavailable for bookings",
    "admin.blockNewTimeSlot": "Block New Time Slot",
    "admin.blockTimeSlot": "Block Time Slot",
    "admin.selectDateAndTime": "Select a date and time to make unavailable for customer bookings",
    "admin.date": "Date",
    "admin.time": "Time",
    "admin.reason": "Reason (Optional)",
    "admin.reasonPlaceholder": "e.g., Maintenance, Holiday, etc.",
    "admin.pickADate": "Pick a date",
    "admin.selectTime": "Select time",
    "admin.cancel": "Cancel",
    "admin.currentlyBlockedSlots": "Currently Blocked Slots",
    "admin.noBlockedTimeSlots": "No blocked time slots",
    "admin.recentAppointments": "Recent Appointments",
    "admin.viewAllBookedAppointments": "View all booked appointments",
    "admin.noAppointmentsBookedYet": "No appointments booked yet",
    "admin.service": "Service",
    "admin.vehicle": "Vehicle",
    "admin.notes": "Notes",
    "admin.totalAppointments": "Total Appointments",
    "admin.blockedTimeSlots": "Blocked Time Slots",
    "admin.upcomingAppointments": "Upcoming Appointments",
  },
  fr: {
    // Header
    "header.slogan": "Nous amenons le garage chez vous",
    "header.admin": "Admin",
    "header.hours": "Lun-Dim 9h-23h",

    // Main page
    "main.title": "Réservez Votre Rendez-vous de Service Auto",
    "main.subtitle":
      "Services automobiles professionnels en qui vous pouvez avoir confiance. Planifiez votre rendez-vous aujourd'hui et gardez votre véhicule en bon état.",
    "main.bookService": "Réserver Votre Service",
    "main.intro":
      "Planifier avec HB Mechanics est rapide et sans tracas. Choisissez simplement le service dont vous avez besoin, sélectionnez un horaire qui vous convient, et notre équipe s'occupera du reste. Avec des prix transparents et un service mobile fiable, nous facilitons l'entretien de votre véhicule en parfait état sans perturber votre journée.",

    // Services
    "service.odometer.title": "Vérification Real kilométrage + Inspection Pré-Achat",
    "service.odometer.description":
      "Inspection complète du véhicule garantissant un kilométrage précis et identifiant les problèmes potentiels avant l'achat.",
    "service.odometer.price": "130$",
    "service.odometer.duration": "60 minutes",

    "service.mechanical.title": "Réparations Mécaniques",
    "service.mechanical.description":
      "Diagnostic expert et réparation de tous problèmes mécaniques avec tarifs horaires transparents et pièces de qualité.",
    "service.mechanical.price": "80$/heure",
    "service.mechanical.duration": "Variable",

    "service.diagnostics.title": "Diagnostics et Analyses",
    "service.diagnostics.description":
      "Diagnostics informatiques avancés pour identifier rapidement et précisément les codes moteur et dysfonctionnements système.",
    "service.diagnostics.price": "100$",
    "service.diagnostics.duration": "60 minutes",

    "service.cooling.title": "Service Système de Refroidissement",
    "service.cooling.description":
      "Entretien complet du système de refroidissement incluant service radiateur, remplacement liquide de refroidissement et détection fuites.",
    "service.cooling.price": "80$",
    "service.cooling.duration": "60 minutes",

    // Booking form
    "booking.selectService": "Sélectionner un Service",
    "booking.selectDate": "Sélectionner la Date",
    "booking.selectTime": "Sélectionner l'Heure",
    "booking.customerInfo": "Informations Client",
    "booking.name": "Nom Complet",
    "booking.email": "Courriel",
    "booking.phone": "Numéro de Téléphone",
    "booking.address": "Adresse de Service",
    "booking.notes": "Notes Additionnelles",
    "booking.book": "Réserver Rendez-vous",
    "booking.unavailable": "Indisponible",
    "booking.confirmationTitle": "Rendez-vous Confirmé!",
    "booking.confirmationMessage":
      "Votre rendez-vous a été réservé avec succès. Nous vous contacterons sous peu pour confirmer les détails.",
    "booking.close": "Fermer",

    // Footer
    "footer.contact": "Informations de Contact",
    "footer.hours": "Heures d'Ouverture",
    "footer.quickLinks": "Liens Rapides",
    "footer.services": "Nos Services",
    "footer.booking": "Réserver Service",
    "footer.about": "À Propos",
    "footer.contact.link": "Contact",

    // Admin
    "admin.title": "Panneau d'Administration",
    "admin.backToMain": "Retour au Site Principal",
    "admin.blockTimeSlots": "Bloquer Créneaux Horaires",
    "admin.blockTimeSlotsDescription":
      "Marquer des dates et heures spécifiques comme indisponibles pour les réservations",
    "admin.blockNewTimeSlot": "Bloquer Nouveau Créneau",
    "admin.blockTimeSlot": "Bloquer Créneau Horaire",
    "admin.selectDateAndTime": "Sélectionnez une date et heure à rendre indisponible pour les réservations clients",
    "admin.date": "Date",
    "admin.time": "Heure",
    "admin.reason": "Raison (Optionnel)",
    "admin.reasonPlaceholder": "ex: Maintenance, Congé, etc.",
    "admin.pickADate": "Choisir une date",
    "admin.selectTime": "Sélectionner l'heure",
    "admin.cancel": "Annuler",
    "admin.currentlyBlockedSlots": "Créneaux Actuellement Bloqués",
    "admin.noBlockedTimeSlots": "Aucun créneau horaire bloqué",
    "admin.recentAppointments": "Rendez-vous Récents",
    "admin.viewAllBookedAppointments": "Voir tous les rendez-vous réservés",
    "admin.noAppointmentsBookedYet": "Aucun rendez-vous réservé pour le moment",
    "admin.service": "Service",
    "admin.vehicle": "Véhicule",
    "admin.notes": "Notes",
    "admin.totalAppointments": "Total Rendez-vous",
    "admin.blockedTimeSlots": "Créneaux Horaires Bloqués",
    "admin.upcomingAppointments": "Rendez-vous à Venir",

    "day.monday": "Lundi",
    "day.tuesday": "Mardi",
    "day.wednesday": "Mercredi",
    "day.thursday": "Jeudi",
    "day.friday": "Vendredi",
    "day.saturday": "Samedi",
    "day.sunday": "Dimanche",

    "month.january": "Janvier",
    "month.february": "Février",
    "month.march": "Mars",
    "month.april": "Avril",
    "month.may": "Mai",
    "month.june": "Juin",
    "month.july": "Juillet",
    "month.august": "Août",
    "month.september": "Septembre",
    "month.october": "Octobre",
    "month.november": "Novembre",
    "month.december": "Décembre",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
