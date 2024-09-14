import {DialogWrapper, EStatus} from '@acrool/react-dialog';
import {Flex} from '@acrool/react-grid';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {createElement, Fragment} from 'react';

import Button from '../src/components/Button';
import TextField from '../src/components/TextField/TextField';


const meta = {
    title: 'Components/DialogWrapper',
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
        isDark: false,
        isVisibleStatusIcon: true,
        status: EStatus.success,
        onClick: fn(),
        message: 'Your profile save success',
        // locale = 'en-US',
        // localeDictionaries,
    },
} satisfies Meta<typeof DialogWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;




export const WithSuccess: Story = {
    args: {
        status: EStatus.success,
        message: 'Your profile save success',
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};



export const WithInfo: Story = {
    args: {
        status: EStatus.info,
        message: 'You have a long message',
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};


export const WithWarning: Story = {
    args: {
        status: EStatus.warning,
        message: 'Are you sure you want to submit the form?',
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};


export const WithError: Story = {
    args: {
        status: EStatus.error,
        message: 'No permission to operate this feature',
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};




export const WithDebugInfo: Story = {
    args: {
        status: EStatus.error,
        message: 'No permission to operate this feature',
        code: 'SYS_777',
        path: '/auth/me',
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};


export const WithConfirm: Story = {
    args: {
        status: EStatus.confirm,
        title: 'Confirm',
        message: 'No permission to operate this feature',
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};







export const WithCustomTitle: Story = {
    args: {
        status: EStatus.info,
        title: 'Upgrade',
        message: 'There is now a new version that can be upgraded.',
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
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
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
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
        // renderTextField: args => {
        //     return <TextField type="text" {...args}/>;
        // },
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
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
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};


export const WithRenderButton: Story = {
    args: {
        status: EStatus.confirm,
        title: 'Confirm',
        message: 'Do you need help organizing your files today?',
        renderButton: args => createElement(Button, args, args.children),
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};



export const WithLocale: Story = {
    args: {
        locale: 'zh-TW'
    },
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
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
    render: function Render(args) {

        return <Flex className="gap-2">
            <DialogWrapper {...args}/>
            <DialogWrapper {...args} isDark/>
        </Flex>;
    },
};


