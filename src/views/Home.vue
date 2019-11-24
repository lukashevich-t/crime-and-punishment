<template>
  <div class="container">
    <h1>{{ deadlineMessage }}</h1>
    <table class="table table-hover table-mc-light-blue table-striped">
      <thead>
        <tr>
          <th class="text-center">Дата</th>
          <th class="text-center">Тип</th>
          <th class="text-center">Пользователь</th>
          <th class="text-center">Часов</th>
          <th class="text-center">Причина</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in events" :key="e.id">
          <td>{{ e.time }}</td>
          <td>{{ describeType(e) }}</td>
          <td>{{ e.userEmail }}</td>
          <td>{{ e.duration }}</td>
          <td>{{ e.description }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-warn" @click="logout">Выход</button>
    <button class="btn btn-success" v-show="showMoreButton" @click="showMore">Больше событий</button>
    <button class="btn btn-success" @click="addEvent">Добавить событие</button>
  </div>
</template>

<script>
// import firebase from 'firebase'
import * as firebase from 'firebase/app'
import { numberPad, getDeadline } from '@/lib/funcs'
export default {
  data() {
    return {
      db: firebase.firestore(),
      events: [],
      showRecords: 30,
      deadline: new Date(0, 0, 1),
      showMoreButton: true,
    }
  },
  mounted() {
    this.reload()
  },
  computed: {
    deadlineMessage() {
      let vm = this
      let now = new Date()
      if (vm.deadline > now) {
        let timeoutInMs = vm.deadline - now
        let hourTimeout = Math.floor(timeoutInMs / 3600000)
        let minuteTimeout = Math.floor((timeoutInMs % 3600000) / 60000)
        now.setMilliseconds(now.getMilliseconds() + timeoutInMs)
        return `Надо подождать ${hourTimeout} часов ${minuteTimeout} минут (до ${now})`
      } else {
        return 'Можно выдавать телефон'
      }
    },
  },
  methods: {
    describeType(e) {
      switch (e.type) {
        case 'set':
          return 'Начало наказания'
        case 'add':
          return 'Увеличение наказания'
        case 'sub':
          return 'Уменьшение наказания'
        case 'reset':
          return 'Амнистия'
      }
    },
    addEvent() {
      this.$router.push({ name: 'addevent' })
    },
    showMore() {
      this.showRecords += 30
      this.loadRecords()
    },
    async reload() {
      let vm = this
      vm.loadRecords()
      vm.deadline = await getDeadline(firebase)
    },
    loadRecords() {
      let vm = this
      let events = vm.db.collection('events')
      vm.events = []
      let recordCounter = 0
      events
        .orderBy('time', 'desc')
        .limit(vm.showRecords)
        .get()
        .then(
          coll => {
            coll.forEach(el_ => {
              recordCounter++
              let el = el_.data()
              let t = el.time.toDate()
              let y = t.getYear() + 1900
              let M = t.getMonth() + 1
              let d = t.getDate()
              let h = t.getHours()
              let m = t.getMinutes()
              let s = t.getSeconds()
              let time =
                '' +
                numberPad(d, 2) +
                '.' +
                numberPad(M, 2) +
                '.' +
                numberPad(y, 4) +
                ' ' +
                numberPad(h, 2) +
                ':' +
                numberPad(m, 2) +
                ':' +
                numberPad(s, 2)

              //  time: '' + (el.getYear() + 1900) + '.' + (el.getMonth() + 1) + '.' + t.getDate()
              vm.events.push({ ...el, id: el_.id, time })
            })
            if (recordCounter < vm.showRecords) vm.showMoreButton = false
          },
          err => {
            alert(err.message)
            console.log(err.message)
          }
        )
    },
    gotoLogin() {
      this.$router.replace('login')
    },
    logout() {
      if (firebase.auth().currentUser == null) {
        this.gotoLogin()
      }
      firebase
        .auth()
        .signOut()
        .then(
          a => {
            console.log(`signed out ${a}`)
            this.gotoLogin()
          },
          err => {
            console.log(`sign out error ${err.message}`)
          }
        )
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
