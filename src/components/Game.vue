<template>
  <div id="Game">
    <button @click="bagAdd">Add random item</button>
    <div class="inventories">
      <List name="Bag"
          :content="sharedState.inventories.bag"
          @inventory-dragstart="inventoryDragStart('bag', ...arguments)"
          @inventory-drop="inventoryDrop('bag')"
      ></List>
      <List name="Pouch"
          :content="sharedState.inventories.pouch"
          @inventory-dragstart="inventoryDragStart('pouch', ...arguments)"
          @inventory-drop="inventoryDrop('pouch')"
      ></List>
      <List name="Bin"
          :content="[]"
          @inventory-drop="inventoryDrop('bin')"
      ></List>
    </div>
    <svg class="Symbols">
      <defs v-html="sharedState.items.symbols"></defs>
    </svg>
  </div>
</template>

<script>
import store from '../store';
import List from './List';

export default {
  name: 'Game',
  components: { List },
  data () {
    return {
      sharedState: store.state,
      draggedItemId: 0,
      dropFromInventory: null,
    }
  },
  methods: {
    bagAdd(index) { store.actions.inventories.addItem('bag') },
    inventoryDragStart(name, index) {
      this.draggedItemId = index;
      this.dropFromInventory = name;
    },
    inventoryDrop(name) {
      if (name == 'bin') {
        store.actions.inventories
            .removeItem(this.dropFromInventory, this.draggedItemId);
      } else {
        store.actions.inventories
            .moveItem(this.dropFromInventory, name, this.draggedItemId);
      }
    },
  },
}
</script>

<style scoped>
.Symbols {
  display: none;
}
</style>
