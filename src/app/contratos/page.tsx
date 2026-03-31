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
  const [activeTab, setActiveTab] = useState('novo')
  const [currentStep, setCurrentStep] = useState<'form' | 'preview' | 'signature'>('form')

  const [formData, setFormData] = useState({
    // Dados do Cliente
    clientName: '',
    clientDocument: '',
    clientEmail: '',
    clientPhone: '',
    
    // Informações do Projeto
    projectName: '',
    projectDescription: '',
    value: '',
    paymentTerms: '1x à vista',
    
    // Datas
    startDate: '',
    endDate: '',
    
    // Termos adicionais
    warranty: '30',
    supportMonths: '1',
  })

  // Funções de máscara
  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14)
  }

  const maskCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18)
  }

  const maskDocument = (value: string) => {
    // Detecta se é CPF (11 dígitos) ou CNPJ (14 dígitos)
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 11) {
      return maskCPF(value)
    } else {
      return maskCNPJ(value)
    }
  }

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 15)
  }

  const maskCurrency = (value: string) => {
    return value.replace(/\D/g, '')
  }

  const contractTemplates = [
    {
      id: 1,
      name: t.contracts.templateNames?.[0] || 'Desenvolvimento Web',
      projectName: 'Desenvolvimento de Aplicação Web',
      projectDescription: 'Desenvolvimento completo de aplicação web com front-end reativo (React/Vue), back-end robusto (Node.js/Python), banco de dados otimizado (PostgreSQL), testes automatizados, documentação técnica e deploy em ambiente de produção.',
      value: '5000',
      paymentTerms: '50% entrada, 50% na entrega',
      warranty: '30',
      supportMonths: '3'
    },
    {
      id: 2,
      name: t.contracts.templateNames?.[1] || 'Aplicativo Mobile',
      projectName: 'Desenvolvimento de Aplicativo Mobile',
      projectDescription: 'Desenvolvimento de aplicativo mobile nativo para iOS e Android com integração de APIs REST, notificações push, sincronização em tempo real, sistema de autenticação seguro, mapas e geolocalização.',
      value: '8000',
      paymentTerms: '30% entrada, 30% meio do projeto, 40% conclusão',
      warranty: '30',
      supportMonths: '6'
    },
    {
      id: 3,
      name: t.contracts.templateNames?.[2] || 'Consultoria Tech',
      projectName: 'Consultoria de Arquitetura de Software',
      projectDescription: 'Consultoria especializada em arquitetura de software, otimização de performance, segurança, escalabilidade de sistemas, code review, setup de CI/CD e melhorias de infraestrutura.',
      value: '3000',
      paymentTerms: '100% à vista',
      warranty: '0',
      supportMonths: '1'
    },
  ]

  const useTemplate = (template: typeof contractTemplates[0]) => {
    // Calcular datas (hoje e 30 dias depois)
    const today = new Date().toISOString().split('T')[0]
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30)
    const endDateString = endDate.toISOString().split('T')[0]

    setFormData({
      clientName: '',
      clientDocument: '',
      clientEmail: '',
      clientPhone: '',
      projectName: template.projectName,
      projectDescription: template.projectDescription,
      value: template.value,
      paymentTerms: template.paymentTerms,
      startDate: today,
      endDate: endDateString,
      warranty: template.warranty,
      supportMonths: template.supportMonths,
    })
    setActiveTab('novo')
    setCurrentStep('form')
  }

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
    <div className="container mx-auto px-4 h-[calc(100vh-7rem)] flex flex-col">
      <MetadataSetter title={t.contracts.title} />
      <h1 className="text-3xl font-bold mb-6 shrink-0">{t.contracts.title}</h1>
      
      <div className="hidden md:block flex-1 overflow-y-auto custom-scrollbar">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="novo">{t.contracts.newContract}</TabsTrigger>
            <TabsTrigger value="modelos">{t.contracts.templates}</TabsTrigger>
            <TabsTrigger value="assinados">{t.contracts.signed}</TabsTrigger>
          </TabsList>
          <TabsContent value="novo" className="mt-6">
            {currentStep === 'form' && (
              <Card>
                <CardHeader>
                  <CardTitle>Etapa 1: Informações Básicas</CardTitle>
                  <CardDescription>
                    Preencha os dados do cliente e do projeto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    {/* Dados do Cliente */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Dados do Cliente</h4>
                      <div className="space-y-2">
                        <Label htmlFor="clientName">Nome/Razão Social *</Label>
                        <Input
                          id="clientName"
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientDocument">CPF/CNPJ *</Label>
                        <Input
                          id="clientDocument"
                          required
                          placeholder="000.000.000-00 ou 00.000.000/0000-00"
                          value={formData.clientDocument}
                          onChange={(e) => setFormData({ ...formData, clientDocument: maskDocument(e.target.value) })}
                          maxLength={18}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientEmail">Email *</Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          required
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientPhone">Telefone</Label>
                        <Input
                          id="clientPhone"
                          placeholder="(11) 98765-4321"
                          value={formData.clientPhone}
                          onChange={(e) => setFormData({ ...formData, clientPhone: maskPhone(e.target.value) })}
                          maxLength={15}
                        />
                      </div>
                    </div>

                    {/* Informações do Projeto */}
                    <div className="border-t pt-6 space-y-3">
                      <h4 className="font-semibold text-sm">Informações do Projeto</h4>
                      <div className="space-y-2">
                        <Label htmlFor="projectName">Nome do Projeto *</Label>
                        <Input
                          id="projectName"
                          required
                          value={formData.projectName}
                          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectDescription">Descrição do Escopo *</Label>
                        <Textarea
                          id="projectDescription"
                          required
                          placeholder="Descreva detalhadamente o que será entregue..."
                          rows={4}
                          value={formData.projectDescription}
                          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Valor Total (R$) *</Label>
                        <Input
                          id="value"
                          type="number"
                          required
                          step="0.01"
                          value={formData.value}
                          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentTerms">Condições de Pagamento</Label>
                        <Input
                          id="paymentTerms"
                          value={formData.paymentTerms}
                          onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                          placeholder="Ex: 1x à vista, 2x 50%, etc"
                        />
                      </div>
                    </div>

                    {/* Prazos */}
                    <div className="border-t pt-6 space-y-3">
                      <h4 className="font-semibold text-sm">Prazos e Termos</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Data de Início *</Label>
                          <Input
                            id="startDate"
                            type="date"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">Data de Término *</Label>
                          <Input
                            id="endDate"
                            type="date"
                            required
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="warranty">Garantia (dias)</Label>
                          <Input
                            id="warranty"
                            type="number"
                            value={formData.warranty}
                            onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="supportMonths">Suporte (meses)</Label>
                          <Input
                            id="supportMonths"
                            type="number"
                            value={formData.supportMonths}
                            onChange={(e) => setFormData({ ...formData, supportMonths: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 text-xs text-blue-800 dark:text-blue-200">
                      ⚠️ Este contrato é um modelo genérico. Para casos específicos ou valores altos, recomenda-se consultoria jurídica.
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setActiveTab('modelos')}
                      >
                        Ver Modelos
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          if (formData.clientName && formData.clientDocument && formData.projectName && formData.value && formData.startDate && formData.endDate) {
                            setCurrentStep('preview')
                          } else {
                            alert('Preencha todos os campos obrigatórios')
                          }
                        }}
                      >
                        Próximo: Visualizar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === 'preview' && (
              <Card>
                <CardHeader>
                  <CardTitle>Etapa 2: Visualização e Confirmação</CardTitle>
                  <CardDescription>
                    Revise o contrato antes de assinar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 border rounded-md max-h-[600px] overflow-y-auto custom-scrollbar bg-white dark:bg-gray-950 text-sm">
                      {/* Cabeçalho */}
                      <div className="text-center mb-8 pb-4 border-b">
                        <h2 className="text-xl font-bold mb-1">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h2>
                        <p className="text-xs text-gray-500">Documento eletrônico - Gerado automaticamente</p>
                      </div>

                      {/* Dados das Partes */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">1. PARTES CONTRATANTES</h3>
                        <p className="text-xs leading-relaxed mb-4">
                          <strong>PRESTADOR DE SERVIÇOS:</strong><br/>
                          IamThiago<br/>
                          Desenvolvedor Full Stack
                        </p>
                        <p className="text-xs leading-relaxed">
                          <strong>CLIENTE/CONTRATANTE:</strong><br/>
                          {formData.clientName || '[Nome/Razão Social]'}<br/>
                          CPF/CNPJ: {formData.clientDocument || '[___.___.___/____-__]'}<br/>
                          Email: {formData.clientEmail || '[email@exemplo.com]'}<br/>
                          Telefone: {formData.clientPhone || '[Telefone]'}
                        </p>
                      </div>

                      {/* Objeto */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">2. OBJETO DO CONTRATO</h3>
                        <p className="text-xs leading-relaxed">
                          Prestação de serviços de desenvolvimento de <strong>{formData.projectName || '[Nome do Projeto]'}</strong>.
                        </p>
                        <p className="text-xs leading-relaxed mt-2">
                          <strong>Escopo:</strong> {formData.projectDescription || '[Descrição do escopo não preenchida]'}
                        </p>
                      </div>

                      {/* Valor e Pagamento */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">3. VALOR E FORMA DE PAGAMENTO</h3>
                        <p className="text-xs leading-relaxed">
                          Valor total dos serviços: <strong>R$ {formData.value ? Number(formData.value).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : '0,00'}</strong>
                        </p>
                        <p className="text-xs leading-relaxed mt-2">
                          Condições de pagamento: <strong>{formData.paymentTerms || '[Condições não especificadas]'}</strong>
                        </p>
                      </div>

                      {/* Prazos */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">4. PRAZOS</h3>
                        <p className="text-xs leading-relaxed">
                          Início: <strong>{formData.startDate ? new Date(formData.startDate).toLocaleDateString('pt-BR') : '[___/___/____]'}</strong><br/>
                          Término Estimado: <strong>{formData.endDate ? new Date(formData.endDate).toLocaleDateString('pt-BR') : '[___/___/____]'}</strong>
                        </p>
                      </div>

                      {/* Responsabilidades */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">5. RESPONSABILIDADES</h3>
                        <p className="text-xs leading-relaxed">
                          5.1 O PRESTADOR compromete-se a executar os serviços com eficiência, qualidade e dentro dos prazos estabelecidos.
                        </p>
                        <p className="text-xs leading-relaxed mt-2">
                          5.2 O CLIENTE compromete-se a fornecer todas as informações e acessos necessários para execução do projeto.
                        </p>
                      </div>

                      {/* Garantia e Suporte */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">6. GARANTIA E SUPORTE</h3>
                        <p className="text-xs leading-relaxed">
                          6.1 Garantia de {formData.warranty || '30'} dias para correção de falhas técnicas identificadas.
                        </p>
                        <p className="text-xs leading-relaxed mt-2">
                          6.2 Suporte técnico de {formData.supportMonths || '1'} mês(es) após conclusão do projeto.
                        </p>
                      </div>

                      {/* Propriedade Intelectual */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">7. PROPRIEDADE INTELECTUAL</h3>
                        <p className="text-xs leading-relaxed">
                          Após pagamento integral do contrato, todos os direitos sobre os códigos, documentação e trabalhos entregues são transferidos ao CLIENTE, ressalvados direitos de reutilização de componentes genéricos pelo PRESTADOR.
                        </p>
                      </div>

                      {/* Rescisão */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">8. RESCISÃO E MULTA</h3>
                        <p className="text-xs leading-relaxed">
                          Qualquer das partes pode rescindir este contrato com 15 dias de antecedência. Em caso de rescisão injustificada pelo CLIENTE, 50% do valor já pago é retido como multa contratual.
                        </p>
                      </div>

                      {/* Disposições Gerais */}
                      <div className="mb-6">
                        <h3 className="font-bold text-sm mb-2">9. DISPOSIÇÕES FINAIS</h3>
                        <p className="text-xs leading-relaxed">
                          Este contrato é regido pelas leis da República Federativa do Brasil. Qualquer modificação deverá ser registrada por escrito e assinada pelas partes.
                        </p>
                      </div>

                      {/* Rodapé */}
                      <div className="border-t pt-4 text-center text-xs text-gray-500">
                        <p>Contrato eletrônico de acordo com Lei 14.063/2020</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setCurrentStep('form')}
                      >
                        ← Voltar
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => setCurrentStep('signature')}
                      >
                        Próximo: Assinar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 'signature' && (
              <Card>
                <CardHeader>
                  <CardTitle>Etapa 3: Assinatura Digital</CardTitle>
                  <CardDescription>
                    Assine o contrato para finalizá-lo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4 text-sm text-green-800 dark:text-green-200">
                      ✓ Contrato revisado e pronto para assinatura
                    </div>

                    <div className="space-y-2">
                      <Label>Assinatura Digital *</Label>
                      <SignaturePad />
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Às {new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</p>
                      <p>• Por: {formData.clientName}</p>
                      <p>• Documento: {formData.clientDocument}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setCurrentStep('preview')}
                      >
                        ← Voltar
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          // Adicionar contrato aos assinados
                          const newContract = {
                            id: signedContracts.length + 1,
                            projectName: formData.projectName,
                            value: formData.value,
                            status: 'in_progress' as const,
                            signedDate: new Date().toISOString().split('T')[0],
                            contractNumber: `CTR-${new Date().getFullYear()}-${String(signedContracts.length + 1).padStart(3, '0')}`,
                            description: formData.projectDescription
                          }
                          setSignedContracts([...signedContracts, newContract])
                          
                          // Ressetar form e ir para abas assinados
                          setFormData({
                            clientName: '',
                            clientDocument: '',
                            clientEmail: '',
                            clientPhone: '',
                            projectName: '',
                            projectDescription: '',
                            value: '',
                            paymentTerms: '1x à vista',
                            startDate: '',
                            endDate: '',
                            warranty: '30',
                            supportMonths: '1',
                          })
                          setCurrentStep('form')
                          setActiveTab('assinados')
                        }}
                      >
                        ✓ Assinar e Finalizar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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
                  {contractTemplates.map((template) => (
                    <Card key={template.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="text-xs">R$ {Number(template.value).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-4">
                          {template.projectDescription}
                        </p>
                        <Button 
                          variant="default" 
                          className="w-full mt-auto"
                          onClick={() => useTemplate(template)}
                        >
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

      {/* Versão mobile - Formulário simplificado */}
      <div className="md:hidden flex-1 overflow-y-auto custom-scrollbar">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="novo">{t.contracts.newContract}</TabsTrigger>
            <TabsTrigger value="modelos">{t.contracts.templates}</TabsTrigger>
          </TabsList>

          <TabsContent value="novo">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.contracts.newContract}</CardTitle>
                <CardDescription className="text-sm">
                  Preencha os dados essenciais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="m-clientName">Nome do Cliente *</Label>
                    <Input
                      id="m-clientName"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="m-clientEmail">Email *</Label>
                    <Input
                      id="m-clientEmail"
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="m-projectName">Nome do Projeto *</Label>
                    <Input
                      id="m-projectName"
                      required
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="m-value">Valor (R$) *</Label>
                    <Input
                      id="m-value"
                      type="number"
                      step="0.01"
                      required
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('modelos')}
                  >
                    Ver Modelos
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modelos">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.contracts.templateNames?.[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contractTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => useTemplate(template)}
                  >
                    <div className="text-left">
                      <div className="font-semibold text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500">
                        R$ {Number(template.value).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
