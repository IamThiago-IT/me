'use server'

import { revalidatePath } from 'next/cache';
import { randomUUID } from 'node:crypto';

// Action para criar um novo contrato
export async function createContract(formData: { projectName: string; value: number; description: string }) {
  const newContract = {
    id: randomUUID(),
    projectName: formData.projectName,
    value: formData.value,
    description: formData.description,
    status: 'pending',
    signedDate: null,
    contractNumber: `CTR-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`
  };

  console.log('Criando contrato:', newContract);
  
  // Revalida a página para refletir as mudanças
  revalidatePath('/contratos');

  // Retorne o novo contrato ou resultado da operação
  return newContract;
}

// Action para finalizar e assinar um contrato
export async function finalizeContract(formData: { projectName: string; value: number; description: string }) {
  const finalizedContract = {
    id: randomUUID(),
    projectName: formData.projectName,
    value: formData.value,
    description: formData.description,
    status: 'completed',
    signedDate: new Date().toISOString(),
    contractNumber: `CTR-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`
  };

  console.log('Finalizando contrato:', finalizedContract);

  // Revalida a página para refletir as mudanças
  revalidatePath('/contratos');

  // Retorne o contrato finalizado ou resultado da operação
  return finalizedContract;
}
