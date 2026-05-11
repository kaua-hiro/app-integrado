export const calcularTotal = (precoProduto, precoBebida) => {
  return precoProduto + precoBebida;
};

export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const gerarResumoPedido = (produto, bebida, total) => {
  return `Pedido: ${produto} + ${bebida}\nTotal: ${formatarMoeda(total)}`;
};