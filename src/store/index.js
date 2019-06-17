import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idOffice: null,
    user: null,
    status: null, 
    error: null,
    itemsMenu: [
      { icon: 'person_add', text: 'Registrar', url: '/add' },
      { icon: 'group', text: 'Historial de la OC', url: '/list'},
      { icon: 'event', text: 'Gestión de citas', url: '/quote' },
      { icon: 'insert_chart', text: 'Gráficos', url: '/chart' },
      { icon: 'timer', text: 'Disponibilidad de los aplicativos', url: '/calendar' },
      { icon: 'settings', text: 'Configuraciones', url: '/settings' },
      { icon: 'help', text: 'Ayuda', url: '/help' }
    ],
    typeLine: '',
    optionsRequests: '',
    date: null,
    dialogNewRequest: false,
    alertObservations: false,
    alertObservationsContent: '',
    sectionSearchIdentify: true,
    userActive: false,
    uid: null,
    clientData: {
      name: '',
      userId: '',
      identify: 'V'
    },
    requestsPendingFaceTrue: '',
    requestsPendingFaceFalse: '',
    clientRequests: [],
    optionsCleaveIdentify: {
      numeral: true,
      numeralDecimalMark: ',',
      delimiter: '.',
      prefix: 'V'
    },
    optionsCleaveOcm: {
      prefix: 'OCM-',
      uppercase: true,
      delimiter: '.'
    },
    optionsCleaveDir: {
      prefix: 'Dir. ',
      uppercase: true,
      delimiter: '-'
    },
    optionsCleaveGer: {
      prefix: 'Ger. ',
      uppercase: true,
      delimiter: '-'
    }
  },
  mutations: {
    setIdOffice(state, payload){
      state.idOffice = payload
    },
    setTypeLine(state, payload){
      state.typeLine = payload
    },
    setOptionsRequests(state, payload){
      state.optionsRequests = payload
    },
    setRequestsPendingFaceTrue(state, payload){
      state.requestsPendingFaceTrue = payload
    },
    setRequestsPendingFaceTrueValues(state, payload){
      state.requestsPendingFaceTrue[payload.request].aplications[payload.aplication] = payload.size
    },
    setUser(state, payload){
      state.user = payload
    },
    removeUser(state, payload){
      state.user = null
    },
    setStatus(state, payload){
      state.status = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setUserName(state, payload){
      state.userName = payload
    },
    changeSectionSearchIdentify(state, replace){
      state.sectionSearchIdentify = replace
      state.clientData = {
              name: '',
              userId: '',
              identify: 'V'
            }
    },
    updateClient(state, value){
      state.clientData = value
    },
    keyUserData: (state, userId) => state.clientData.userId = userId,
    updateClientRequest: (state, requests) => state.clientRequests.push(requests),
    changeAlertObservationsContent: (state, content) => {
      state.alertObservationsContent = content
      state.alertObservations = true
    },
    changeAlertObservations: (state, replace) => state.alertObservations = replace,
    changeDialogNewRequest: (state, status) => {
      state.dialogNewRequest = status
      state.date = moment().format("YYYY-MM-DD HH:mm:ss")
    },
  },
  actions: {
    updateRequestsFace(context){
      context.commit('setRequestsPendingFaceTrue', context.state.optionsRequests )
      context.state.optionsRequests.forEach((request, r) => {
        if(request.face){
            request.aplications.forEach((typeLine, index) => {
                firebase.firestore()
                    .collection('usersRequests')
                    .where('idOffice', '==', context.state.idOffice)
                    .where('typeLine', '==', context.state.typeLine[index])
                    .where('request', '==', request.name)
                    .get()
                    .then(requests => {
                      context.commit('setRequestsPendingFaceTrueValues', {request: r, aplication: index, size: request.size})
                    })
            })
        }
      })
    },
    signUpAction ({ commit }, payload) {
      commit('setStatus', 'loading')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('success')
          // response will have user
          // user will have uid will be updated to the state
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)

          var user = firebase.auth().currentUser;

          user.updateProfile({
            displayName: payload.name,
          })

        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },

    signInAction ({ commit }, payload) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },

    signOutAction ({ commit }) {
      firebase.auth().signOut()
        .then((response) => {
          commit('setUser', null)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    addClientData(context){
      var id = firebase.firestore().collection("usersRegisters").doc()
        context.commit('keyUserData', id.id )
        firebase.firestore()
          .collection("usersRegisters")
          .doc(id.id)
          .set(context.state.clientData)
    },
    updateClientData(context){
      firebase.firestore()
        .collection("usersRegisters")
        .doc(context.state.clientData.userId)
        .update(context.state.clientData)
    },
    search(context, searchIdentify){
      context.commit('changeSectionSearchIdentify', false)
      firebase.firestore()
        .collection("usersRegisters")
        .where("identify", "==", searchIdentify)
        .onSnapshot(querySnapshot => {
          context.state.clientRequests = []
          if(querySnapshot.empty){
            console.log('No existe', searchIdentify)
            context.commit('updateClient', {
              userId: '',
                  identify: searchIdentify,
                  name: '',
                  contact1: '',
                  contact2: ''
              })
          }else{
            console.log('Si existe', searchIdentify)
            querySnapshot.forEach( doc => {
                var clientData = Object.assign({}, {userId: doc.id})
                var clientData = Object.assign(clientData, doc.data())
                context.commit('updateClient', clientData)
            })

            firebase.firestore()
                .collection('usersRequests')
                .where("userId", "==", context.state.clientData.userId)
                .onSnapshot( requests => {
                context.state.clientRequests = []
                  requests.forEach(request => {
                    console.log(request.data().idOffice)
                    firebase.firestore()
                      .collection('officeCommercial')
                      .where(firebase.firestore.FieldPath.documentId(), '==', request.data().idOffice)
                      .get()
                      .then(office => {
                        office.forEach(o => {
                          let clientRequests = {}
                          clientRequests = Object.assign({},request.data())
                          clientRequests = Object.assign(clientRequests,{
                            ocm: o.data().name
                          })
                          context.commit('updateClientRequest', clientRequests)
                        })
                      })
                    })
                })
          }
        })
    },
  },

  getters: {

    status (state) {
      return state.status
    },

    user (state) {
      return state.user
    },

    error (state) {
      return state.error
    },

    name () {
      return firebase.auth().currentUser.displayName
    }
  }
})
