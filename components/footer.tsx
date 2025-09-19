"use client"

import { Phone, Mail, MapPin, Clock, Car, Calendar, Search, Stethoscope, Thermometer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                {t("footer.contact")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>438-368-7054</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@hb-mechanics.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>
                  3980 Rue Sherbrooke Est
                  <br />
                  Montreal, QC H1X2A8
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                {t("footer.hours")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span>Monday - Sunday</span>
                  <span className="font-medium">9:00 AM - 11:00 PM</span>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">Open 7 days a week for your convenience</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links - Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-primary" />
                {t("footer.services")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer">
                <Search className="h-3 w-3" />
                <span>Pre-Purchase Inspection</span>
              </div>
              <div className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer">
                <Car className="h-3 w-3" />
                <span>Mechanical Repairs</span>
              </div>
              <div className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer">
                <Stethoscope className="h-3 w-3" />
                <span>Diagnostics & Scans</span>
              </div>
              <div className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer">
                <Thermometer className="h-3 w-3" />
                <span>Cooling System Service</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links - Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                {t("footer.quickLinks")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm hover:text-primary cursor-pointer">{t("footer.booking")}</div>
              <div className="text-sm hover:text-primary cursor-pointer">{t("footer.about")}</div>
              <div className="text-sm hover:text-primary cursor-pointer">{t("footer.contact.link")}</div>
              <div className="text-sm hover:text-primary cursor-pointer">Emergency Service</div>
            </CardContent>
          </Card>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 HB Mechanics. All rights reserved. | Professional Automotive Services in Montreal
          </p>
        </div>
      </div>
    </footer>
  )
}
