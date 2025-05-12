import '@testing-library/jest-dom';

import {act,render, screen} from '@testing-library/react';
import React from 'react';

import Dialog, {dialog} from './Dialog';
import {EStatus} from './types';


describe('Dialog', () => {
    it('應該能正常渲染 Dialog 組件', () => {
        render(<Dialog />);
        // 初始不顯示內容
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('呼叫 show 後應該顯示內容', () => {
        render(<Dialog />);
        act(() => {
            dialog({
                message: '測試訊息',
                status: EStatus.info,
            });
        });
        // 由於 DialogWrapper 內容複雜，僅驗證訊息是否出現
        expect(screen.getByText('測試訊息')).toBeInTheDocument();
    });


    it('呼叫 dialog.success 應顯示 success 狀態', () => {
        render(<Dialog />);
        act(() => {
            dialog.success('成功訊息');
        });
        expect(screen.getByText('成功訊息')).toBeInTheDocument();
    });
});
