import {dialog, EStatus} from '@acrool/react-dialog';
import AcroolTable from '@acrool/react-table';
import Button from '../../components/Button';


const Example = () => {


    return <div style={{display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%'}}>

        <AcroolTable
            isDark
            isVisiblePaginate={false}
            tableCellMediaSize={768}
            gap="10px"
            title={{
                name: {text: 'Name', col: '200px'},
                use: {text: 'Use', col: true},
            }}
            data={[
                {
                    id: 1,
                    onClickRow: () => {
                        dialog({message: 'step1 test dialog', code: 'TEST1'});
                        // dialog.error('step2 test dialog');
                    },
                    field: {
                        name: 'Default',
                        use: 'dialog({message: \'Good afternoon, Imagine how are you doing today?\'})',
                    }
                },
                {
                    id: 3,
                    onClickRow: () => dialog.success('You have been logged in successfully',{
                        code: 'SYS_ERR_500',
                        path: 'auth/sign',
                    }),
                    field: {
                        name: <Button color="success" size="md">Success</Button>,
                        use: 'dialog.success(\'You have been logged in successfully\')',
                    }
                },
                {
                    id: 4,
                    onClickRow: () => dialog.info('You have a new message'),
                    field: {
                        name: <Button color="info" size="md">Info</Button>,
                        use: 'dialog.info(\'You have a new message\')',
                    }
                },
                {
                    id: 5,
                    onClickRow: () => dialog.warning('Please check if your parameter settings are correct?'),
                    field: {
                        name: <Button color="warning" size="md">Warning</Button>,
                        use: 'dialog.warning(\'Please check if your parameter settings are correct?\')',
                    }
                },
                {
                    id: 6,
                    onClickRow: () => dialog.error('Sorry, the account password you entered is wrong'),
                    field: {
                        name: <Button color="danger" size="md">Error</Button>,
                        use: 'dialog.error(\'Sorry, the account password you entered is wrong\')',
                    }
                },
                // {
                //     id: 7,
                //     onClickRow: () => dialog({
                //         message: 'Please enter the name of the team you want to delete<store class="team-name">「Acrool Frontend」</store> and click OK to delete. Make sure you know what you are doing.',
                //         status: EStatus.error,
                //         code: 'SYS_ERR_500',
                //         path: 'auth/sign',
                //         confirmPlaceholder: 'type your team name',
                //         buttons: [
                //             {
                //                 children: 'Delete',
                //                 color: 'danger',
                //                 onClick: (e, confirmValue) => console.log(confirmValue)
                //             },
                //             {
                //                 children: 'Cancel',
                //                 color: 'gray'
                //             },
                //         ],
                //     }),
                //     field: {
                //         name: <Button color="grayDanger" size="md">Custom</Button>,
                //         use: 'dialog(\'You have been logged out successfully!\', {status: EStatus.success})',
                //     }
                // },
                {
                    id: 8,
                    onClickRow: () => dialog.confirm(
                        'Type "1+1=?" to make sure you are sure you want to delete',
                        {
                            code: 'SYS_ERR_500',
                            path: 'auth/sign',
                            confirmPlaceholder: 'type your answer',
                            onSubmit: (confirmValue) => {
                                console.log('xxx');
                                if(confirmValue !== '2'){
                                    dialog.error('not type is "2"');
                                    return false;
                                }
                                requestAnimationFrame(() => {
                                    dialog.success('The answer is correct');
                                });
                            }
                        }),
                    field: {
                        name: <Button color="grayDanger" size="md">Confirm</Button>,
                        use: 'dialog.confirm(\'Type "1+1=?" to make sure you are sure you want to delete\', {confirmPlaceholder: \'type your answer\'})',
                    }
                },
                {
                    id: 9,
                    onClickRow: () => dialog.error(
                        'Add code info',
                        {
                            code: '@SYS_ERR_500',
                            path: 'auth/sign',
                        }),
                    field: {
                        name: <Button color="grayDanger" size="md">Error</Button>,
                        use: 'dialog.error(\'Add code info\', {code: \'@SYS_ERR_500\', path: \'auth/sign\'})',
                    }
                },
                {
                    id: 10,
                    onClickRow: () => {
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

                    },
                    field: {
                        name: <Button color="grayDanger" size="md">Multi Show</Button>,
                        use: '',
                    }
                },

            ]}

        />


    </div>;
};

export default Example;




