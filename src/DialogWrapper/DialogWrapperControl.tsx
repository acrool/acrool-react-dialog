import React, {ReactNode, useCallback, useEffect, useState} from 'react';

import MotionDrawer from '../MotionDrawer';
import {TOnExitComplete} from '../types';
import {IButton, ITextField} from '../types';
import Message from './_components/Message';
import {IMessageProps} from './types';

interface IProps extends IMessageProps{
    onExitComplete: TOnExitComplete,
    renderButton: (args: IButton) => ReactNode
    renderTextField: (args: ITextField) => ReactNode
}


/**
 * 控制 Dialog
 * @param status
 * @param code
 * @param path
 * @param onClick
 * @param buttons
 * @param confirmPlaceholder
 * @param children
 * @param renderButton
 * @param renderTextField
 * @param onExitComplete
 */
const DialogWrapperControl = ({
    onExitComplete,

    status,
    code,
    path,
    onClick,
    buttons,
    confirmPlaceholder,
    children,
    renderButton,
    renderTextField,
}: IProps) => {
    const [isVisible, setVisible] = useState<boolean>(true);

    /**
     * 隱藏
     * handleHidden 動畫結束後 -> onExitComplete
     */
    const handleHidden = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <MotionDrawer
            isVisible={isVisible}
            onExitComplete={onExitComplete}
        >
            <Message
                onClose={handleHidden}

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

export default DialogWrapperControl;

