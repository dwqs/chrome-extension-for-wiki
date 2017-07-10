/**
 * Created by pomy on 10/07/2017.
 */

import network from './index';
import checkError from '../utils/check-error';

export default {
    // 获取用户的repo
    async getUserRepos () {
        const res = await network.get({
            url: `/user/repos`
        });

        checkError(res);

        return res;
    },

    // 获取 org 的 repos
    async getOrgRepos (org) {
        const res = await network.get({
            url: `/orgs/${org}/repos`,
            data: {
                type: 'member'
            }
        });

        checkError(res);

        return res;
    },

    // 获取仓库下的所有 issues
    async getRepoIssues (repo) {
        const res = await network.get({
            url: `/repos/${repo}/issues`
        });

        checkError(res);

        return res;
    },

    // 获取单个 issue
    async getSingleIssue (repo, number) {
        const res = await network.get({
            url: `/repos/${repo}/issues/${number}`
        });

        checkError(res);

        return res;
    },

    // 编辑一个 issue
    async editSingleIssue (repo, number, data) {
        const res = await network.patch({
            url: `/repos/${repo}/issues/${number}`,
            data
        });

        checkError(res);

        return res;
    }
};
