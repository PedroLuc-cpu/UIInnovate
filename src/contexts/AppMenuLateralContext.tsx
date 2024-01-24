import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { MenuSection } from '../model'

interface MenuLateralSectionsData {
  sections: MenuSection[]
  setSections: (sections: MenuSection[]) => void
}

export const AppMenuLateralContext = createContext(
  {} as MenuLateralSectionsData,
)

export const useMenuLateral = () => useContext(AppMenuLateralContext)

export const AppMenuLateralProvider = ({ children }: PropsWithChildren) => {
  const [sections, setSections] = useState<MenuSection[]>([])

  const handleSetMenuLateral = useCallback((newMenuOptions: MenuSection[]) => {
    setSections(newMenuOptions)
  }, [])

  return (
    <AppMenuLateralContext.Provider
      value={{ sections, setSections: handleSetMenuLateral }}
    >
      {children}
    </AppMenuLateralContext.Provider>
  )
}
