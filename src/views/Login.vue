<template>
  <div class="login">
    <h3>Sign in</h3>
    <input type="text" placeholder="email" v-model="email" />
    <br />
    <input type="password" placeholder="password" v-model="password" />
    <br />
    <button @click="login">Connection</button>
    <p>
      Don't have account?
      <router-link to="/sign-up">Create one!</router-link>
    </p>
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
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  /* width: 10%; */
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
