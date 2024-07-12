import {EStatus, IButton, TOnButtonClick} from '../types';
import {ReactNode} from 'react';

export enum EVisible {
    visible,
    hiddenAction,
    hidden
}


export interface IMessageProps {
    code?: string,
    path?: string,
    status?: EStatus,
    title?: string,
    children: ReactNode
    onClick?: TOnButtonClick
    buttons?: IButton[]
    confirmPlaceholder?: string,
    renderButton?: (args: IButton) => ReactNode
}

export interface IDialogProps extends IMessageProps{
    isVisible: boolean,
    onEntered: () => void,
}
