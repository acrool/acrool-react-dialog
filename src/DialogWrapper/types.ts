import {ReactNode} from 'react';

import {EStatus, IButton, TOnButtonClick} from '../types';



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

