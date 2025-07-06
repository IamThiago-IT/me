"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Agendar() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "call" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Agendar Reunião</h1>

      <div className="lg:grid lg:grid-cols-12 gap-6">
        {/* Cal.com Embed */}
        <div className="lg:col-span-12 space-y-6">
          {" "}
          {/* Alterado para col-span-12 para ocupar a largura total */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Selecione Data e Horário</CardTitle>
              <CardDescription>Escolha o melhor momento para nossa reunião através do Cal.com</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
              <Cal
                namespace="call"
                calLink="iamthiago/call"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
