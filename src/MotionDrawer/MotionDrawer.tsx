import {motion} from 'framer-motion';
import {ReactNode} from 'react';

import styles from './motion-drawer.module.scss';


const spring = {
    damping: .2,
};

const maskVariantsItem = {
    initial: {opacity: 0, transition: {type:'spring'}},
    visible: {opacity: 1},
    hidden: {opacity: 0},
};

const modalVariantsItem = {
    initial: {transform: 'scale(0)'},
    visible: {transform: 'scale(1)'},
    hidden: {transform: 'scale(0)'},
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
        key="modal"
        transition={spring}
        variants={maskVariantsItem}
        animate="visible"
        initial="initial"
        exit="hidden"
    >
        <div className={styles.motionScrollWrapper}>
            <motion.div
                variants={modalVariantsItem}
                transition={{type: 'spring', duration: 0.5}}
            >
                {children}
            </motion.div>
        </div>
    </motion.div>;
};


export default MotionDrawer;

