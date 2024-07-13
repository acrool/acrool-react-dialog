import {AnimatePresence, motion} from 'framer-motion';
import {ReactNode} from 'react';
import styles from './motion-drawer.module.scss';


const spring = {
    damping: .2,
};


interface IProps {
    isVisible: boolean
    onExitComplete: () => void
    children: ReactNode
}


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

/**
 * 右側半抽屜彈窗
 * @param isVisible
 * @param visible
 * @param onExitComplete
 * @param children
 */
const MotionRightDrawer = ({
    isVisible,
    onExitComplete,
    children,
}: IProps) => {
    return <>
        <AnimatePresence onExitComplete={onExitComplete}>
            {isVisible &&
                <motion.div
                    className={styles.motionMaskWrapper}
                    key="dialog"
                    transition={spring}
                    variants={maskVariantsItem}
                    initial="hidden"
                    animate="visible"
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

                </motion.div>
            }
        </AnimatePresence>

    </>;

};


export default MotionRightDrawer;

