const Bot = require('messenger-bot')
const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: true})
const request = require('request')

admin.initializeApp(functions.config().firebase)
const db = admin.database()
const app = express()
app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
const bot = new Bot({
  token: 'xxx',
  verify: 'xx',
  app_secret: 'xx'
})

app.get('/', bot._verify)
app.post('/', handleIndexReq)

function createMsgTemplate (profile, type, text) {
  return {
    profile: {
      name: profile.first_name + ' ' + profile.last_name,
      profileImage: profile.profile_pic
    },
    time: new Date().toString(),
    unixtime: Math.floor(Date.now() / 1000),
    text: text,
    type: type
  }
}

function createTemplateForReplyImage (attach) {
  return {
    'attachment': {
      'type': 'image',
      'payload': {
        'url': attach.payload.url
      }
    }
  }
}

function createTemplateForReplyText (text) {
  return { text: text }
}


function boardCastToAll (payload, currentSender, senderName) {
  db.ref('online-user').once('value').then((snapshot) => {
    for (let index in snapshot.val()) {
      if (currentSender !== index) {
        if (payload.attachment) {
          bot.sendMessage(index, { text: senderName + ' Upload' })
        }
        bot.sendMessage(index, payload, (err, info) => {
          if (err) {
            log('[ERROR] Boardcast to ' + index + ' failed')
            log('[DEBUG] ' + JSON.stringify(err))
          } else {
            log('[INFO] Boardcast to ' + index + ' completed')
          }
        })
      }
    }
  })
}

function setOnlineUser (payload, profile) {
  db.ref('online-user/' + payload.sender.id).set({
    name: profile.first_name + ' ' + profile.last_name,
    profileImage: profile.profile_pic,
    unixtime: Math.floor(Date.now() / 1000)
  })
}

function saveMessage (msgTemplate, payload, newMsgRef, profile) {
  db.ref('verified-user/' + payload.sender.id).once('value').then((snapshot) => {
    let user = snapshot.val()
    if (user && user.verified === true) {
      setOnlineUser(payload, profile)
      newMsgRef.set(msgTemplate)
    } else {
      db.ref('verified-user/' + payload.sender.id).set({verified: false})
      log('[ERROR] ' + payload.sender.id + ' is not verified')
      bot.sendMessage(payload.sender.id, { text: 'Your account is not verified' })
      boardCastToAll(createTemplateForReplyText('System : ' + payload.sender.id + ' is not verified'), payload.sender.id, 'System')
    }
  })
}

function updateLive (pageId) {
  request('https://graph.facebook.com/' + pageId + '/live_videos?access_token=xxx', function (error, response, body) {
    let liveResponse = JSON.parse(body)
    log(liveResponse)
    for (let live of liveResponse.data) {
      if (live.status === 'LIVE') {
        log('[INFO] Live Start ' + live.id)
        db.ref('live/' + live.id).set(live)
      } else {
        log('[INFO] Live Done ' + live.id)
        db.ref('live/' + live.id).remove()
      }
    }
  })
}

function log (msg) {
  console.log(msg)
}

bot.on('error', (err) => {
  log(err.message)
})

bot.on('message', (payload, reply) => {
  bot.getProfile(payload.sender.id, (err, profile) => {
    let newMsgRef = db.ref('msg').push()
    let msgTemplate
    let msgForBroadcast
    if (err) throw err
    log('[INFO] Recieved Message from ' + payload.sender.id)
    log('[DEBUG] ' + JSON.stringify(payload))
    if (!payload.message.text) {
      for (let attach of payload.message.attachments) {
        msgTemplate = createMsgTemplate(profile, 'image', attach.payload.url)
        boardCastToAll(createTemplateForReplyImage(attach), payload.sender.id, profile.first_name + ' ' + profile.last_name)
      }
    } else {
      msgTemplate = createMsgTemplate(profile, 'text', payload.message.text)
      msgForBroadcast = profile.first_name + ' ' + profile.last_name + ': ' + payload.message.text
      boardCastToAll(createTemplateForReplyText(msgForBroadcast), payload.sender.id, profile.first_name + ' ' + profile.last_name)
    }
    log('[INFO] Save message from ' + payload.sender.id + ' to Firebase.')
    log('[DEBUG] ' + JSON.stringify(msgTemplate))
    saveMessage(msgTemplate, payload, newMsgRef, profile)
  })
})

function handleIndexReq (req, res) {
  if (req.body.entry[0].messaging) {
    bot._handleMessage(req.body)
  } else {
    updateLive(req.body.entry[0].id)
  }
  res.end(JSON.stringify({status: 'ok'}))
}

exports.MsgServer = functions.https.onRequest(app)
