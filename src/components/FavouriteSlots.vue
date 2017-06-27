<template>
  <div>
  <month-calendar
    :year="2017"
    :month="1"
    :disablingFunction="alwaysFalse"
    @clickedSlot="clickedSlot"
  ></month-calendar>
  </div>
</template>

<script>
import MonthCalendar from '@/components/MonthCalendar'
export default {
  data () {
    return {
      alwaysFalse: () => false
    }
  },
  methods: {
    clickedSlot (dSlot) {
      this.$store.dispatch('clickedToFavourite', dSlot)
    }
  },
  components: {
    MonthCalendar
  }
}
</script>
