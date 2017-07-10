<template>
    <div class="setting">
        <div class="setting-input">
            <p>Wiki repo 地址:</p>
            <el-input placeholder="输入 wiki repo, eg: fmfe/wiki" v-model="repo"></el-input>
        </div>
        <div class="setting-input">
            <p>Repo 类型:</p>
            <el-select v-model="type" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="setting-input">
            <p>个人Token&nbsp;<span @click="help">(怎么设置)</span>:</p>
            <el-input placeholder="输入个人Token" v-model="token"></el-input>
        </div>
        <p class="error-msg" :style="{visibility: errorMsg ? 'visible' : 'hidden'}" v-text="errorMsg"></p>
        <div class="setting-save">
            <el-button type="primary" :disabled="disabled" @click="save">
                {{ disabled ? '保存中...' : '保存设置'}}
            </el-button>
        </div>
    </div>
</template>

<script>
    import api from '../../network/api';
    import awaitTo from '../../utils/await-to';
    import { repoExist } from '../../utils/index';

    export default {
        data () {
            return {
                token: '',
                repo: '',
                disabled: false,
                errorMsg: '',
                type: 2,
                options: [{
                    value: 1,
                    label: '个人/Personal'
                }, {
                    value: 2,
                    label: '组织/Orgs'
                }]
            };
        },

        methods: {
            help () {
                const url = 'https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/';

                chrome.tabs.create({
                    url: url
                });
            },

            async save () {
                if (this.disabled) {
                    return Promise.resolve();
                }
                if (!this.repo) {
                    this.errorMsg = '请输入 repo 地址';
                    return Promise.resolve();
                }

                const repo = this.repo.replace(/^\//, '');

                if (repo.indexOf('/') === -1) {
                    this.errorMsg = 'repo 输入有误, 格式为 username/repo';
                    return Promise.resolve();
                }

                if (repo.indexOf('/') !== repo.lastIndexOf('/')) {
                    this.errorMsg = 'repo 输入有误, 格式为 username/repo';
                    return Promise.resolve();
                }

                if (!repo.split('/')[1]) {
                    this.errorMsg = 'repo 输入有误, 格式为 username/repo';
                    return Promise.resolve();
                }

                if (!this.token) {
                    this.errorMsg = '请输入 token';
                    return Promise.resolve();
                }

                this.disabled = true;
                this.errorMsg = '';
                window.eventBus.$emit('saveData', this.token, this.repo);

                if (this.type === 2) {
                    const [err, res] = await awaitTo(api.getOrgRepos(this.repo.split('/')[0]));
                    if (res) {
                        this.disabled = false;
                        if (res && repoExist(this.repo.split('/')[1], res.data)) {
                            this.syncData();
                        } else {
                            this.errorMsg = 'repo 不存在';
                        }
                    } else {
                        this.disabled = false;
                        this.errorMsg = err.message || 'token 或者 repo 无效';
                    }
                } else {
                    const [err, res] = await awaitTo(api.getUserRepos(this.repo.split('/')[0]));
                    if (res) {
                        this.disabled = false;
                        if (res && repoExist(this.repo.split('/')[1], res.data)) {
                            this.syncData();
                        } else {
                            this.errorMsg = 'repo 不存在';
                        }
                    } else {
                        this.disabled = false;
                        this.errorMsg = err.message || 'token 或者 repo 无效';
                    }
                }
            },

            syncData () {
                chrome.storage.sync.set({
                    token: this.token,
                    repo: this.repo.replace(/^\//, '')
                }, () => {
                    this.disabled = false;
                    this.$emit('settingChange', false);
                });
            }
        }
    };
</script>
