import {DialogPortal} from '@acrool/react-dialog';

import './App.css';
import Example from './views/Example';
import Banner from './components/Banner';
import {GridThemeProvider} from '@acrool/react-grid';
import Button from './components/Button';
import TextField from './components/TextField';



function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>
                <Example/>

                <DialogPortal
                    isDark
                    localeDictionaries={{
                        'zh-TW': {
                            'com.dialog.success': '成功',
                            'com.dialog.error': '失敗',
                            'com.dialog.info': '資訊',
                            'com.dialog.warning': '警告',
                            'com.dialog.confirm': '確認',
                            'com.dialog.ok': '確定',
                            'com.dialog.cancel': '取消',
                        }
                    }}
                    locale="zh-TW"
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
                            value={args.value}
                            onChange={value => args.onChange(value as string)}
                            isAutoFocus
                        />;
                    }}
                />

            </div>
        </GridThemeProvider>
    );

}

export default App;
