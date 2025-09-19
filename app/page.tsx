"use client"

import { BookingForm } from "@/components/booking-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{t("main.title")}</h1>
            <p className="text-lg text-muted-foreground text-pretty mb-8">{t("main.subtitle")}</p>
            <div className="bg-card p-6 rounded-lg border border-border mb-8">
              <p className="text-foreground text-pretty leading-relaxed">{t("main.intro")}</p>
            </div>
          </div>
          <BookingForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
