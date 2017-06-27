<template>
<div>
  <table>
    <thead>
      <!--th>Giorno</th>
      <th>Mattina</th>
      <th>Pomeriggio</th>
      <th>Notte</th-->
    </thead>
    <tbody>
      <day 
        v-for="dayDate in dayDates"
        :slots="slots(dayDate)"
        @clickedSlot="clickedSlot"
        :key="dayDate"
      ></day>
    </tbody>
  </table>
</div>
</template>

<script>
import Day from '@/components/Day'
export default {
  components: {
    Day
  },
  methods: {
    clickedSlot (dSlot) {
      this.$emit('clickedSlot', dSlot)
    },
    slots (date) {
      return this.$store.state.slots
        .filter(slot => slot.date.year === this.year &&
        slot.date.month === this.month &&
        slot.date.date === date)
        .map(slot => {
          if (this.disablingFunction) {
            return Object.assign(slot, { disabled: this.disablingFunction(slot) })
          } else {
            return slot
          }
        })
    }
  },
  computed: {
    dayDates () {
      const dateArray = this.$store.state.slots
        .filter(slot => slot.date.year === this.year && slot.date.month === this.month)
        .map(slot => slot.date.date)
      const dateSet = new Set(dateArray)
      return Array.from(dateSet)
    }
  },
  props: {
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    disablingFunction: {
      type: Function,
      required: false
    }
  }
}
</script>
