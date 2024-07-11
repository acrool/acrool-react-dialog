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
    const [items, setItems] = useState<IItem[]>([]);

    // set global
    useEffect(() => {
        dialog = show as TShowMulti;
        dialog.success = (item) => show({...item, status: EStatus.success});
        dialog.warning = (item) => show({...item, status: EStatus.warning});
        dialog.danger = (item) => show({...item, status: EStatus.danger});
        dialog.info = (item) => show({...item, status: EStatus.info});
    }, []);


    /**
     * 顯示 Dialog
     * @param newItem
     */
    const show: TShow = useCallback((newItem) => {
        const key = ulid().toLowerCase();

        setItems(prevItems => [{key, ...newItem}, ...prevItems, ]);
    }, []);


    /**
     * 隱藏 Dialog
     * @param key
     */
    const hidden: THidden = useCallback((key) => {
        setItems(prevItems => {
            const index = prevItems.findIndex(row => row.key === key);
            return removeByIndex(prevItems, index);
        });
    }, []);


    /**
     * 渲染項目
     */
    const renderItems = () => {

        return items.map(item => {
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
        });
    };

    return (
        <DialogWithPortal id={props.id || rootId}>
            {renderItems()}
        </DialogWithPortal>
    );
};

export default DialogPortal;
