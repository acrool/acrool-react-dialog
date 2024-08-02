import './common.css';

import ReactPortal from '@acrool/react-portal';
import {clsx} from 'clsx';
import {AnimatePresence} from 'framer-motion';
import React from 'react';
import {ulid} from 'ulid';

import {rootId} from './config';
import styles from './dialog.module.scss';
import DialogWrapper from './DialogWrapper';
import MotionDrawer from './MotionDrawer';
import {EStatus, IDialogProps, IRow, THide, TShow, TShowMulti} from './types';

/**
 * Global var
 */
export let dialog: TShowMulti;

interface IState {
    row?: IRow
}

class Dialog extends React.Component<IDialogProps, IState> {
    state: IState = {
        row: undefined
    };

    get typeProps(){
        return this.props as IDialogProps;
    }

    constructor(props) {
        super(props);

        dialog = this.show as TShowMulti;

        dialog.success = (message, args) => this.show({...args, message, status: EStatus.success});
        dialog.warning = (message, args) => this.show({...args, message, status: EStatus.warning});
        dialog.error = (message, args) => this.show({...args, message, status: EStatus.error});
        dialog.info = (message, args) => this.show({...args, message, status: EStatus.info});
        dialog.confirm = (message, args) => this.show({...args, message, status: EStatus.confirm});

    }


    /**
     * 顯示 Dialog
     * @param args
     */
    show: TShow = (args) => {
        this.setState({row: args});
    };


    /**
     * 刪除 Dialog 在 Dom 中
     */
    hide: THide = () => {
        this.setState({row: undefined});
    };


    /**
     * 渲染項目
     */
    renderDialog = () => {
        const {row} = this.state;

        if (!row) {
            return null;
        }

        const queueKey = ulid();

        return <MotionDrawer
            key={queueKey}
            modalOptions={this.typeProps.modalOptions}
        >
            <DialogWrapper
                onClose={this.hide}
                isVisibleStatusIcon={this.typeProps.isVisibleStatusIcon}
                renderButton={this.typeProps.renderButton}
                renderTextField={this.typeProps.renderTextField}
                locale={this.typeProps.locale}
                {...row}
            />
        </MotionDrawer>;
    };


    render() {
        return (
            <ReactPortal
                id={this.typeProps.id || rootId}
                className={clsx(
                    styles.root,
                    {'dark-theme': true},
                    this.typeProps.className
                )}
            >
                <AnimatePresence>
                    {this.renderDialog()}
                </AnimatePresence>
            </ReactPortal>
        );
    }
}

export default Dialog;
