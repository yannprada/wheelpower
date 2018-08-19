<template>
  <div id="Game">
    <button @click="bagAdd">Add random item</button>
    <div class="inventories">
      <List name="Bag"
          :content="sharedState.inventories.bag"
          @remove-item="bagRemove"
          @move-item="bagMove"
          moveItemString="&gt;">
      </List>
      <List name="Pouch"
          :content="sharedState.inventories.pouch"
          @remove-item="pouchRemove"
          @move-item="pouchMove"
          moveItemString="&lt;">
      </List>
    </div>
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
    }
  },
  methods: {
    bagAdd(index) { store.actions.inventories.addItem('bag') },
    bagMove(index) { store.actions.inventories.moveItem('bag', 'pouch', index) },
    bagRemove(index) { store.actions.inventories.removeItem('bag', index) },
    pouchMove(index) { store.actions.inventories.moveItem('pouch', 'bag', index) },
    pouchRemove(index) { store.actions.inventories.removeItem('pouch', index) },
  },
}
</script>

<style scoped>

</style>
