import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json([]);
    }

    const searchTerm = `%${query.trim()}%`;
    
    // Buscar produtos usando apenas as colunas existentes
    const [rows] = await db.query(
      'SELECT id, nome, preco, imagem, codigo_produto, unidade_medida FROM produtos WHERE LOWER(nome) LIKE LOWER(?)',
      [searchTerm]
    );

    // Garantir que a resposta seja sempre um array e limitar a 5 itens
    const products = Array.isArray(rows) ? rows.slice(0, 5) : [];

    // Adicionar imagem padrão se necessário
    const productsWithImages = products.map(product => ({
      id: product.id,
      nome: product.nome,
      preco: product.preco,
      imagem: product.imagem || '/assets/images/noImage.png',
      codigo_produto: product.codigo_produto,
      unidade_medida: product.unidade_medida
    }));

    return NextResponse.json(productsWithImages);

  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
