'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SignaturePad } from '@/components/SignaturePad'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Contratos() {
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    value: '',
    description: '',
  })

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Contratos</h1>
      
      <div className="hidden md:block">
        <Tabs defaultValue="novo" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="novo">Novo Contrato</TabsTrigger>
            <TabsTrigger value="modelos">Modelos</TabsTrigger>
            <TabsTrigger value="assinados">Assinados</TabsTrigger>
          </TabsList>
          <TabsContent value="novo" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Contrato</CardTitle>
                  <CardDescription>
                    Preencha os dados para gerar o contrato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Nome do Cliente</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Nome do Projeto</Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Valor do Projeto</Label>
                      <Input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição do Projeto</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visualização e Assinatura</CardTitle>
                  <CardDescription>
                    Revise e assine o contrato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-md max-h-[300px] overflow-y-auto">
                      <h3 className="font-bold mb-4">Contrato de Prestação de Serviços</h3>
                      <div className="space-y-2">
                        <p><strong>Cliente:</strong> {formData.clientName || '[Nome do Cliente]'}</p>
                        <p><strong>Projeto:</strong> {formData.projectName || '[Nome do Projeto]'}</p>
                        <p><strong>Valor:</strong> R$ {formData.value || '0,00'}</p>
                        <p><strong>Descrição:</strong> {formData.description || '[Descrição do Projeto]'}</p>
                      </div>
                    </div>
                    <SignaturePad />
                    <Button className="w-full">Assinar e Finalizar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="modelos">
            <Card>
              <CardHeader>
                <CardTitle>Modelos de Contrato</CardTitle>
                <CardDescription>
                  Selecione um modelo para começar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Desenvolvimento Web', 'Consultoria', 'Manutenção'].map((modelo) => (
                    <Card key={modelo}>
                      <CardHeader>
                        <CardTitle className="text-lg">{modelo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          Usar Modelo
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="assinados">
            <Card>
              <CardHeader>
                <CardTitle>Contratos Assinados</CardTitle>
                <CardDescription>
                  Histórico de contratos finalizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Lista de contratos assinados simulada */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h4 className="font-semibold">Projeto {i}</h4>
                        <p className="text-sm text-gray-500">Cliente {i}</p>
                      </div>
                      <Button variant="outline">Ver Contrato</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Versão mobile mantida como estava */}
      <div className="md:hidden">
        <Card>
          <CardHeader>
            <CardTitle>Novo Contrato</CardTitle>
            <CardDescription>
              Preencha as informações para gerar um novo contrato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nome do Cliente</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectName">Nome do Projeto</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor do Projeto</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Projeto</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Gerar Contrato
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
