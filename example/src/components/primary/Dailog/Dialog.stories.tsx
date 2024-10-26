import type {Meta, StoryObj} from '@storybook/react';
import {dialog} from "@acrool/react-dialog";
import Button from "../../atoms/Button";



const meta = {
    title: 'Primary/Dialog',
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'toast show method'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {},
    render: function Render(args) {

        return <Button
            color="primary"
            onClick={() => {
                dialog({message: 'step1 test dialog', code: 'TEST1'});
            }}
        >
            Show
        </Button>;
    },
};

export const WithSuccess: Story = {
    args: {},
    render: function Render(args) {

        return <Button
            color="primary"
            onClick={() => {
                dialog.success('You have been logged in successfully',{
                    code: 'SYS_ERR_500',
                    path: 'auth/sign',
                })
            }}
        >
            Show
        </Button>;
    },
};




export const WithInfo: Story = {
    args: {},
    render: function Render(args) {

        return <div>

            <Button
                color="primary"
                onClick={() => {
                    dialog.info('You have a new message')
                }}
            >
                Show
            </Button>
        </div>;

    },
};

export const WithWarning: Story = {
    args: {},
    render: function Render(args) {

        return <div>

            <Button
                color="primary"
                onClick={() => {
                    dialog.warning('Please check if your parameter settings are correct?')
                }}
            >
                Show
            </Button>
        </div>;
    },
};



export const WithError: Story = {
    args: {},
    render: function Render(args) {

        return <div>

            <Button
                color="primary"
                onClick={() => {
                    dialog.error('Sorry, the account password you entered is wrong')
                }}
            >
                Show
            </Button>
        </div>;
    },
};


export const WithConfirm: Story = {
    args: {},
    render: function Render(args) {

        return <div>

            <Button
                color="primary"
                onClick={() => {
                    dialog.confirm(
                        'Type "1+1=?" to make sure you are sure you want to delete',
                        {
                            code: 'SYS_ERR_500',
                            path: 'auth/sign',
                            confirmPlaceholder: 'type your answer',
                            onSubmit: (confirmValue) => {
                                if(confirmValue !== '2'){
                                    dialog.error('not type is "2"');
                                    return false;
                                }
                                requestAnimationFrame(() => {
                                    dialog.success('The answer is correct');
                                });
                            }
                        })
                }}
            >
                Show
            </Button>
        </div>;
    },
};

export const WithErrorCode: Story = {
    args: {},
    render: function Render(args) {

        return <div>

            <Button
                color="primary"
                onClick={() => {
                    dialog.error(
                        'Add code info',
                        {
                            code: '@SYS_ERR_500',
                            path: 'auth/sign',
                        })
                }}
            >
                Show
            </Button>
        </div>;
    },
};

export const WithMultiShow: Story = {
    args: {},
    render: function Render(args) {

        return <div>

            <Button
                color="primary"
                onClick={() => {
                    dialog.error(
                        'Multi 1',
                        {
                            code: '@1',
                            path: 'auth/sign',
                        });

                    setTimeout(() => {
                        dialog.error(
                            'Multi 2',
                            {
                                code: '@2',
                                path: 'auth/sign',
                            });
                    }, 100);

                    setTimeout(() => {
                        dialog.error(
                            'Multi 3',
                            {
                                code: '@3',
                                path: 'auth/sign',
                            });
                    }, 200);
                }}
            >
                Show
            </Button>
        </div>;
    },
};


