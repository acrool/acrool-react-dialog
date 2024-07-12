interface ILocale {
    [locale: string]: {
        [key: string]: string,
    }
}

const locales: ILocale = {
    'en-US': {
        'com.dialog.success': 'Success',
        'com.dialog.danger': 'Danger',
        'com.dialog.info': 'Info',
        'com.dialog.warning': 'Warning',
        'com.dialog.confirm': 'Confirm',
        'com.dialog.ok': 'OK',
        'com.dialog.cancel': 'Cancel',
    },
    'zh-TW': {
        'com.dialog.success': '成功',
        'com.dialog.danger': '危險',
        'com.dialog.info': '資訊',
        'com.dialog.warning': '警告',
        'com.dialog.confirm': '確認',
        'com.dialog.ok': '確定',
        'com.dialog.cancel': '取消',
    },
    'zh-CN': {
        'com.dialog.success': '成功',
        'com.dialog.danger': '危险',
        'com.dialog.info': '资讯',
        'com.dialog.warning': '警告',
        'com.dialog.confirm': '确认',
        'com.dialog.ok': '确定',
        'com.dialog.cancel': '取消',
    },
    'ja-JP': {
        'com.dialog.success': '成功',
        'com.dialog.danger': '危険',
        'com.dialog.info': '情報',
        'com.dialog.warning': '警告する',
        'com.dialog.confirm': '確認',
        'com.dialog.ok': 'もちろん',
        'com.dialog.cancel': 'キャンセル',
    }
};




const useLocale = (locale?: string) => {
    const i18n = (id: string, options?: {def?: string}) => {
        const selectLocale = typeof locale !== 'undefined' ? locale : 'en-US';
        const localeMap = locales[selectLocale] ? locales[selectLocale]: locales['en-US'];

        if(typeof localeMap !== 'undefined' && typeof localeMap[id] !== 'undefined'){
            return localeMap[id];
        }

        if(typeof options?.def !== 'undefined'){
            return options?.def;
        }

        return id;
    };

    return {i18n};
};

export default useLocale;
