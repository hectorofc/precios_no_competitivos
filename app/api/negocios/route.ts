import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS negocios_perdidos (
      id SERIAL PRIMARY KEY,
      fecha DATE,
      vendedor TEXT,
      cliente TEXT,
      producto TEXT,
      monto_negocio NUMERIC,
      precio_costo NUMERIC,
      precio_ofrecido NUMERIC,
      precio_competencia NUMERIC,
      nombre_competencia TEXT,
      notas TEXT
    )
  `;
  await sql`ALTER TABLE negocios_perdidos ADD COLUMN IF NOT EXISTS monto_negocio NUMERIC`;
}

export async function GET() {
  await ensureTable();
  const { rows } = await sql`SELECT * FROM negocios_perdidos ORDER BY fecha DESC`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const data = await request.json();
  const {
    fecha, vendedor, cliente, producto, monto_negocio,
    precio_costo, precio_ofrecido, precio_competencia,
    nombre_competencia, notas
  } = data;

  await ensureTable();

  await sql`
    INSERT INTO negocios_perdidos
      (fecha, vendedor, cliente, producto, monto_negocio, precio_costo, precio_ofrecido, precio_competencia, nombre_competencia, notas)
    VALUES
      (${fecha}, ${vendedor}, ${cliente}, ${producto}, ${monto_negocio}, ${precio_costo}, ${precio_ofrecido}, ${precio_competencia}, ${nombre_competencia}, ${notas})
  `;

  return NextResponse.json({ success: true });
}