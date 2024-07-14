import {FunctionComponent, SVGProps} from 'react';

import SvgError from '../../../assets/error.svg?react';
import SvgInfo from '../../../assets/info.svg?react';
import SvgSuccess from '../../../assets/success.svg?react';
import SvgWarning from '../../../assets/warning.svg?react';
import {EStatus, TButtonColor} from '../../../types';
import styles from './message.module.scss';

interface IStatusConfig {
    icon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string; }>,
    titleI18n: string,
    elClass: string,
    mainBtnColor: TButtonColor,
}


export const themeMap: Record<EStatus, IStatusConfig> = {
    [EStatus.success]: {
        icon: SvgSuccess,
        titleI18n: 'success',
        elClass: styles.statusSuccess,
        mainBtnColor: 'success',
    },
    [EStatus.warning]: {
        icon: SvgWarning,
        titleI18n: 'warning',
        elClass: styles.statusWarning,
        mainBtnColor: 'warning',
    },
    [EStatus.info]: {
        icon: SvgInfo,
        titleI18n: 'info',
        elClass: styles.statusInfo,
        mainBtnColor: 'info',
    },
    [EStatus.error]: {
        icon: SvgError,
        titleI18n: 'danger',
        elClass: styles.statusDanger,
        mainBtnColor: 'danger',
    },
    [EStatus.confirm]: {
        icon: SvgWarning,
        titleI18n: 'confirm',
        elClass: styles.statusWarning,
        mainBtnColor: 'danger',
    },
};
