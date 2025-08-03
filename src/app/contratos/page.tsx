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

  const [signedContracts, setSignedContracts] = useState([
    {
      id: 1,
      clientName: 'TechCorp Solutions',
      projectName: 'E-commerce Platform',
      value: 25000,
      status: 'completed',
      signedDate: '2024-01-15',
      contractNumber: 'CTR-2024-001',
      description: 'Desenvolvimento de plataforma de e-commerce completa com integração de pagamentos'
    },
    {
      id: 2,
      clientName: 'StartupXYZ',
      projectName: 'Mobile App Development',
      value: 18000,
      status: 'in_progress',
      signedDate: '2024-02-20',
      contractNumber: 'CTR-2024-002',
      description: 'Aplicativo mobile para iOS e Android com funcionalidades de geolocalização'
    },
    {
      id: 3,
      clientName: 'Consultoria ABC',
      projectName: 'Sistema de Gestão',
      value: 32000,
      status: 'completed',
      signedDate: '2024-03-10',
      contractNumber: 'CTR-2024-003',
      description: 'Sistema ERP personalizado para gestão de estoque e vendas'
    }
  ])

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
                  {['Desenvolvimento Web', 'Consultoria', 'Manutenção', 'Desenvolvimento de Software', 'Desenvolvimento Mobile'].map((modelo) => (
                    <Card key={modelo}>
                      <CardHeader>
                        <CardTitle className="text-lg">{modelo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" disabled={true} className="w-full">
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
        Histórico de contratos finalizados e em andamento
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {(Array.isArray(signedContracts) ? signedContracts : []).map((contract: any) => (
          <div
            key={contract?.id ?? Math.random()}
            className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-lg">{contract.projectName}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  contract.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {contract.status === 'completed' ? 'Finalizado' : 'Em Andamento'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Cliente:</strong> {contract.clientName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Valor:</strong> R$ {contract.value.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Contrato:</strong> {contract.contractNumber}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Assinado em:</strong> {new Date(contract.signedDate).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {contract.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button variant="outline" size="sm">
                Ver Contrato
              </Button>
              <Button variant="ghost" size="sm">
                Download PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {signedContracts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum contrato assinado encontrado.</p>
          <p className="text-sm">Crie seu primeiro contrato na aba "Novo Contrato".</p>
        </div>
      )}
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
