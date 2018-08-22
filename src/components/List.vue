<template>
  <div class="List"
      :class="{ isDraggedOver }"
      @drop.prevent="isDraggedOver = false; $emit('inventory-drop')"
      @dragover.prevent="isDraggedOver = true"
      @dragend.prevent="isDraggedOver = false"
      @dragleave.prevent="isDraggedOver = false"
  >
    <h2 class="List-title">
      <span class="List-name">{{ name }}</span>
      <small class="List-item-count">{{ itemCountMsg }}</small>
    </h2>
    <div v-for="(item, index) in content">
      <Item :item="item"
          draggable
          @item-dragstart="$emit('inventory-dragstart', index)"
      ></Item>
    </div>
  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'List',
  components: { Item },
  data() {
    return { isDraggedOver: false };
  },
  props: ['name', 'content', 'moveItemString'],
  computed: {
    itemCountMsg() {
      switch (this.content.length) {
        case 0: return '';
        case 1: return '1 item';
        default: return this.content.length + ' items';
      }
    }
  },
}
</script>

<style scoped>
.List {
  float: left;
  margin: 1em;
  min-height: 10em;
  min-width: 10em;
  padding: 1em;
  outline: 1px solid lightgrey;
}
.List.isDraggedOver {
  outline-color: red;
}
.List-title {
  margin-top: 0;
}
.List-name {

}
.List-item-count {
  color: grey;
  float: right;
}
</style>
