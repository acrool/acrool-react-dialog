import {DialogPortal} from '@acrool/react-dialog';

import './App.css';
import Example from './views/Example';
import Banner from './components/Banner';
import {GridThemeProvider} from '@acrool/react-grid';
import Button from './components/Button';
import TextField from './components/TextField';
import styled from "styled-components";



function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>
                <Example/>

                <DialogPortal
                    locale={{
                        'com.dialog.success': '成功',
                        'com.dialog.danger': '失敗',
                        'com.dialog.info': '資訊',
                        'com.dialog.warning': '警告',
                        'com.dialog.confirm': '確認',
                        'com.dialog.ok': '確定',
                        'com.dialog.cancel': '取消',
                    }}
                    isVisibleStatusIcon
                    renderButton={(args) => {
                        return <Button
                            className={args.className}
                            children={args.children}
                            color={args.color}
                            onClick={args.onClick}
                            isBlock
                            size="md"
                        />;
                    }}
                    renderTextField={(args) => {
                        return <TextField
                            {...args}
                            isAutoFocus
                        />;
                    }}
                />

            </div>
        </GridThemeProvider>
    );

}

export default App;
