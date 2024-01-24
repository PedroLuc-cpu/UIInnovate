import { Home } from 'lucide-react'
import { ReactNode } from 'react'
import { MenuLateral } from '../components'

interface PageLayoutProps {
  children: ReactNode
  title: string
}

export const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div>
      <header className="bg-slate-900 border-b border-b-gray-600 p-5 flex gap-2 select-none justify-between">
        <div className="flex gap-2">
          <Home className="text-gray-100" />
          <h1 className="text-slate-400 font-bold text-lg">Ui Inovate</h1>
        </div>
        <p className="text-slate-50">{title}</p>
      </header>
      <div className="grid grid-cols-app h-screen">
        <MenuLateral />
        {children}
      </div>
    </div>
  )
}
