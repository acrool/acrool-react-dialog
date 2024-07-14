# Acrool React Dialog

<a href="https://acrool-react-dialog.pages.dev/" title="Acrool React Dialog - This is a dialog message function for React development dialog">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-dialog/main/example/public/og.webp" alt="Acrool React Dialog Logo"/>
</a>

<p align="center">
    This is a dialog message function for React development dialog
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-dialog.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dialog)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-dialog?style=for-the-badge)](https://github.com/acrool/@acrool/react-dialog/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-dialog?style=for-the-badge)](https://github.com/acrool/react-dialog/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-dialog.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dialog)
[![npm](https://img.shields.io/npm/dt/@acrool/react-dialog.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-dialog)

</div>




## Features

- Supports 5 status colors: default, success, info, warning, danger
- Call via global method
- Plug and unplug using `@acrool/react-portal` and `framer-motion`

## Install

```bash
yarn add @acrool/react-dialog
```

## Usage

add in your index.tsx
```tst
import "@acrool/react-dialog/dist/index.css";
```

add in your App.tsx

```tsx
import {DialogPortal} from "@acrool/react-dialog";

const App = () => {
    return (
        <div>
            <BaseUsed/>

            <DialogPortal
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
    );
};
```

then in your page
```tsx
import {EStatus, toast} from '@acrool/react-dialog';

const Example = () => {
    return (
        <div>
            <button type="button" onClick={() => dialog({message: 'step1 test dialog', code: 'TEST1'})}>
                useDialog message
            </button>
        </div>
    );
};
```

- dialog
- dialog.success
- dialog.info
- dialog.warning
- dialog.error
- dialog.confirm


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-dialog/main/play-in-example-button.svg)](https://acrool-react-dialog.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
