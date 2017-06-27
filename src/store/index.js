import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const NUMBER_OF_LEVELS_OF_PREFERENCE = 2

const store = new Vuex.Store({
  state: {
    slots: [],
    errorStack: [],
    medici: [],
    solution: []
  },
  actions: {
    clickedToFavourite ({ commit, state }, dSlot) {
      const slot = state.slots.find(slot => {
        return slot.date.year === dSlot.date.year &&
          slot.date.month === dSlot.date.month &&
          slot.date.date === dSlot.date.date &&
          slot.shift === dSlot.shift
      })
      if (slot === undefined) {
        commit('PUSH_ERROR', new Error('No such slot: ', dSlot))
      } else if (slot.favouritedness === undefined) {
        commit('SET_FAVOURITEDNESS', { slot, value: 1 })
      } else {
        commit('SET_FAVOURITEDNESS', { slot, value: (slot.favouritedness + 1) % (NUMBER_OF_LEVELS_OF_PREFERENCE + 1) })
      }
    },
    clickedToSpare ({ commit, state }, dSlot) {
      const slot = state.slots.find(slot => {
        return slot.date.year === dSlot.date.year &&
          slot.date.month === dSlot.date.month &&
          slot.date.date === dSlot.date.date &&
          slot.shift === dSlot.shift
      })
      if (slot === undefined) {
        commit('PUSH_ERROR', new Error('No such slot: ', dSlot))
      } else if (slot.favouritedness === undefined) {
        commit('SET_FAVOURITEDNESS', { slot, value: -1 })
      } else {
        commit('SET_FAVOURITEDNESS', { slot, value: (slot.favouritedness - 1) % (NUMBER_OF_LEVELS_OF_PREFERENCE + 1) })
      }
    },
    createMonth ({ commit, state }, { year, month }) {
      const dayOfFirst = new Date(year, month, 1).getDay()
      const numDays = new Date(year, (month + 1), 0).getDate()
      const days = []
      const slots = []
      for (let i = 0; i < numDays; i++) {
        days.push({
          year: year + Math.floor(month / 12),
          month: month % 12,
          date: i + 1,
          day: (dayOfFirst + i) % 7
        })
      }
      days.forEach(date => {
        ['Mattina', 'Pomeriggio', 'Notte']
          .forEach(shift => slots.push({
            shift,
            date,
            favouritedness: 0
          }))
      })
      commit('SET_SLOTS', slots)
    }
  },
  mutations: {
    PUSH_ERROR (state, error) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
      state.errorStack.push({ id: uuid, error })
    },
    SET_FAVOURITEDNESS (state, { slot, value }) {
      const slotIndex = state.slots.findIndex(s => {
        return s.date.year === slot.date.year &&
          s.date.month === slot.date.month &&
          s.date.date === slot.date.date &&
          s.shift === slot.shift
      })
      state.slots[slotIndex].favouritedness = value
    },
    SET_SLOTS (state, slots) {
      state.slots = slots
    },
    SET_SOLUTION (state, solution) {
      state.solution = solution
    },
    SET_MEDICI (state, medici) {
      state.medici = medici
    },
    PUT_MEDICO (state, { medico, date, shift, slot }) {
      const foundDate = state.solution.find(d => d.date === date)
      const foundShift = foundDate.find(s => s.shift === shift)
      const foundSlot = foundShift[slot]
      foundSlot.worker = medico
    },
    REMOVE_MEDICO (state, { date, shift, slot }) {
      const foundDate = state.solution.find(d => d.date === date)
      const foundShift = foundDate.find(s => s.shift === shift)
      const foundSlot = foundShift[slot]
      foundSlot.worker = ''
    }
  }
})

export default store
