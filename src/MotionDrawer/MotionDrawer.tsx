import {clsx} from 'clsx';
import {usePresence} from 'motion/react';
import {useAnimate} from 'motion/react-mini';
import {ReactNode, useEffect, useRef} from 'react';

import {IModalMotion, IModalOptions} from '../types';
import styles from './motion-drawer.module.scss';


/**
 * 預設動畫
 * 遮罩: 淡入、淡出
 * 內容: 進場由上方略為縮小處彈入，離場往上淡出
 */
const defaultMaskMotion: Required<IModalMotion> = {
    enter: {keyframes: {opacity: [0, 1]}, options: {duration: .3}},
    exit: {keyframes: {opacity: 0}, options: {duration: .3}},
};

const defaultContentMotion: Required<IModalMotion> = {
    enter: {
        keyframes: {opacity: [0, 1], transform: ['translateY(-20px) scale(.8)', 'translateY(0) scale(1)']},
        // 帶一點回彈的曲線，近似原本的 spring
        options: {duration: .4, ease: [.22, 1.2, .36, 1]},
    },
    exit: {
        keyframes: {opacity: 0, transform: 'translateY(-15px)'},
        options: {duration: .3, ease: 'easeIn'},
    },
};

interface IProps {
    modalOptions?: IModalOptions
    children: ReactNode
}


/**
 * 是否不播放動畫
 * - 環境不支援 Web Animations API (例如測試環境)
 * - 使用者開啟「減少動態效果」
 */
const checkIsSkipMotion = (el: Element|null): boolean => {
    if(!el || typeof el.animate !== 'function') return true;
    return typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};


/**
 * 開啟動畫抽屜
 *
 * 離場後才移除節點由 AnimatePresence + usePresence 處理 (需放在 AnimatePresence 內)，
 * 動畫由 motion mini (Web Animations API) 播放
 *
 * @param children
 * @param modalOptions
 */
const MotionDrawer = ({
    children,
    modalOptions,
}: IProps) => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const maskRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const maskEl = maskRef.current;
        const contentEl = contentRef.current;
        const step = isPresent ? 'enter': 'exit';
        const contentMotion = modalOptions?.motion?.[step] ?? defaultContentMotion[step];
        const maskMotion = defaultMaskMotion[step];

        if(checkIsSkipMotion(contentEl) || !maskEl || !contentEl){
            if(!isPresent) safeToRemove?.();
            return;
        }

        const animations = [
            animate(maskEl, maskMotion.keyframes, maskMotion.options),
            animate(contentEl, contentMotion.keyframes, contentMotion.options),
        ];

        if(!isPresent){
            // 離場動畫播完才讓 AnimatePresence 移除節點；動畫被中斷時也要移除，避免節點殘留
            Promise.all(animations)
                .catch(() => undefined)
                .then(() => safeToRemove?.());
        }
    }, [isPresent]);

    return <div
        ref={scope}
        className={styles.motionDrawer}
        data-exiting={isPresent ? undefined: ''}
    >
        <div ref={maskRef} className={styles.motionMaskWrapper}/>
        <div
            ref={contentRef}
            className={clsx(styles.motionAnimationWrapper, modalOptions?.className)}
        >
            {children}
        </div>
    </div>;
};


export default MotionDrawer;
