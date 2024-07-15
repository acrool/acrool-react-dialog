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
                        onClick: () => console.log('xxx'),
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
                        name: <Button color="danger" size="md">Danger</Button>,
                        use: 'dialog.danger(\'Sorry, the account password you entered is wrong\')',
                    }
                },
                {
                    id: 7,
                    onClickRow: () => dialog({
                        message: 'Please enter the name of the team you want to delete<store class="team-name">「Acrool Frontend」</store> and click OK to delete. Make sure you know what you are doing.',
                        status: EStatus.danger,
                        code: 'SYS_ERR_500',
                        path: 'auth/sign',
                        confirmPlaceholder: 'type your team name',
                        buttons: [
                            {
                                children: 'Delete',
                                color: 'danger',
                                onClick: (e, confirmValue) => console.log(confirmValue)
                            },
                            {
                                children: 'Cancel',
                                color: 'gray'
                            },
                        ],
                    }),
                    field: {
                        name: <Button color="grayDanger" size="md">Custom</Button>,
                        use: 'dialog(\'You have been logged out successfully!\', {status: EStatus.success})',
                    }
                },
                {
                    id: 8,
                    onClickRow: () => dialog.confirm(
                        'Type "1+1=?" to make sure you are sure you want to delete',
                        {
                            code: 'SYS_ERR_500',
                            path: 'auth/sign',
                            confirmPlaceholder: 'type your answer',
                            onClick: (e, confirmValue) => confirmValue === '2'
                        }),
                    field: {
                        name: <Button color="grayDanger" size="md">Confirm</Button>,
                        use: 'dialog(\'You have been logged out successfully!\', {status: EStatus.success})',
                    }
                },

            ]}

        />


    </div>;
};

export default Example;




