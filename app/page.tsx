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

  const labelStyle = { fontWeight: 600, fontSize: 14, color: '#333' };
  const inputStyle = { padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 14 };
  const fieldStyle = { display: 'flex', flexDirection: 'column' as const, gap: 4 };

  if (enviado) {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
        <h2>¡Registrado! ✅</h2>
        <button onClick={() => { setEnviado(false); setForm({ fecha:'',vendedor:'',cliente:'',producto:'',precio_costo:'',precio_ofrecido:'',precio_competencia:'',nombre_competencia:'',notas:'' }); }}
          style={{ padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}>
          Registrar otro negocio
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 480, margin: '0 auto' }}>
      <h1>Registro de negocio perdido</h1>
      <p style={{ fontSize: 13, color: '#666' }}>Los campos con <span style={{ color: 'red' }}>*</span> son obligatorios</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        <div style={fieldStyle}>
          <label style={labelStyle}>Fecha <span style={{ color: 'red' }}>*</span></label>
          <input style={inputStyle} type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Vendedor <span style={{ color: 'red' }}>*</span></label>
          <input style={inputStyle} type="text" name="vendedor" value={form.vendedor} onChange={handleChange} required />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Cliente</label>
          <input style={inputStyle} type="text" name="cliente" value={form.cliente} onChange={handleChange} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Producto <span style={{ color: 'red' }}>*</span></label>
          <input style={inputStyle} type="text" name="producto" value={form.producto} onChange={handleChange} required />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Precio costo</label>
          <input style={inputStyle} type="number" name="precio_costo" value={form.precio_costo} onChange={handleChange} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Precio que ofrecimos</label>
          <input style={inputStyle} type="number" name="precio_ofrecido" value={form.precio_ofrecido} onChange={handleChange} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Precio competencia</label>
          <input style={inputStyle} type="number" name="precio_competencia" value={form.precio_competencia} onChange={handleChange} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre competencia</label>
          <input style={inputStyle} type="text" name="nombre_competencia" value={form.nombre_competencia} onChange={handleChange} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Notas</label>
          <textarea style={inputStyle} name="notas" value={form.notas} onChange={handleChange} rows={3} />
        </div>

        <button type="submit" style={{ padding: '10px 16px', borderRadius: 6, background: '#111', color: 'white', border: 'none', cursor: 'pointer', fontSize: 15 }}>
          Guardar
        </button>
      </form>
    </div>
  );
}