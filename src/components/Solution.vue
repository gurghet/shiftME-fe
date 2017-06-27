<template>
<div>
  <table>
    <tbody>
      <editable-day
        v-for="day in days"
        date="day.date"
        meta="day.meta"
        shifts="day.shifts"
        :key="day.date"
      ></editable-day>
    </tbody>
  </table>
  <div class="medici">
    <p
      v-for="medico in medici"
      :key="medico"
      class="medico"
      draggable="true"
      @dragstart="dragStart"
    >{{medico}}</p>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    dragStart (event) {
      console.info("drag started!")
    }
  },
  props: {
    days: {
      required: true,
      type: Array
    },
    medici: {
      required: true,
      type: Array
    }
  }
}
</script>
