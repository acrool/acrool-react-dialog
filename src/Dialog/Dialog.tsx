import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import Message from './_components/Message';
import MotionDrawer from './_components/MotionDrawer';
import {EVisible, IDialogProps} from './types';
import {IButton, ITextField} from '../types';

interface IProps extends IDialogProps{
    renderButton: (args: IButton) => ReactNode
    renderTextField: (args: ITextField) => ReactNode
}



const Dialog = ({
    status,
    code,
    path,
    onClick,
    buttons,
    confirm,
    children,
    renderButton,
    renderTextField,
}: IProps) => {
    const [visible, setVisible] = useState<EVisible>(EVisible.visible);




    const handleHidden = useCallback(() => {
        setVisible(EVisible.hidden);
    }, []);

    const handleHiddenAction = useCallback(() => {
        setVisible(EVisible.hiddenAction);
    }, []);


    if(visible === EVisible.hidden){
        return null;
    }

    
    return (
        <MotionDrawer visible={visible} onExitComplete={handleHidden}>
            <Message
                onClose={handleHiddenAction}
                status={status}
                code={code}
                path={path}
                onClick={onClick}
                buttons={buttons}
                confirm={confirm}
                renderButton={renderButton}
                renderTextField={renderTextField}
            >
                {children}
            </Message>
        </MotionDrawer>
    );
};

export default Dialog;

