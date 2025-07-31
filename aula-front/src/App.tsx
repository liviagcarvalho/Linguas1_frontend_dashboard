import { useState } from 'react'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Users, DollarSign } from "lucide-react"

const App = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Painel de Controle</h1>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Usuários</p>
              <p className="text-xl font-bold">1.204</p>
            </div>
            <Users className="w-6 h-6 text-purple-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Faturamento</p>
              <p className="text-xl font-bold">R$ 85.300</p>
            </div>
            <DollarSign className="w-6 h-6 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Relatórios</p>
              <p className="text-xl font-bold">12 Novos</p>
            </div>
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </CardContent>
        </Card>
      </div>

      {/* Seção de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Gráfico de desempenho</h2>
            {/* Aqui você pode inserir um gráfico com Chart.js ou Recharts */}
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
              Gráfico Placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Últimas atividades</h2>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Usuário João fez uma compra</li>
              <li>Novo relatório gerado</li>
              <li>Atualização do sistema concluída</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

