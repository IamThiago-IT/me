'use server'

import { revalidatePath } from 'next/cache';

// Action para criar um novo contrato
export async function createContract(formData: { projectName: string; value: number; description: string }) {
  // Lógica para criar o contrato (ex: inserir em um banco de dados)
  const newContract = {
    id: Math.floor(Math.random() * 10000),
    projectName: formData.projectName,
    value: formData.value,
    description: formData.description,
    status: 'pending',
    signedDate: null,
    contractNumber: `CTR-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`
  };

  console.log('Criando contrato:', newContract);
  
  // Revalida a página para refletir as mudanças
  revalidatePath('/contratos');

  // Retorne o novo contrato ou resultado da operação
  return newContract;
}

// Action para finalizar e assinar um contrato
export async function finalizeContract(formData: { projectName: string; value: number; description: string }) {
  // Lógica para finalizar o contrato (ex: salvar assinatura, atualizar status, etc.)
  const finalizedContract = {
    id: Math.floor(Math.random() * 10000),
    projectName: formData.projectName,
    value: formData.value,
    description: formData.description,
    status: 'completed',
    signedDate: new Date().toISOString(),
    contractNumber: `CTR-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`
  };

  console.log('Finalizando contrato:', finalizedContract);

  // Revalida a página para refletir as mudanças
  revalidatePath('/contratos');

  // Retorne o contrato finalizado ou resultado da operação
  return finalizedContract;
}
