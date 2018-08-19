
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// store
const store = {
  debug: true,
  _(message) { if (store.debug) console.log(message); },
  state: {
    inventories: {},
    items: {
      types: ['Generator', 'Gearbox', 'Dynamo'],
      qualities: ['S', 'A', 'B', 'C'],
    },
  },
  actions: {
    items: {
      generate() {
        return {
          type: getRandomElement(store.state.items.types),
          quality: getRandomElement(store.state.items.qualities),
        };
      },
    },
    inventories: {
      create(name, numberItems) {
        store._(`action 'create' triggered for inventory '${name}'`);
        store.state.inventories[name] = [];
        while (numberItems-- > 0) {
          store.actions.inventories.addItem(name);
        }
      },
      addItem(name) {
        store._(`action 'addItem' triggered for inventory '${name}'`);
        store.actions.inventories._addRandomItem(name);
      },
      removeItem(name, index) {
        store._(`action 'removeItem' triggered with index '${index}'
on inventory '${name}'`);
        store.actions.inventories._removeItem(name, index);
      },
      moveItem(from, to, index) {
        store._(`action 'moveItem' triggered with index '${index}'
from inventory '${from}' to '${to}'`);
        store.actions.inventories._moveItem(from, to, index);
      },
      // 'private'
      _addItem(name, item) {
        store.state.inventories[name].push(item);
      },
      _addRandomItem(name) {
        store.actions.inventories._addItem(name, store.actions.items.generate());
      },
      _removeItem(name, index) {
        return store.state.inventories[name].splice(index, 1);
      },
      _moveItem(from, to, index) {
        let item = store.actions.inventories._removeItem(from, index)[0];
        store.actions.inventories._addItem(to, item);
      }
    },
  },
};

store.actions.inventories.create('bag', 3);
store.actions.inventories.create('pouch', 1);

export default store;
