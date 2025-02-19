/**
 * API Route para buscar produtos agrupados por categoria
 * 
 * Este arquivo é uma API Route do Next.js, que serve como um endpoint HTTP
 * acessível através da URL /api/products/categories
 * 
 * Por que precisamos desta API Route?
 * 1. Separação de Responsabilidades:
 *    - O código do banco de dados (mysql2) só roda no servidor
 *    - Os componentes React no cliente fazem apenas requisições HTTP
 * 
 * 2. Segurança:
 *    - Credenciais do banco de dados ficam apenas no servidor
 *    - Cliente não tem acesso direto ao banco de dados
 * 
 * 3. Performance:
 *    - Reduz o tamanho do bundle JavaScript no cliente
 *    - Evita problemas com módulos Node.js no navegador
 * 
 * Como funciona:
 * 1. Quando o cliente faz uma requisição GET para /api/products/categories
 * 2. Esta função é executada no servidor
 * 3. Busca os dados do banco usando getTopProductsByCategory
 * 4. Retorna os dados em formato JSON para o cliente
 */

import { getTopProductsByCategory } from '@/lib/topProductsFromCategory';
import { NextResponse } from 'next/server';

/**
 * Manipulador da rota GET /api/products/categories
 * 
 * @returns {Promise<NextResponse>} Resposta contendo os produtos agrupados por categoria
 */
export async function GET() {
  try {
    const products = await getTopProductsByCategory();

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error fetching products by category:', error);
    console.error('API Error stack:', error.stack);
    
    return NextResponse.json({ error: 'Failed to fetch products', details: error.message }, { status: 500 });
  }
}
