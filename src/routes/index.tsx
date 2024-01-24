import { useEffect } from 'react'
import { useMenuLateral } from '../contexts/AppMenuLateralContext'
import {
  ComputerIcon,
  DollarSign,
  Terminal,
  UserCheck,
  UserCircle,
} from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router'
import ListarFuncionarios from '../page/Funcionarios/Listar'
import TituloPagar from '../page/Financeiro/TituloPagar'
import Produto from '../page/Estoque/Produto'
import TituloReceber from '../page/Financeiro/TituloReceber'
import CadastrarFuncionarios from '../page/Funcionarios/Cadastrar'
import UseReducer from '../page/Testing/UseReducer'

export const AppRoute = () => {
  const { setSections } = useMenuLateral()

  useEffect(() => {
    setSections([
      {
        show: true,
        title: 'Funcionarios',
        options: [
          {
            icon: <UserCheck color="white" />,
            label: 'Lista funcionarios',
            path: '/funcionarios',
          },
          {
            icon: <UserCircle color="white" />,
            label: 'cadastrar funcionarios',
            path: '/funcionarios/cadastrar',
          },
        ],
      },
      {
        show: true,
        title: 'Estoque',
        options: [
          {
            icon: <ComputerIcon color="white" />,
            label: 'Produtos',
            path: '/estoque',
          },
          {
            icon: <Terminal color="white" />,
            label: 'Usando o useReducer',
            path: '/useReducer',
          },
        ],
      },
      {
        show: true,
        title: 'Financeiro',
        options: [
          {
            icon: <DollarSign color="white" />,
            label: 'Titulos a pagar',
            path: '/financeiro/titulo-pagar',
          },
          {
            icon: <DollarSign color="white" />,
            label: 'Titulos a rebecer',
            path: '/financeiro/titulo-receber',
          },
        ],
      },
    ])
  }, [setSections])

  return (
    <Routes>
      <Route path="/funcionarios" element={<ListarFuncionarios />} />
      <Route
        path="/funcionarios/cadastrar"
        element={<CadastrarFuncionarios />}
      />

      <Route path="/estoque" element={<Produto />} />

      <Route path="/financeiro" element={<TituloPagar />} />
      <Route path="/financeiro/titulo-pagar" element={<TituloPagar />} />
      <Route path="/financeiro/titulo-receber" element={<TituloReceber />} />

      <Route path="/useReducer" element={<UseReducer />} />

      <Route path="*" element={<Navigate to={'/funcionarios'} />} />
    </Routes>
  )
}
