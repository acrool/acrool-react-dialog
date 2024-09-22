import {ReactNode} from 'react';

import {EStatus, IButton, TOnSubmit} from '../types';



export interface IDialogWrapperProps {
    code?: string,
    path?: string,
    status?: EStatus,
    title?: string,
    message: ReactNode|string
    onSubmit?: TOnSubmit
    buttons?: IButton[]
    confirmPlaceholder?: string,
    renderButton?: (args: IButton) => ReactNode
}

