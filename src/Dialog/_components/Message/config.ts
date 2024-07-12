import {EStatus} from '../../../types';
import Icon from '../Icon/Icon';
import styles from './message.module.scss';
import {ReactNode} from 'react';

interface IStatusConfig {
    icon: () => ReactNode,
    titleI18n: string,
    elClass: string,
}


export const themeMap: Record<EStatus, IStatusConfig> = {
    [EStatus.success]: {
        icon: Icon.success,
        titleI18n: 'success',
        elClass: styles.statusSuccess,
    },
    [EStatus.warning]: {
        icon: Icon.warning,
        titleI18n: 'warning',
        elClass: styles.statusWarning,
    },
    [EStatus.info]: {
        icon: Icon.info,
        titleI18n: 'info',
        elClass: styles.statusInfo,
    },
    [EStatus.danger]: {
        icon: Icon.danger,
        titleI18n: 'danger',
        elClass: styles.statusDanger,
    },
};
