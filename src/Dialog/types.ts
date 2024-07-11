import {EStatus, IButton} from '../types';
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
    children: ReactNode
    buttons?: IButton[]
    confirm?: string,
    renderButton?: (args: IButton) => ReactNode
}

export interface IDialogProps extends IMessageProps{
    isVisible: boolean,
    onEntered: () => void,
    timeout?: number,
}
