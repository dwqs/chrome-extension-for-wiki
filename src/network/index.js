/**
 * Created by pomy on 10/07/2017.
 */

import axios from 'axios';

console.log('api prefix', window.PREFIX);

export default {
    get (obj) {
        return Promise.resolve(
            axios({
                method: 'GET',
                url: `${window.PREFIX}${obj.url}`,
                params: obj.data,
                headers: {
                    authorization: `token ${window.token}`
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            })
        );
    },

    post (obj) {
        return Promise.resolve(
            axios({
                method: 'POST',
                url: `${window.PREFIX}${obj.url}`,
                responseType: 'json',
                data: obj.data,
                headers: {
                    authorization: `token ${window.token}`
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            })
        );
    },

    patch (obj) {
        return Promise.resolve(
            axios({
                method: 'PATCH',
                url: `${window.PREFIX}${obj.url}`,
                responseType: 'json',
                data: obj.data,
                headers: {
                    authorization: `token ${window.token}`
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            })
        );
    },

    put (obj) {
        return Promise.resolve(
            axios({
                method: 'PUT',
                url: `${window.PREFIX}${obj.url}`,
                responseType: 'json',
                data: obj.data,
                headers: {
                    authorization: `token ${window.token}`
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            })
        );
    }
};
