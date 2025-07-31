import { useEffect, useState } from 'react'

const HomePage = () => {
  const [faturamento, setFaturamento] = useState<number | null>(null)

  useEffect(() => {
    fetch('http://localhost:8000/faturamento')
      .then((res) => res.json())
      .then((data) => {
        setFaturamento(data.faturamento_total)
      })
      .catch((err) => {
        console.error("Erro ao buscar faturamento:", err)
      })
  }, [])

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <div style={estiloContainer}>
      <div style={estiloCard}>
        <h2>Faturamento Total</h2>
        <p style={estiloValor}>
          {faturamento !== null ? formatarMoeda(faturamento) : 'Carregando...'}
        </p>
      </div>
    </div>
  )
}

export default HomePage

// 🎨 Estilos inline
const estiloContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f9f9f9'
}

const estiloCard = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center' as const
}

const estiloValor = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginTop: '1rem',
  color: '#6a1b9a'
}
