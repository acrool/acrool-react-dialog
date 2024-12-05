import {Transition, Variant} from 'framer-motion';
import {ReactNode} from 'react';

import {IDialogWrapperProps} from './DialogWrapper/types';
import {ILocaleDictionaries} from './locales';
export type TButtonColor = 'success'|'info'|'warning'|'danger'|'gray'
export enum EStatus {
    success = 'success',
    info = 'info',
    warning = 'warning',
    error = 'error',
    confirm = 'confirm',
}

export type TButtonType = 'submit'|'button';

export interface IButton {
    className?: string
    children: ReactNode,
    color?: TButtonColor,
    onClick?: TOnButtonClick,
    hotKey?: EKeyboardKey,
    type?: TButtonType,
}

export interface ITextField<V extends string|number> {
    ref?: React.RefObject<HTMLInputElement>
    className?: string
    defaultValue?: string
    placeholder?: string
    value: V
    onChange: (value: V) => void
}

export interface IRow extends IDialogWrapperProps{
}

export type TShow = (args: IShowArgs) => void;
export type TStatusShow = (message: ReactNode, args?: IStatusShowArgs) => void;

export type TOnButtonClick = (e?: React.MouseEvent) => boolean|void|Promise<boolean|void>;
export type TOnSubmit = (confirmValue?: string) => boolean|void|Promise<boolean|void>;

interface IShowArgs extends IStatusShowArgs{
    status?: EStatus,
    message: ReactNode,
}

interface IStatusShowArgs {
    code?: string,
    path?: string,

    title?: ReactNode,
    isStatusIconVisible?: boolean,
    onSubmit?: TOnSubmit
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
    containerSelector?: () => HTMLElement | null
    id?: string
    isDark?: boolean
    className?: string
    isStatusIconVisible?: boolean
    renderButton?: (args: IButton) => ReactNode
    renderTextField?: <V extends string|number>(args: ITextField<V>) => ReactNode
    locale?: string
    localeDictionaries?: ILocaleDictionaries
    modalOptions?: IModalOptions
    onShow?: () => void
    onHide?: () => void

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

export enum EKeyboardKey {
    Escape = 'Escape',
    Enter = 'Enter',
    Tab = 'Tab',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    Yes = 'y',
    No = 'n',
}
