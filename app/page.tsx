'use client';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    fecha: '', vendedor: '', cliente: '', producto: '',
    precio_costo: '', precio_ofrecido: '', precio_competencia: '',
    nombre_competencia: '', notas: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/negocios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
        <h2>¡Registrado! ✅</h2>
        <button onClick={() => { setEnviado(false); setForm({ fecha:'',vendedor:'',cliente:'',producto:'',precio_costo:'',precio_ofrecido:'',precio_competencia:'',nombre_competencia:'',notas:'' }); }}>
          Registrar otro negocio
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 480 }}>
      <h1>Registro de negocio perdido</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label>Fecha<input type="date" name="fecha" onChange={handleChange} required /></label>
        <label>Vendedor<input type="text" name="vendedor" onChange={handleChange} required /></label>
        <label>Cliente<input type="text" name="cliente" onChange={handleChange} required /></label>
        <label>Producto<input type="text" name="producto" onChange={handleChange} required /></label>
        <label>Precio costo<input type="number" name="precio_costo" onChange={handleChange} /></label>
        <label>Precio que ofrecimos<input type="number" name="precio_ofrecido" onChange={handleChange} /></label>
        <label>Precio competencia<input type="number" name="precio_competencia" onChange={handleChange} /></label>
        <label>Nombre competencia<input type="text" name="nombre_competencia" onChange={handleChange} /></label>
        <label>Notas<textarea name="notas" onChange={handleChange} /></label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
