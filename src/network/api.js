/**
 * Created by pomy on 10/07/2017.
 */

import network from './index';
import awaitTo from '../utils/await-to';

export default {
    // 获取用户的repo
    async getUserRepos () {
        const [err, res] = await awaitTo(network.get({
            url: `/user/repos`
        }));

        if (err) {
            throw err;
        }

        return res;
    },

    // 获取 org 的 repos
    async getOrgRepos (org) {
        const [err, res] = await awaitTo(network.get({
            url: `/orgs/${org}/repos`,
            data: {
                type: 'member'
            }
        }));

        if (err) {
            throw err;
        }

        return res;
    },

    // 获取仓库下的所有 issues
    async getRepoIssues (repo) {
        const [err, res] = await awaitTo(network.get({
            url: `/repos/${repo}/issues`
        }));

        if (err) {
            throw err;
        }

        return res;
    },

    // 获取单个 issue
    async getSingleIssue (repo, number) {
        const [err, res] = await awaitTo(network.get({
            url: `/repos/${repo}/issues/${number}`
        }));

        if (err) {
            throw err;
        }

        return res;
    },

    // 编辑一个 issue
    async editSingleIssue (repo, number, data) {
        const [err, res] = await awaitTo(network.patch({
            url: `/repos/${repo}/issues/${number}`,
            data
        }));

        if (err) {
            throw err;
        }

        return res;
    }
};
