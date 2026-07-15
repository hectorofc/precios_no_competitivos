'use client';
import { useEffect, useState } from 'react';

const BEIGE = '#D9C9A3';

export default function Reportes() {
  const [datos, setDatos] = useState<any[]>([]);
  const [filtroProducto, setFiltroProducto] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/api/negocios')
      .then(res => res.json())
      .then(data => { setDatos(data); setCargando(false); });
  }, []);

  const productos = Array.from(new Set(datos.map(d => d.producto))).filter(Boolean);
  const filtrados = filtroProducto ? datos.filter(d => d.producto === filtroProducto) : datos;

  const totalRegistros = filtrados.length;
  const montoTotal = filtrados.reduce((acc, d) => acc + (Number(d.monto_negocio) || 0), 0);

  const conCostoYCompetencia = filtrados.filter(d => Number(d.precio_costo) > 0 && d.precio_competencia);
  const diferenciaPorcentaje = conCostoYCompetencia.length
    ? conCostoYCompetencia.reduce((acc, d) => acc + ((Number(d.precio_competencia) - Number(d.precio_costo)) / Number(d.precio_costo)) * 100, 0) / conCostoYCompetencia.length
    : 0;

  const productosDistintos = new Set(filtrados.map(d => d.producto).filter(Boolean)).size;

  const cellStyle = { padding: 8, borderBottom: `1px solid ${BEIGE}33`, color: BEIGE, fontSize: 13 };
  const headStyle = { ...cellStyle, fontWeight: 700, borderBottom: `2px solid ${BEIGE}` };

  if (cargando) return <div style={{ padding: 40, color: BEIGE, fontFamily: 'sans-serif' }}>Cargando...</div>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', color: BEIGE }}>
      <h1 style={{ color: BEIGE }}>Reporte de negocios perdidos por precio</h1>
      <a href="/" style={{ color: BEIGE, fontSize: 13 }}>← Volver al formulario</a>

      <div style={{ display: 'flex', gap: 20, margin: '24px 0', flexWrap: 'wrap' as const }}>
        <div style={{ border: `1px solid ${BEIGE}`, borderRadius: 8, padding: 16, minWidth: 160 }}>
          <div style={{ fontSize: 13 }}>Negocios registrados</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{totalRegistros}</div>
        </div>
        <div style={{ border: `1px solid ${BEIGE}`, borderRadius: 8, padding: 16, minWidth: 160 }}>
          <div style={{ fontSize: 13 }}>Monto total perdido</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>${montoTotal.toLocaleString()}</div>
        </div>
        <div style={{ border: `1px solid ${BEIGE}`, borderRadius: 8, padding: 16, minWidth: 160 }}>
          <div style={{ fontSize: 13 }}>Diferencia competencia vs. costo</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{diferenciaPorcentaje.toLocaleString(undefined, { maximumFractionDigits: 1 })}%</div>
        </div>
        <div style={{ border: `1px solid ${BEIGE}`, borderRadius: 8, padding: 16, minWidth: 160 }}>
          <div style={{ fontSize: 13 }}>SKU productos distintos</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{productosDistintos}</div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>Filtrar por SKU producto:</label>
        <select value={filtroProducto} onChange={e => setFiltroProducto(e.target.value)}
          style={{ padding: 6, borderRadius: 6, border: `1px solid ${BEIGE}`, background: 'transparent', color: BEIGE }}>
          <option value="">Todos</option>
          {productos.map(p => <option key={p} value={p} style={{ color: '#000' }}>{p}</option>)}
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={headStyle}>Fecha</th>
            <th style={headStyle}>Vendedor</th>
            <th style={headStyle}>Cliente</th>
            <th style={headStyle}>SKU producto</th>
            <th style={headStyle}>Monto negocio</th>
            <th style={headStyle}>Precio costo</th>
            <th style={headStyle}>Precio ofrecido</th>
            <th style={headStyle}>Precio competencia</th>
            <th style={headStyle}>Competencia</th>
            <th style={headStyle}>Notas</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((d, i) => (
            <tr key={i}>
              <td style={cellStyle}>{d.fecha ? new Date(d.fecha).toLocaleDateString() : ''}</td>
              <td style={cellStyle}>{d.vendedor}</td>
              <td style={cellStyle}>{d.cliente}</td>
              <td style={cellStyle}>{d.producto}</td>
              <td style={cellStyle}>{d.monto_negocio}</td>
              <td style={cellStyle}>{d.precio_costo}</td>
              <td style={cellStyle}>{d.precio_ofrecido}</td>
              <td style={cellStyle}>{d.precio_competencia}</td>
              <td style={cellStyle}>{d.nombre_competencia}</td>
              <td style={cellStyle}>{d.notas}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtrados.length === 0 && <p>No hay registros todavía.</p>}
    </div>
  );
}