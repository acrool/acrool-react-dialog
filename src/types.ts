import {ReactNode} from 'react';

export enum EStatus {
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
}

export interface IButton {
    className?: string
    children: ReactNode,
    status?: string,
    onClick?: (e?: React.MouseEvent, confirmValue?: string) => void,
    hotKey?: 'y'|'n'|'enter',
}

export interface ITextField {
    className?: string
    defaultValue?: string
    placeholder?: string
    value?: string
    onChange?: (val: string) => void
}

export interface IItem {
    key: string,
    status?: EStatus,
    message: ReactNode,

    code?: string,
    path?: string,
    buttons?: IButton[],
    confirm?: string
}

export type TShow = (newItem: Omit<IItem, 'key'>) => void;
export type TStatusShow = (newItem: Omit<IItem, 'key'|'status'>) => void;
interface TShowStatus {
    success: TStatusShow,
    warning: TStatusShow,
    info: TStatusShow,
    danger: TStatusShow,
}

export type TShowMulti = TShow & TShowStatus;

export type THidden = (key: string) => void;

