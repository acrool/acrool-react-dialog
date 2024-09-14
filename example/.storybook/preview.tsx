import type { Preview } from "@storybook/react";
// import './reset.css';
import '@acrool/react-dialog/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";
import {DialogPortal} from "@acrool/react-dialog";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
      (Story) => (
          <GridThemeProvider>
            <Story />

              <DialogPortal
                  localeDictionaries={{
                      'en-US': {
                          'com.dialog.success': 'Success',
                          'com.dialog.error': 'Danger',
                          'com.dialog.info': 'Info',
                          'com.dialog.warning': 'Warning',
                          'com.dialog.confirm': 'Confirm',
                          'com.dialog.ok': 'OK',
                          'com.dialog.cancel': 'Cancel',
                      }
                  }}
                  locale="en-US"
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
          </GridThemeProvider>
      ),
  ],
};

export default preview;
