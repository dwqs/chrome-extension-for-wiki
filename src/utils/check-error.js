/**
 * Created by pomy on 10/07/2017.
 */

export default function (res) {
    let errorMsg = '网络异常,请稍后重试';
    console.error('check error', res);

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

        if( res.status === 401) {
            // token 失效
            chrome.storage.sync.remove(['token', 'repo'], () => {
            });
        }

        throw new Error(errorMsg);
    }
}
