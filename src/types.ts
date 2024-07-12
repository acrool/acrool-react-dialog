import {ReactNode} from 'react';
export type TButtonColor = 'success'|'info'|'warning'|'danger'|'gray'
export enum EStatus {
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
}

export interface IButton {
    className?: string
    children: ReactNode,
    color?: TButtonColor,
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

export type TShow = (args: IShowArgs) => void;
export type TStatusShow = (message: ReactNode, args?: IStatusShowArgs) => void;

type TOnButtonClick = (confirmValue: string) => void

interface IShowArgs extends IStatusShowArgs{
    status?: EStatus,
    message: ReactNode,
}

interface IStatusShowArgs {
    // key: string,

    code?: string,
    path?: string,

    onClick?: TOnButtonClick
    buttons?: IButton[],
    confirm?: string
}

interface TShowStatus {
    success: TStatusShow,
    warning: TStatusShow,
    info: TStatusShow,
    danger: TStatusShow,
}

export type TShowMulti = TShow & TShowStatus;

export type THidden = (key: string) => void;

