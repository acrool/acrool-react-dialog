import {EStatus, TButtonColor} from '../../../types';
import Icon from '../Icon/Icon';
import styles from './message.module.scss';
import {ReactNode} from 'react';

interface IStatusConfig {
    icon: () => ReactNode,
    titleI18n: string,
    elClass: string,
    mainBtnColor: TButtonColor,
}


export const themeMap: Record<EStatus, IStatusConfig> = {
    [EStatus.success]: {
        icon: Icon.success,
        titleI18n: 'success',
        elClass: styles.statusSuccess,
        mainBtnColor: 'success',
    },
    [EStatus.warning]: {
        icon: Icon.warning,
        titleI18n: 'warning',
        elClass: styles.statusWarning,
        mainBtnColor: 'warning',
    },
    [EStatus.info]: {
        icon: Icon.info,
        titleI18n: 'info',
        elClass: styles.statusInfo,
        mainBtnColor: 'info',
    },
    [EStatus.danger]: {
        icon: Icon.danger,
        titleI18n: 'danger',
        elClass: styles.statusDanger,
        mainBtnColor: 'danger',
    },
    [EStatus.confirm]: {
        icon: Icon.warning,
        titleI18n: 'confirm',
        elClass: styles.statusWarning,
        mainBtnColor: 'danger',
    },
};
