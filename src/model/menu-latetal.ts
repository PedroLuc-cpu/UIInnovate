import { ReactNode } from "react";



/**
 * Define uma opção (item) de navegação do drawer.
 */
export interface MenuOptions {
  /** Caminho da rota representada pela opção de navegação. */
    path: string;
    /** Ícone que será exibido ao lado do nome da opção de navegação.  */
    icon: ReactNode;
    /** Nome da opção de navegação. */
    label: string;
}

/**
 * Define uma seção de navegação do drawer.
 * Uma seção deve ter um título e uma
 * ou mais opções de navegação.
 */
export interface MenuSection {
    /** Defina se a seção será exibida. */
    show: boolean;
    /** Título da seção de navegação. */
    title: string;
    /** Opções de navegação da seção. */
    options: MenuOptions[]
}