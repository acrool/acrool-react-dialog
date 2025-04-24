import type { Preview } from "@storybook/react";
import './reset.css';
import '@acrool/react-dialog/dist/index.css';
import { themes } from '@storybook/theming';

import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";
import {DialogPortal} from "@acrool/react-dialog";
import React, {createElement} from "react";
import Button from "../src/components/atoms/Button";
import TextField from "../src/components/atoms/TextField";


const preview: Preview = {
  parameters: {
      darkMode: {
          dark: { ...themes.dark, appPreviewBg: '#000' },
          light: { ...themes.dark, appPreviewBg: '#fff' }
      },
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
                          'com.dialog.error': 'Error',
                          'com.dialog.info': 'Info',
                          'com.dialog.warning': 'Warning',
                          'com.dialog.confirm': 'Confirm',
                          'com.dialog.ok': 'OK',
                          'com.dialog.cancel': 'Cancel',
                      }
                  }}
                  locale="en-US"
                  isDark
                  isStatusIconVisible={false}
                  renderButton={args => <Button
                      {...args}
                  />}
                  renderTextField={args => <TextField
                      type="text"
                      {...args}
                      onChange={args.onChange as (val: string) => void}
                      value={args.value as string}
                  />}
              />
          </GridThemeProvider>
      ),
  ],
};

export default preview;
