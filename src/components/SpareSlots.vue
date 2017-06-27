<template>
  <div>
  <month-calendar
    :year="2017"
    :month="1"
    :disablingFunction="hasPositiveFavouritedness"
    @clickedSlot="clickedSlot"
  ></month-calendar>
  </div>
</template>

<script>
import MonthCalendar from '@/components/MonthCalendar'
export default {
  data () {
    return {
      hasPositiveFavouritedness: slot => {
        return slot.favouritedness > 0
      }
    }
  },
  methods: {
    clickedSlot (dSlot) {
      this.$store.dispatch('clickedToSpare', dSlot)
    }
  },
  components: {
    MonthCalendar
  }
}
</script>
