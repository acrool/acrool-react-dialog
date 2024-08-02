import {Transition, Variant} from 'framer-motion';
import {ReactNode} from 'react';

import {IDialogWrapperProps} from './DialogWrapper/types';
export type TButtonColor = 'success'|'info'|'warning'|'danger'|'gray'
export enum EStatus {
    success = 'success',
    info = 'info',
    warning = 'warning',
    error = 'error',
    confirm = 'confirm',
}

export interface IButton {
    className?: string
    children: ReactNode,
    color?: TButtonColor,
    onClick?: TOnButtonClick,
    hotKey?: 'y'|'n'|'enter'|'esc',
}

export interface ITextField<T = string> {
    className?: string
    defaultValue?: string
    placeholder?: string
    value?: T
    onChange?: (value: T) => void
}

export interface IRow extends IDialogWrapperProps{
}

export type TShow = (args: IShowArgs) => void;
export type TStatusShow = (message: ReactNode, args?: IStatusShowArgs) => void;

export type TOnButtonClick = (e?: React.MouseEvent, confirmValue?: string) => boolean|void;

interface IShowArgs extends IStatusShowArgs{
    status?: EStatus,
    message: ReactNode,
}

interface IStatusShowArgs {
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
    error: TStatusShow,
    confirm: TStatusShow,
}

export type TShowMulti = TShow & TShowStatus;

export type THide = () => void;


export interface IDialogProps {
    id?: string
    isDark?: boolean
    className?: string
    isVisibleStatusIcon?: boolean
    renderButton?: (args: IButton) => ReactNode
    renderTextField?: (args: ITextField) => ReactNode
    locale?: string
    modalOption: IModalOptions
}


type TVariantKey = 'initial'|'show'|'exit'
export type TAnimationVariants = Record<TVariantKey, Variant>;

export interface IModalOptions {
    variants?: TAnimationVariants
    transition?: Transition
    className?: string
}


export type TLocaleDictionaries = Record<string, string>;
export interface IUseLocale {
    i18n: (id: string, options?: {def?: string}) => string
}
