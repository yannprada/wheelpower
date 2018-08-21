<template>
  <div class="Item" :class="qualityClass" :title="title">
    <svg viewBox="-100 -100 200 200">
      <use class="Item-type" :href="'#symbol' + item.type" />
      <text class="Item-quality" x="85" y="-70">{{ item.quality }}</text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item'],
  computed: {
    title() { return `${this.item.type} ${this.item.quality}`; },
    qualityClass() { return `Item-quality-${this.item.quality}`; },
  }
}
</script>

<style scoped>
.Item {
  background-color: var(--item-quality-color);
  display: inline-block;
  height: 100px;
  width: 100px;
}

.Item svg {
  height: 100px;
  width: 100px;
}

.Item-type {
  fill: none;
  stroke: white;
  stroke-linecap: round;
  stroke-width: 10;
}

.Item-quality {
  fill: white;
  stroke: none;
  font-size: 2em;
  text-anchor: middle;
}

.Item-quality-S { --item-quality-color: violet; }
.Item-quality-A { --item-quality-color: lightgreen; }
.Item-quality-B { --item-quality-color: lightblue; }
.Item-quality-C { --item-quality-color: lightgrey; }
</style>
