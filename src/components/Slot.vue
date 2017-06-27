<template>
  <td
    class="slot"
    :class="classes"
    @click="clicked"
    >
  </td>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    dSlot: {
      type: Object,
      required: true,
      validator: value => {
        return value.hasOwnProperty('shift') &&
          value.hasOwnProperty('date') &&
          value.hasOwnProperty('favouritedness')
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    classes () {
      const retVal = []
      if (this.disabled) {
        retVal.push('disabled')
      }
      switch (this.dSlot.favouritedness) {
        case -2:
          retVal.push('vacation'); break
        case -1:
          retVal.push('spared'); break
        case 0:
          retVal.push('neutral'); break
        case 1:
          retVal.push('favourite'); break
        case 2:
          retVal.push('agreed'); break
        default:
          throw new Error('Incorrect level of favouritedness')
      }
      return retVal
    }
  },
  methods: {
    clicked () {
      if (!this.disabled) {
        this.$emit('clicked', this.dSlot)
      }
    }
  }
}
</script>

<style>
.slot {
  width: 50px;
  height: 50px;
  background-color: rgba(200, 200, 200, 0.3)
}
.vacation {
  background-color: rgba(250, 100, 100, 0.3)
}
.vacation:after {
  content: '🏖';
  font-size: 3em;
}
.spared {
  background-color: rgba(250, 100, 100, 0.3)
}
.neutral {
}
.favourite {
  background-color: rgba(100, 250, 100, 0.3)
}
.agreed {
  background-color: rgba(100, 250, 100, 0.3);
}
.agreed:after {
  content: '⭐️';
  font-size: 3em;
}
.disabled {
  background-color: rgba(100, 100, 100, 0.3)
}
</style>
