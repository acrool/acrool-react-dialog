import {DialogWrapper, EStatus} from '@acrool/react-dialog';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';
import React, {createElement} from 'react';
import {useDarkMode} from 'storybook-dark-mode';

import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';


const meta = {
    title: 'Primary/DialogWrapper',
    component: DialogWrapper,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Custom skeleton by component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        isStatusIconVisible: true,
        status: EStatus.success,
        // onClick: fn(),
        message: 'Your profile save success',
        // locale = 'en-US',
        // localeDictionaries,
        renderButton: args => <Button
            {...args}
        />,
        renderTextField: args => <TextField
            type="text"
            {...args}
            onChange={args.onChange as (val: string) => void}
            value={args.value as string}
        />,
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        return <DialogWrapper  {...args} isDark={isDark}/>;
    },
} satisfies Meta<typeof DialogWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;




export const WithSuccess: Story = {
    args: {
        status: EStatus.success,
        message: 'Your profile save success',
    },
};



export const WithInfo: Story = {
    args: {
        status: EStatus.info,
        message: 'You have a long message',
    },
};


export const WithWarning: Story = {
    args: {
        status: EStatus.warning,
        message: 'Are you sure you want to submit the form?',
    },
};


export const WithError: Story = {
    args: {
        status: EStatus.error,
        message: 'No permission to operate this feature',
    },
};




export const WithDebugInfo: Story = {
    args: {
        status: EStatus.error,
        message: 'No permission to operate this feature',
        code: 'SYS_777',
        path: '/auth/me',
    },
};


export const WithConfirm: Story = {
    args: {
        status: EStatus.confirm,
        title: 'Confirm',
        message: 'No permission to operate this feature',
    },
};







export const WithCustomTitle: Story = {
    args: {
        status: EStatus.info,
        title: 'Upgrade',
        message: 'There is now a new version that can be upgraded.',
    },
};


export const WithConfirmInput: Story = {
    args: {
        status: EStatus.confirm,
        title: 'Confirm',
        message: 'The same name appears in the system, please enter a new name',
        code: 'SYS_666',
        confirmPlaceholder: 'type your new name',
    },
};


export const WithRenderInput: Story = {
    args: {
        status: EStatus.confirm,
        title: 'Confirm',
        message: 'The same name appears in the system, please enter a new name',
        code: 'SYS_666',
        confirmPlaceholder: 'type your new name',
        renderTextField: args => createElement(TextField, args, null),
    },
};



export const WithCustomButtons: Story = {
    args: {
        status: EStatus.confirm,
        title: 'Confirm',
        message: 'Do you need help organizing your files today?',
        buttons: [
            {children: 'Yes', onClick: action('[Yes].onClick')},
            {children: 'No', onClick: action('[No].onClick')}
        ]
    },
};


export const WithRenderButton: Story = {
    args: {
        status: EStatus.confirm,
        title: 'Confirm',
        message: 'Do you need help organizing your files today?',
        renderButton: args => createElement(Button, args, args.children),
    },
};



export const WithLocale: Story = {
    args: {
        locale: 'zh-TW'
    },
};



export const WithLocaleDictionaries: Story = {
    args: {
        locale: 'ko-KR',
        localeDictionaries: {
            'ko-KR': {
                'com.dialog.success': '성공',
                'com.dialog.error': '실패',
                'com.dialog.info': '정보',
                'com.dialog.warning': '경고',
                'com.dialog.confirm': '확인',
                'com.dialog.ok': '알겠습니다',
                'com.dialog.cancel': '취소',
            }
        }
    },
};


