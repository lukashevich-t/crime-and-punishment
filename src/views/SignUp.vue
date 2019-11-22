<template>
  <div class="sign-up">
    <p>Let's create a new account</p>
    <input type="text" placeholder="email" v-model="email" />
    <br />
    <input type="password" placeholder="password" v-model="password" />
    <br />
    <button @click="signUp">Sign up</button>
    <span>
      or go back to
      <router-link to="/login">login</router-link>.
    </span>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'signUp',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            console.log(user)
            alert('Your account has been created')
          },
          function(err) {
            alert('Oops... ' + err.message)
          }
        )
    },
  },
}
</script>

<style scoped>
.sign-up {
  margin-top: 40px;
}
</style>
