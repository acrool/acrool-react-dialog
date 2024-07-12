import React, {useCallback, useEffect, useState} from 'react';
import {ulid} from 'ulid';
import {removeByIndex} from '../utils';
import {EStatus, IItem, THidden, TShow, TShowMulti} from '../types';
import DialogWithPortal from './DialogWithPortal';
import Dialog from '../Dialog';
import {IDialogPortalProps} from './types';
import {defaultTimeout, rootId} from '../config';


/**
 * Global var
 */
export let dialog: TShowMulti;

const DialogPortal: React.FC<IDialogPortalProps> = (props) => {
    const [item, setItem] = useState<IItem>();

    // set global
    useEffect(() => {
        dialog = show as TShowMulti;

        dialog.success = (message, args) => show({...args, message, status: EStatus.success});
        dialog.warning = (message, args) => show({...args, message, status: EStatus.warning});
        dialog.danger = (message, args) => show({...args, message, status: EStatus.danger});
        dialog.info = (message, args) => show({...args, message, status: EStatus.info});
    }, []);


    /**
     * 顯示 Dialog
     * @param newItem
     */
    const show: TShow = useCallback((args) => {
        const key = ulid().toLowerCase();

        setItem({key, ...args});
    }, []);


    /**
     * 隱藏 Dialog
     * @param key
     */
    const hidden: THidden = useCallback((key) => {
        setItem(undefined);
    }, []);


    /**
     * 渲染項目
     */
    const renderItem = () => {
        const {message, key,...itemArg} = item;
        return <Dialog
            key={key}
            isVisible={true}
            onEntered={() => hidden(key)}
            timeout={props.defaultTimeout || defaultTimeout}
            renderButton={props.renderButton}
            renderTextField={props.renderTextField}
            {...itemArg}
        >
            {message}
        </Dialog>;
    };

    return (
        <DialogWithPortal id={props.id || rootId}>
            {item && renderItem()}
        </DialogWithPortal>
    );
};

export default DialogPortal;
