<template>
  <div class="Item">
    <strong class="Item-prop Item-name">{{ item.type }}</strong>
    <span class="Item-prop Item-quality">{{ item.quality }}</span>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item'],
}
</script>

<style scoped>
.Item {
  display: inline-block;
}

.Item-prop {
  display: inline-block;
  width: 5em;
}

.Item-quality {
  width: 1em;
}
</style>
