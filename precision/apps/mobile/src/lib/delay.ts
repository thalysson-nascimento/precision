/**
 * Simula um atraso de latência de rede.
 * @param ms Tempo em milissegundos para o delay.
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
