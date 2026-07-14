import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  await sql`
    CREATE TABLE IF NOT EXISTS negocios_perdidos (
      id SERIAL PRIMARY KEY,
      fecha DATE,
      vendedor TEXT,
      cliente TEXT,
      producto TEXT,
      precio_costo NUMERIC,
      precio_ofrecido NUMERIC,
      precio_competencia NUMERIC,
      nombre_competencia TEXT,
      notas TEXT
    )
  `;
  const { rows } = await sql`SELECT * FROM negocios_perdidos ORDER BY fecha DESC`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const data = await request.json();
  const {
    fecha, vendedor, cliente, producto,
    precio_costo, precio_ofrecido, precio_competencia,
    nombre_competencia, notas
  } = data;

  await sql`
    CREATE TABLE IF NOT EXISTS negocios_perdidos (
      id SERIAL PRIMARY KEY,
      fecha DATE,
      vendedor TEXT,
      cliente TEXT,
      producto TEXT,
      precio_costo NUMERIC,
      precio_ofrecido NUMERIC,
      precio_competencia NUMERIC,
      nombre_competencia TEXT,
      notas TEXT
    )
  `;

  await sql`
    INSERT INTO negocios_perdidos
      (fecha, vendedor, cliente, producto, precio_costo, precio_ofrecido, precio_competencia, nombre_competencia, notas)
    VALUES
      (${fecha}, ${vendedor}, ${cliente}, ${producto}, ${precio_costo}, ${precio_ofrecido}, ${precio_competencia}, ${nombre_competencia}, ${notas})
  `;

  return NextResponse.json({ success: true });
}