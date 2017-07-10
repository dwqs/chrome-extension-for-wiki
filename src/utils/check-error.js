/**
 * Created by pomy on 10/07/2017.
 */

export default function (res) {
    let errorMsg = '网络异常,请稍后重试';
    console.info('check error', res);

    if (res.status === 200) {
        return true;
    } else {
        if (res && res.data) {
            try {
                errorMsg = JSON.parse(res.data.message);
            } catch (e) {
                errorMsg = res.data.message || errorMsg;
            }
        }

        if (res.status === 401) {
            // token 失效
            chrome.storage.sync.remove(['token', 'repo'], () => {
                window.eventBus.$emit('resetToken', '', '');
                chrome.notifications.create('', {
                    type: 'basic',
                    message: 'Token 无效,请重新设置',
                    title: 'Wiki',
                    iconUrl: 'images/wiki48.png'
                }, (notificationId) => {

                });
            });
        }

        throw new Error(errorMsg);
    }
}
