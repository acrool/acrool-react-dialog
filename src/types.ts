import {ReactNode} from 'react';
export type TButtonColor = 'success'|'info'|'warning'|'danger'|'gray'
export enum EStatus {
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    confirm = 'confirm',
}

export interface IButton {
    className?: string
    children: ReactNode,
    color?: TButtonColor,
    onClick?: TOnButtonClick,
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

export type TOnButtonClick = (e?: React.MouseEvent, confirmValue?: string) => false|void;

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
    confirmPlaceholder?: string
}

interface TShowStatus {
    success: TStatusShow,
    warning: TStatusShow,
    info: TStatusShow,
    danger: TStatusShow,
    confirm: TStatusShow,
}

export type TShowMulti = TShow & TShowStatus;

export type THidden = (key: string) => void;

