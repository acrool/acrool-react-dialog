import {clsx} from 'clsx';
import {motion, Variants} from 'framer-motion';
import {ReactNode} from 'react';

import {IModalOptions} from '../types';
import styles from './motion-drawer.module.scss';




const maskMotionProps: IModalOptions = {
    variants: {
        initial: {opacity: 0},
        show: {opacity: 1, transition: {type: 'just'}},
        exit: {opacity: 0},
    },
    transition: {
        duration: .3,
    }
};


const modalVariantsItem: Variants = {
    initial: {scaleX: .8, scaleY: .8, scaleZ: .9, translateX: 0, translateY: -20, translateZ: 0, opacity: 0},
    show: {scaleX: 1, scaleY: 1, scaleZ: 1, translateX: 0, translateY: 0, translateZ: 0, opacity: 1, transition: {type: 'spring', restDelta: .2, duration: .4}},
    exit: {translateX: 0, translateY: -15, translateZ: 0, opacity: 0, transition: {type:'spring', duration: .3}},
};

interface IProps {
    modalOptions?: IModalOptions
    children: ReactNode
}


/**
 * 開啟動畫抽屜
 * @param children
 * @param modalOptions
 */
const MotionDrawer = ({
    children,
    modalOptions,
}: IProps) => {
    const {className, ...dialogProps} = modalOptions ?? {className: ''};

    return <div className={styles.motionDrawer}>
        <motion.div
            className={styles.motionMaskWrapper}
            {...maskMotionProps}
            initial="initial"
            animate="show"
            exit="exit"
        />
        <motion.div
            transition={{type: 'spring', duration: .2}}
            className={clsx(styles.motionAnimationWrapper, className)}
            variants={modalVariantsItem}
            {...dialogProps}
            initial="initial"
            animate="show"
            exit="exit"
        >
            {children}
        </motion.div>
    </div>;
};


export default MotionDrawer;

