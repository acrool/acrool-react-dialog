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
                <div className="team-name">sdsd</div>

                <DialogPortal
                    defaultTimeout={4}
                    renderButton={(args) => {
                        return <Button
                            className={args.className}
                            children={args.children}
                            color={args.type}
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
