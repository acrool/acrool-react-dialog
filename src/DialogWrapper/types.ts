import {EStatus, IButton, TOnButtonClick} from '../types';
import {ReactNode} from 'react';



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

