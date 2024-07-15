import {ReactNode} from 'react';

import {EStatus, IButton, TOnButtonClick} from '../types';



export interface IDialogWrapperProps {
    code?: string,
    path?: string,
    status?: EStatus,
    title?: string,
    message: ReactNode
    onClick?: TOnButtonClick
    buttons?: IButton[]
    confirmPlaceholder?: string,
    renderButton?: (args: IButton) => ReactNode
}

