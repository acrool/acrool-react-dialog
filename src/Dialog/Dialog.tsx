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
    confirmPlaceholder,
    children,
    renderButton,
    renderTextField,
    onExitComplete,
}: IProps) => {
    const [visible, setVisible] = useState<EVisible>(EVisible.visible);


    const handleHiddenAction = useCallback(() => {
        setVisible(EVisible.hidden);
    }, []);

    
    return (
        <MotionDrawer visible={visible} onExitComplete={onExitComplete}>
            <Message
                onClose={handleHiddenAction}
                status={status}
                code={code}
                path={path}
                onClick={onClick}
                buttons={buttons}
                confirmPlaceholder={confirmPlaceholder}
                renderButton={renderButton}
                renderTextField={renderTextField}
            >
                {children}
            </Message>
        </MotionDrawer>
    );
};

export default Dialog;

