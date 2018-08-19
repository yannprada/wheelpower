<template>
  <div class="List">
    <h2 class="List-title">
      <span class="List-name">{{ name }}</span>
      <small class="List-item-count">{{ itemCountMsg }}</small>
    </h2>
    <div v-for="(item, index) in content">
      <button @click="$emit('remove-item', index)">X</button>
      <Item :item="item"></Item>
      <button @click="$emit('move-item', index)">{{ moveItemString }}</button>
    </div>
  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'List',
  props: ['name', 'content', 'moveItemString'],
  components: { Item },
  computed: {
    itemCountMsg() {
      switch (this.content.length) {
        case 0: return 'empty';
        case 1: return '1 item';
        default: return this.content.length + ' items';
      }
    }
  }
}
</script>

<style scoped>
.List {
  float: left;
  margin: 1em;
  min-height: 10em;
  min-width: 10em;
}
.List-title {

}
.List-name {

}
.List-item-count {
  color: grey;
  float: right;
}
</style>
