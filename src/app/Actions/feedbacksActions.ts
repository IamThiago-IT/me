export async function getFeedbacks() {
  // Simulação de uma ação do servidor para buscar feedbacks
  const feedbacks = [
    {
      id: 1,
      name: "João Silva",
      company: "Tech Solutions",
      project: "E-commerce Platform",
      rating: 5,
      comment: "Excelente trabalho! Entregou o projeto antes do prazo e com qualidade excepcional.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Maria Santos",
      company: "Digital Agency",
      project: "Website Redesign",
      rating: 5,
      comment: "Muito profissional e atencioso. Compreendeu perfeitamente nossas necessidades.",
      image: "/placeholder.svg?height=80&width=80",
    },
    // Adicione mais feedbacks conforme necessário
  ];
  return feedbacks;
}
