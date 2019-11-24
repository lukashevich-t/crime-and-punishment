<template>
  <div class="container">
    <div class="form-signin">
      <h2 class="form-signin-heading">Вход</h2>
      <label for="us" class="sr-only">email</label>
      <input type="text" name="us" id="us" class="form-control" placeholder="email" required v-model="email" @keypress.enter="login" />
      <label for="pa" class="sr-only">Пароль</label>
      <input type="password" name="pa" id="pa" class="form-control" placeholder="Пароль" required v-model="password" @keypress.enter="login" />
      <button class="btn btn-lg btn-primary btn-block" @click="login">Войти</button>
    </div>

    <!-- <p>Нет учетки? <router-link to="/sign-up">Создайте!</router-link></p> -->
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      let vm = this
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            vm.$router.replace('/home')
          },
          function(err) {
            alert(`error occured ${err.message}`)
          }
        )
      // this.$router.replace("home");
    },
  },
}
</script>

<style scoped>
.form-signin {
  max-width: 500px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
  text-align: center;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
