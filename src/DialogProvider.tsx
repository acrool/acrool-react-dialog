import Logger from '@acrool/js-logger';
import React, {createContext, useContext} from 'react';

import {TOnSubmit} from './types';



interface IContextProps<T = any> {
    hide: () => void
    onSubmit?: TOnSubmit
}

export const DialogProviderContext = createContext<IContextProps>({
    hide: () => Logger.warning('No hide method detected, did you embed your app with Acrool/DialogPortal?'),
    onSubmit: () => Logger.warning('No onSubmit method detected, did you embed your app with Acrool/DialogPortal?'),
});

export const DialogProviderConsumer = DialogProviderContext.Consumer;

export const useDialog = () => useContext(DialogProviderContext);
