"use client"

import { Car, Phone, Mail, Clock, Shield, Languages } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary p-2 rounded-lg">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HB Mechanics</h1>
              <p className="text-sm text-muted-foreground">{t("header.slogan")}</p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-primary" />
              <span>438-368-7054</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@hb-mechanics.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{t("header.hours")}</span>
            </div>
            <button onClick={toggleLanguage} className="flex items-center gap-1 hover:text-primary transition-colors">
              <Languages className="h-4 w-4" />
              <span>{language.toUpperCase()}</span>
            </button>
            <Link href="/admin" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Shield className="h-4 w-4" />
              <span>{t("header.admin")}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
