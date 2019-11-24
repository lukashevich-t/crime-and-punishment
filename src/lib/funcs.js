export const numberPad = (num, padSize) => {
  return (1e9 + num + '').slice(-padSize)
}

export async function getDeadline(firebase) {
  let now = firebase.firestore.Timestamp.now()
  let events = firebase.firestore().collection('events')
  let resetTime = null
  let startTime = null
  let promise1 = events
    .where('type', '==', 'reset')
    .where('time', '<=', now)
    .orderBy('time', 'desc')
    .limit(1)
    .get()
  let coll = await promise1
  coll.forEach(el_ => {
    resetTime = el_.data().time
  })
  if (!resetTime) return null
  let duration = 0
  let promise2 = events
    .where('type', 'in', ['set', 'add', 'sub'])
    .where('time', '>=', resetTime)
    .where('time', '<=', now)
    .orderBy('time')
    .get()
  coll = await promise2
  coll.forEach(el_ => {
    let el = el_.data()
    if (el.type == 'set') {
      startTime = el.time
      duration = 0
    }
    duration += el.duration
  })
  if (!startTime) return null
  let deadline = startTime.toDate()
  deadline.setHours(deadline.getHours() + duration)
  return deadline
}

// export async function getDeadline(firebase) {
//   let now = firebase.firestore.Timestamp.now()
//   let events = this.db.collection('events')
//   let resetTime = null
//   let startTime = null
//   events
//     .where('type', '==', 'reset')
//     .where('time', '<=', now)
//     .orderBy('time', 'desc')
//     .limit(1)
//     .get()
//     .then(coll => {
//       vm.events = []
//       coll.forEach(el_ => {
//         resetTime = el_.data().time
//       })
//       if (!resetTime) return null
//       let duration = 0
//       events
//         .where('type', 'in', ['set', 'add', 'sub'])
//         .where('time', '>=', resetTime)
//         .where('time', '<=', now)
//         .orderBy('time')
//         .get()
//         .then(
//           coll => {
//             coll.forEach(el_ => {
//               let el = el_.data()
//               debugger
//               if (el.type == 'set') {
//                 startTime = el.time
//                 duration = 0
//               }
//               duration += el.duration
//             })
//             let deadline = startTime.toDate()
//             deadline.setHours(deadline.getHours() + duration)
//           },
//           err => {
//             alert(err.message)
//             console.log(err.message)
//           }
//         )
//     })
// }
