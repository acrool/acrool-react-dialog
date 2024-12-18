import ReactPortal from '@acrool/react-portal';
import {clsx} from 'clsx';
import {AnimatePresence} from 'framer-motion';
import React from 'react';
import {ulid} from 'ulid';

import styles from './dialog.module.scss';
import {DialogProviderContext} from './DialogProvider';
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

    static defaultProps = {
        id: 'acrool-react-dialog',
    };

    get typeProps(){
        return this.props as IDialogProps & typeof Dialog.defaultProps;
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
        if(!this.state.row){
            this.setState({row: args});

            if(this.typeProps.onShow){
                this.typeProps.onShow();
            }
        }
    };


    /**
     * 刪除 Dialog 在 Dom 中
     */
    hide: THide = () => {
        this.setState({row: undefined});

        if(this.typeProps.onHide){
            this.typeProps.onHide();
        }
    };


    /**
     * 渲染項目
     */
    renderDialog = () => {
        const {row} = this.state;

        if (!row) {
            return null;
        }

        const {onSubmit, ...baseRow} = row;
        const queueKey = ulid();

        return <MotionDrawer
            key={queueKey}
            modalOptions={this.typeProps.modalOptions}
        >
            <DialogProviderContext.Provider value={{
                hide: this.hide,
                onSubmit,
            }}>
                <DialogWrapper
                    isDark={this.typeProps.isDark}
                    isStatusIconVisible={this.typeProps.isStatusIconVisible}
                    renderButton={this.typeProps.renderButton}
                    renderTextField={this.typeProps.renderTextField}
                    locale={this.typeProps.locale}
                    localeDictionaries={this.typeProps.localeDictionaries}
                    {...row}
                />
            </DialogProviderContext.Provider>
        </MotionDrawer>;
    };


    render() {
        return (
            <ReactPortal
                id={this.typeProps.id}
                className={clsx(
                    styles.root,
                    this.typeProps.className
                )}
                containerSelector={this.typeProps.containerSelector}
            >
                <AnimatePresence>
                    {this.renderDialog()}
                </AnimatePresence>
            </ReactPortal>
        );
    }
}

export default Dialog;
