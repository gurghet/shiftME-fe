<template>
  <tr>
    <td>{{dayName[dayObj.day]}} {{dayObj.date}}</td>
    <d-slot
      v-for="slot in slots"
      :d-slot="slot"
      :disabled="slot.disabled"
      @clicked="clickedSlot"
      :key="slot.shift"
    ></d-slot>
  </tr>
</template>

<script>
import Slot from '@/components/Slot'
const dayName = [
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
  'Domenica'
]
export default {
  data () {
    return {
      dayName
    }
  },
  props: {
    slots: {
      type: Array,
      required: true,
      validate: value => {
        return value.length > 0
      }
    }
  },
  computed: {
    dayObj () {
      return this.slots[0].date
    }
  },
  methods: {
    clickedSlot (dSlot) {
      this.$emit('clickedSlot', dSlot)
    }
  },
  components: {
    dSlot: Slot
  }
}
</script>
