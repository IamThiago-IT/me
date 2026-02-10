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
import { MetadataSetter } from '@/components/MetadataSetter'
import { useI18n } from '@/lib/i18n'

export default function Contratos() {
  const { t } = useI18n()

  const [formData, setFormData] = useState({
    projectName: '',
    value: '',
    description: '',
  })

  const [signedContracts, setSignedContracts] = useState([
    {
      id: 1,
      projectName: 'E-commerce Platform',
      value: '***',
      status: 'completed',
      signedDate: '2024-01-15',
      contractNumber: 'CTR-2024-001',
      description: 'Desenvolvimento de plataforma de e-commerce completa com integração de pagamentos'
    },
    {
      id: 2,
      projectName: 'Mobile App Development',
      value: '***',
      status: 'in_progress',
      signedDate: '2024-02-20',
      contractNumber: 'CTR-2024-002',
      description: 'Aplicativo mobile para iOS e Android com funcionalidades de geolocalização'
    },
    {
      id: 3,
      projectName: 'Sistema de Gestão',
      value: '***',
      status: 'completed',
      signedDate: '2024-03-10',
      contractNumber: 'CTR-2024-003',
      description: 'Sistema ERP personalizado para gestão de estoque e vendas'
    }
  ])

  const formatCurrency = (value: number) => {
    if (!value) return ''
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div className="container mx-auto px-4">
      <MetadataSetter title={t.contracts.title} />
      <h1 className="text-3xl font-bold mb-6">{t.contracts.title}</h1>
      
      <div className="hidden md:block">
        <Tabs defaultValue="novo" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="novo">{t.contracts.newContract}</TabsTrigger>
            <TabsTrigger value="modelos">{t.contracts.templates}</TabsTrigger>
            <TabsTrigger value="assinados">{t.contracts.signed}</TabsTrigger>
          </TabsList>
          <TabsContent value="novo" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.contracts.contractInfo}</CardTitle>
                  <CardDescription>
                    {t.contracts.contractInfoDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">{t.contracts.projectName}</Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">{t.contracts.projectValue}</Label>
                      <Input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">{t.contracts.projectDescription}</Label>
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
                <CardTitle>{t.contracts.previewAndSign}</CardTitle>
                <CardDescription>
                    {t.contracts.previewDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-md max-h-[300px] overflow-y-auto">
                      <h3 className="font-bold mb-4">{t.contracts.serviceContract}</h3>
                      <div className="space-y-2">
                        <p><strong>{t.contracts.project}:</strong> {formData.projectName || '[' + t.contracts.projectName + ']'}</p>
                        <p><strong>{t.contracts.value}:</strong> {formatCurrency(Number(formData.value)) || '***'}</p>
                        <p><strong>{t.contracts.description}:</strong> {formData.description || '[' + t.contracts.projectDescription + ']'}</p>
                      </div>
                    </div>
                    <SignaturePad />
                    <Button className="w-full">{t.contracts.signAndFinish}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="modelos">
            <Card>
              <CardHeader>
                <CardTitle>{t.contracts.contractTemplates}</CardTitle>
                <CardDescription>
                  {t.contracts.selectTemplate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {t.contracts.templateNames.map((modelo) => (
                    <Card key={modelo}>
                      <CardHeader>
                        <CardTitle className="text-lg">{modelo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" disabled={true} className="w-full">
                          {t.contracts.useTemplate}
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
      <CardTitle>{t.contracts.signedContracts}</CardTitle>
      <CardDescription>
        {t.contracts.signedDescription}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {(Array.isArray(signedContracts) ? signedContracts : []).map((contract: any) => (
          <div
            key={contract?.id ?? Math.random()}
            className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-lg">{contract.projectName}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  contract.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {contract.status === 'completed' ? t.contracts.completed : t.contracts.inProgress}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>{t.contracts.project}:</strong> {contract.projectName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>{t.contracts.value}:</strong> ***
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>{t.contracts.contract}:</strong> {contract.contractNumber}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>{t.contracts.signedOn}:</strong> {new Date(contract.signedDate).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 line-clamp-2">
                {contract.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button variant="outline" size="sm">
                {t.contracts.viewContract}
              </Button>
              <Button variant="ghost" size="sm">
                {t.contracts.downloadPdf}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {signedContracts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>{t.contracts.noContracts}</p>
          <p className="text-sm">{t.contracts.createFirst}</p>
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
            <CardTitle>{t.contracts.newContract}</CardTitle>
            <CardDescription>
              {t.contracts.fillInfo}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">{t.contracts.projectName}</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">{t.contracts.projectValue}</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t.contracts.projectDescription}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {t.contracts.generateContract}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
