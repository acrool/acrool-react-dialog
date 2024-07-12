import {FC, ReactNode} from 'react';
import {IButton, ITextField} from '../types';

export interface IDialogPortalProps {
    id?: string
    renderButton?: (args: IButton) => ReactNode;
    renderTextField?: (args: ITextField) => ReactNode;
}
