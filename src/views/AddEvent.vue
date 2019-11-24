<template>
  <div class="container">
    <h3>Добавить событие</h3>
    <div class="form-group">
      <label class="control-label col-sm-3">Действие</label>
      <div class="col-sm-9 input-group">
        <select v-model="m.type" class="form-control" @change="typeChanged">
          <option value="add">Добавить срок</option>
          <option value="sub">Скостить срок</option>
          <option value="reset">Амнистия</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label class="control-label col-sm-3">на сколько часов</label>
      <div class="col-sm-9 input-group">
        <input
          :disabled="m.type === 'reset'"
          class="form-control"
          type="number"
          step="1"
          v-model.number="m.duration"
          @keyup.enter="$v.m.$invalid || add()"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="control-label col-sm-3">Причина</label>
      <div class="col-sm-9 input-group">
        <input class="form-control" type="text" v-model="m.description" @keyup.enter="$v.m.$invalid || add()" />
      </div>
    </div>
    <div class="alert alert-danger" role="alert" v-show="errorMsg">
      {{ errorMsg }}
    </div>
    <div class="row">
      <button class="btn btn-success" @click="add" :disabled="$v.m.$invalid">Добавить</button>
    </div>
    <div class="row">
      <button class="btn btn-success" @click="$router.push({ name: 'home' })">К списку</button>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import { required, minLength, between } from 'vuelidate/lib/validators'
import { getDeadline } from '@/lib/funcs'
export default {
  data() {
    return {
      db: firebase.firestore(),
      errorMsg: null,
      m: { duration: 24, description: null, type: null },
    }
  },
  validations() {
    return {
      m: {
        type: {
          required,
        },
        duration: {
          required,
          b: between(0, 72),
        },
        description: {
          required,
          minLength: minLength(5),
        },
      },
    }
  },
  methods: {
    async add() {
      let vm = this
      vm.errorMsg = null
      let deadline = await getDeadline(firebase)
      console.log(typeof deadline)
      let newRecord = {
        ...vm.m,
        time: firebase.firestore.Timestamp.now(),
        userEmail: firebase.auth().currentUser.email,
        duration: vm.m.type == 'sub' ? -vm.m.duration : vm.m.duration,
      }
      if (deadline < new Date()) {
        if (newRecord.type == 'sub') {
          alert('Нет нужды уменьшать время наказания, т.к. наказание на данный момент не действует')
          return
        } else if (newRecord.type == 'add') {
          newRecord.type = 'set'
        }
      }
      let events = vm.db.collection('events')
      events
        .add(newRecord)
        .then(
          x => {
            vm.$router.push({ name: 'home' })
          },
          err => {
            vm.errorMsg = err.message
          }
        )
        .catch(err => {
          alert(err.msg)
        })
    },
    typeChanged() {
      this.m.duration = this.m.type === 'reset' ? 0 : 24
    },
  },
}
</script>
