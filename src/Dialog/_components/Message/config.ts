import {EStatus} from '../../../types';
import Icon from '../Icon/Icon';
import styles from './message.module.scss';
import {ReactNode} from 'react';

interface IStatusConfig {
    icon: () => ReactNode,
    title: string,
    elClass: string,
}


export const themeMap: Record<EStatus, IStatusConfig> = {
    [EStatus.success]: {
        icon: Icon.success,
        title: 'Success',
        elClass: styles.statusSuccess,
    },
    [EStatus.warning]: {
        icon: Icon.warning,
        title: 'Warning',
        elClass: styles.statusWarning,
    },
    [EStatus.info]: {
        icon: Icon.info,
        title: 'Info',
        elClass: styles.statusInfo,
    },
    [EStatus.danger]: {
        icon: Icon.danger,
        title: 'Danger',
        elClass: styles.statusDanger,
    },
};
