<template>
    <div class="wiki" id="wiki">
        <h3>{{ isNeedSetting ? 'Wiki 设置' : '添加链接' }} {{items}}</h3>
        <setting @settingChange="settingChange" v-if="isNeedSetting"></setting>
        <add-link v-if="!isNeedSetting"></add-link>
    </div>
</template>

<script>
    import Setting from '../setting/index.vue';
    import AddLink from '../add-link/index.vue';

    export default {
        data() {
            return {
                isNeedSetting: false,
                items: null
            }
        },

        created() {
            chrome.storage.sync.remove(['token', 'repo'], () => {
                this.isNeedSetting = false;
            });
            chrome.storage.sync.get('token', (items) => {
                if(!items.token) {
                    this.isNeedSetting = true;
                    this.items = items;
                    return;
                }
                this.isNeedSetting = false;
            })
        },

        methods: {
            settingChange(token, repo) {
                this.items = {
                    token,
                    repo
                };
                this.isNeedSetting = false;
            }
        },

        components: {
            Setting,
            AddLink
        }
    };
</script>
