import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useEffect, useState} from 'react';

import {rootId} from './config';
import styles from './dialog.module.scss';
import DialogWrapper from './DialogWrapper';
import MotionDrawer from './MotionDrawer';
import {EStatus, IDialogProps, IRow, THidden, TShow, TShowMulti} from './types';


/**
 * Global var
 */
export let dialog: TShowMulti;



const Dialog = (props: IDialogProps) => {
    const [row, setRow] = useState<IRow>();

    // set global
    useEffect(() => {
        dialog = show as TShowMulti;

        dialog.success = (message, args) => show({...args, message, status: EStatus.success});
        dialog.warning = (message, args) => show({...args, message, status: EStatus.warning});
        dialog.error = (message, args) => show({...args, message, status: EStatus.error});
        dialog.info = (message, args) => show({...args, message, status: EStatus.info});
        dialog.confirm = (message, args) => show({...args, message, status: EStatus.confirm});
    }, []);


    /**
     * 顯示 Dialog
     * @param newItem
     */
    const show: TShow = useCallback((args) => {
        setRow(args);
    }, []);


    /**
     * 刪除 Dialog 在 Dom 中
     * @param key
     */
    const hidden: THidden = useCallback(() => {
        setRow(undefined);
    }, []);


    /**
     * 渲染項目
     */
    const renderDialog = () => {

        if(!row){
            return null;
        }

        return <MotionDrawer>
            <DialogWrapper
                onClose={hidden}
                renderButton={props.renderButton}
                renderTextField={props.renderTextField}
                {...row}
            />
        </MotionDrawer>;
    };

    return (
        <ReactPortal
            id={props.id || rootId}
            className={styles.root}
        >
            <AnimatePresence>
                {renderDialog()}
            </AnimatePresence>
        </ReactPortal>
    );
};

export default Dialog;
