<template>
    <section>
        <router-link :to="{name:'resume-active'}">邀请好友录简历</router-link><br /><br />
        <router-link :to="{name:'recommend-active'}">推荐好友入职</router-link><br /><br />
        <router-link :to="{name:'scene-active'}">到现场面试</router-link><br /><br />
        <router-link :to="{name:'video-active'}">视频面试担保入职</router-link><br /><br />
        <router-link :to="{name:'share-resume'}">录简历赚钱</router-link><br /><br />
        <router-link :to="{name:'share-position'}">工作岗位分享</router-link><br /><br />
    </section>
</template>
<script>
export default {
    mounted() {
        
    }
}
</script>
<style lang="scss" scoped>
</style>