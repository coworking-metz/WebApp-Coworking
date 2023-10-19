<template>
    <div class="box">
        <img onclick="window.open(this.src, 'plan');" src="@/assets/plan.png">
    </div>
</template>

<script setup>
</script>

<style scoped>
.box {
    padding: 0;
    overflow: hidden;

    img {
        display: block;
    }
}
</style>
