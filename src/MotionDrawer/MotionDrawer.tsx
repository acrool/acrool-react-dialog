import {motion, Transition, Variants} from 'framer-motion';
import {ReactNode} from 'react';

import styles from './motion-drawer.module.scss';


const spring: Transition = {
    damping: .2,
};

const maskVariantsItem: Variants = {
    initial: {opacity: 0, transition: {type:'spring'}},
    show: {opacity: 1},
    exit: {opacity: 0, transition: {type:'spring'}},
};

const modalVariantsItem: Variants = {
    initial: {transform: 'scale(.5)'},
    show: {transform: 'scale(1)'},
    exit: {transform: 'scale(.9)'},
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

    return <motion.div
        className={styles.motionDrawer}
        transition={spring}
        variants={maskVariantsItem}
        initial="initial"
        animate="show"
        exit="exit"
    >
        <div className={styles.motionScrollWrapper}>
            <motion.div
                variants={modalVariantsItem}
            >
                {children}
            </motion.div>
        </div>
    </motion.div>;
};


export default MotionDrawer;

