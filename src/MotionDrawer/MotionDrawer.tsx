import {motion, Variants} from 'framer-motion';
import {ReactNode} from 'react';

import {IDialogOptions} from '../types';
import styles from './motion-drawer.module.scss';




const maskMotionProps: IDialogOptions = {
    variants: {
        initial: {opacity: 0, transition: {type:'spring'}},
        show: {opacity: 1, transition: {type: 'just'}},
        exit: {opacity: 0},
    },
    transition: {
        duration: .3,
    }
};


const modalVariantsItem: Variants = {
    initial: {scaleX: .5, scaleY: .5, scaleZ: .8, translateX: 0, translateY: -20, translateZ: 0, opacity: 0, transition: {type: 'spring', duration: .2}},
    show: {scaleX: 1, scaleY: 1, scaleZ: 1, translateX: 0, translateY: 0, translateZ: 0, opacity: 1, transition: {type: 'spring', restDelta: .5}},
    exit: {scaleX: .8, scaleY: .8, scaleZ: .8, translateX: 0, translateY: -20, translateZ: 0, opacity: 0, transition: {type:'spring', duration: .4}},
};

interface IProps {
    children: ReactNode
}


/**
 * 開啟動畫抽屜
 * @param children
 */
const MotionDrawer = ({
    children,
}: IProps) => {

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
            className={styles.motionAnimationWrapper}
            variants={modalVariantsItem}
            initial="initial"
            animate="show"
            exit="exit"
        >
            {children}
        </motion.div>
    </div>;
};


export default MotionDrawer;

