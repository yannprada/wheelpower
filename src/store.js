
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// store
const store = {
  debug: true,
  _(message) { if (store.debug) console.log(message); },
  state: {
    inventories: {},
    items: {
      symbols: `
<g id="symbolCog">
  <circle r="45" stroke-width="12" />
  <path id="symbolCogTooth" d="M52 -5 L52 5" />
  <use href="#symbolCogTooth" transform="rotate(45)" />
  <use href="#symbolCogTooth" transform="rotate(90)" />
  <use href="#symbolCogTooth" transform="rotate(135)" />
  <use href="#symbolCogTooth" transform="rotate(180)" />
  <use href="#symbolCogTooth" transform="rotate(225)" />
  <use href="#symbolCogTooth" transform="rotate(270)" />
  <use href="#symbolCogTooth" transform="rotate(315)" />
</g>
<g id="symbolCogs">
  <use x="-40" y="-40" href="#symbolCog" />
  <use x="40" y="40" href="#symbolCog" transform="rotate(22.5 40 40)" />
</g>
<g id="symbolDynamo">
  <circle r="50" />
  <path id="symbolDynamoEnd" d="M-80 0 L-50 0" />
  <use href="#symbolDynamoEnd" transform="rotate(180)" />
  <path d="M-20 0 L20 0" />
</g>
<g id="symbolWheel">
  <circle r="70" />
  <circle r="45" />
  <path id="symbolWheelBar" d="M0 -80 L0 80" />
  <use href="#symbolWheelBar" transform="rotate(45)" />
  <use href="#symbolWheelBar" transform="rotate(90)" />
  <use href="#symbolWheelBar" transform="rotate(135)" />
</g>`,
      types: ['Cogs', 'Dynamo', 'Wheel'],
      qualities: ['S', 'A', 'B', 'C'],
    },
  },
  actions: {
    items: {
      _generate() {
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
        store.actions.inventories._addItem(name, store.actions.items._generate());
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
