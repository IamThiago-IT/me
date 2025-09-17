"use server";
export async function addService(data: FormData): Promise<void> {
  // Extrai os dados do formulário
  const name = data.get("name");
  const description = data.get("description");
  const price = data.get("price");

  // ...lógica de inserção (ex.: salvar no BD)...
  console.log("Criando serviço:", { name, description, price });

  // Retorne uma resposta ou redirecione (se necessário)
}
