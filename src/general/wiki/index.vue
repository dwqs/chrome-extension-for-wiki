<template>
    <div class="wiki" id="wiki">
        <h3>Wiki 设置</h3>
    </div>
</template>

<script>
    import Setting from '../setting/index.vue';
    import AddLink from '../add-link/index.vue';

    export default {
        data() {
            return {
                token: '',
                repo: ''
            }
        },

        created() {

        },

        components: {
            Setting,
            AddLink
        }
    };
</script>