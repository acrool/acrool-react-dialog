# Acrool React Dialog

<a href="https://acrool-react-dialog.pages.dev/" title="Acrool React Dialog - This is a toast message function for React development notifications">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-dialog/main/example/public/og.webp" alt="Acrool React Dialog Logo"/>
</a>

<p align="center">
    This is a toast message function for React development notifications
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
- Configurable disappearance delay seconds

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
            <DialogPortal timeout={3000}/>
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
            <button type="button" onClick={() => toast({message: 'useDialog message'})}>
                useDialog message
            </button>
        </div>
    );
};
```

- toast
- toast.success
- toast.info
- toast.warning
- toast.error


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-dialog/main/play-in-example-button.svg)](https://acrool-react-dialog.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
