import {media} from '@acrool/react-grid';
import React from 'react';
import styled, {css} from 'styled-components';

import HotKey from '@/components/atoms/HotKey';
import Tooltips from '@/components/atoms/Tooltips';
import {ActionButton} from '@/components/molecules/ActionsButton';
import Icon, {EIconCode} from '@/library/acrool-react-icon';



interface IData {
    iconCode: EIconCode
    text: string
    rotate?: number
    onClick?: () => void
    isReloading?: boolean
    hotKey?: string
    isHidden?: boolean
}

interface IProps extends FCProps {
    maxLimit?: number
    size?: number
    data?: IData[]
}

/**
 * 按鈕群組
 */
const ButtonGroup = ({
    style,
    className,
    data,
}: IProps) => {


    return (
        <AvatarGroupRoot style={style} className={className}>
            {data
                ?.filter(row => !row.isHidden)
                .map((row, index) => {
                    return <Tooltips text={row.text} key={row.iconCode}>
                        <GrayActionButton
                            index={index}
                            onClick={row.onClick}
                            isReloading={row.isReloading}
                            disabled={row.isReloading}
                        >
                            <Icon code={row.iconCode} size="18px" sm="23px" md="18px" rotate={row.rotate} color="#fff"/>
                            {row.hotKey &&
                            <HotKey hotKey={row.hotKey} fn={row.onClick}/>
                            }
                        </GrayActionButton>
                    </Tooltips>;
                })}
        </AvatarGroupRoot>
    );

};

export default ButtonGroup;



const GrayActionButton = styled(ActionButton)<{
    index?: number,
    size?: number,
    isReloading?: boolean,
}>`

    @keyframes loadingRotate {
        100% {
            transform: rotate(360deg);
        }
    }

    background-image: linear-gradient(to top, #4b4b4b 0%, rgb(59, 59, 59) 100%);
    box-shadow: rgba(0, 0, 0, 0);
    transition: all .3s;

    > svg{
        color: #fff;
        animation: loadingRotate 1s linear infinite;
        animation-play-state: ${props => props.isReloading ? 'running': 'paused'};
    }


    ${media.lg`
        :hover{
            box-shadow: rgba(0, 0, 0, 0.73) -1px 1px 7px 1px;
            background-image: linear-gradient(to top, var(--primary-color) 0%, #005bea 100%);
            > svg {
                color: #fff;
            }
        }
    `}



`;


const AvatarGroupRoot = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    position: relative;
    align-items: center;
`;
