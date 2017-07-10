<template>
    <div class="add-link">
        <div class="setting-input">
            <p>选择仓库 {{repo}} 的issue:</p>
            <el-select v-model="number" popper-class="issue-select" :loading="loading" loading-text="加载中..." placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="setting-input">
            <p>待添加链接的 title:</p>
            <el-input placeholder="待添加链接的 title" v-model="title"></el-input>
        </div>
        <div class="setting-input">
            <p>待添加链接的 url:</p>
            <el-input placeholder="待添加链接的 url:" v-model="url"></el-input>
        </div>
        <p class="error-msg" :style="{visibility: errorMsg ? 'visible' : 'hidden'}" v-text="errorMsg"></p>
        <div class="link-save">
            <el-button type="primary" :disabled="disabled" @click="save">
                {{ disabled ? '添加...' : '添加'}}
            </el-button>
            <el-button type="primary" :disabled="disabled" @click="change">
                更改 repo
            </el-button>
        </div>
        <!--<div class="mask" v-show="loading">加载中...</div>-->
    </div>
</template>

<script>
    import api from '../../network/api';
    import awaitTo from '../../utils/await-to';

    export default {
        props: {
            token: String,
            repo: String
        },

        data () {
            return {
                fetchData: false,
                disabled: false,
                loading: true,
                title: '',
                url: '',
                errorMsg: '',
                number: '',
                options: []
            };
        },

        methods: {
            getIssuesByRepo () {
                this.loading = true;
                api.getRepoIssues(this.repo).then((res) => {
                    this.loading = false;
                    const { data } = res;
                    if (data.length) {
                        const t = [];
                        data.forEach(item => {
                            t.push({
                                label: item.title,
                                value: item.number
                            });
                        });
                        t.unshift({
                            label: '请选择',
                            value: 0
                        });
                        this.options = t;
                    } else {
                        this.options = [];
                        this.errorMsg = `${this.repo} 暂时没有 issues`;
                    }
                }).catch((e) => {
                    this.loading = false;
                    this.errorMsg = e.message || `获取 ${this.repo} 的 issues 出错了~`;
                });
            },

            async save () {
                if (this.disabled) {
                    return Promise.resolve();
                }
                if (!this.number) {
                    this.errorMsg = '请选择 issue';
                    return Promise.resolve();
                }

                if (!this.title) {
                    this.errorMsg = '请输入 title';
                    return Promise.resolve();
                }

                if (!this.url) {
                    this.errorMsg = '请输入 url';
                    return Promise.resolve();
                }

                this.disabled = true;
                this.errorMsg = '';

                const [err, res] = await awaitTo(api.getSingleIssue(this.repo, this.number));

                if(res){
                    const { data } = res;
                    let { title, body, state, milestone, labels, assignees } = data;
                    body = body + `\n* [${this.title}](${this.url})`;

                    const [error, result] = await awaitTo(api.editSingleIssue(this.repo, this.number, {
                        title, body, state, milestone, labels, assignees
                    }));

                    if(result){
                        this.disabled = false;
                        window.close();

                        chrome.notifications.create('', {
                            type: 'basic',
                            message: '添加成功',
                            title: 'Wiki',
                            iconUrl: 'images/wiki48.png'
                        }, (notificationId) => {

                        });
                    } else {
                        this.errorMsg = error.message || '添加失败';
                        this.disabled = false;
                    }

                } else {
                    this.errorMsg = err.message || '添加失败';
                    this.disabled = false;
                }
            },

            change () {
                this.$emit('settingChange', true);
                this.options = [];
                this.fetchData = false;
                this.number = '';
            }
        },

        created () {
            // 获取当前标签页的信息
            chrome.tabs.query({ active: true }, (tab) => {
                this.title = tab[0].title;
                this.url = tab[0].url;
            });

            if (this.token && this.repo && !this.fetchData) {
                this.fetchData = true;
                this.getIssuesByRepo();
            }
        },

        updated () {
            if (this.token && this.repo && !this.fetchData) {
                this.fetchData = true;
                this.getIssuesByRepo();
            }
        }
    };
</script>
