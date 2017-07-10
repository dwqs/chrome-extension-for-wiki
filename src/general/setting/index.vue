<template>
    <div class="setting">
        <div class="setting-input">
            <p>Wiki repo 地址:</p>
            <el-input placeholder="输入 wiki repo, eg: fmfe/wiki" v-model="repo"></el-input>
        </div>
        <div class="setting-input">
            <p>个人Token&nbsp;<span @click="help">(怎么设置)</span>:</p>
            <el-input placeholder="输入个人Token" v-model="token"></el-input>
        </div>
        <p class="error-msg" :style="{visibility: errorMsg ? 'visible' : 'hidden'}" v-text="errorMsg"></p>
        <div class="setting-save">
            <el-button type="primary" :disabled="disabled" @click="save">保存设置</el-button>
        </div>
    </div>
</template>

<script>
    import './index.less';

    export default {
        data () {
            return {
                token: '',
                repo: '',
                disabled: false,
                errorMsg: ''
            };
        },

        methods: {
            help(){
                const url = 'https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/';

                chrome.tabs.create({
                    url: url
                });
            },

            save() {
                if(!this.repo) {
                    this.errorMsg = '请输入 repo 地址';
                    return;
                }

                let repo = this.repo.replace(/^\//, '');

                if(repo.indexOf('/') === -1) {
                    this.errorMsg = 'repo 输入有误, 格式为 username/repo';
                    return;
                }

                if(repo.indexOf('/') !== repo.lastIndexOf('/')) {
                    this.errorMsg = 'repo 输入有误, 格式为 username/repo';
                    return;
                }

                if(!repo.split('/')[1]){
                    this.errorMsg = 'repo 输入有误, 格式为 username/repo';
                    return;
                }

                if(!this.token) {
                    this.errorMsg = '请输入 token';
                    return;
                }

                this.disabled = true;
                this.errorMsg = '';

                chrome.storage.sync.set({
                    token: this.token,
                    repo: this.repo.replace(/^\//, '')
                }, () => {
                    this.disabled = false;
                    this.$emit('settingChange', this.token, this.repo);
                })
            }
        }
    };
</script>
