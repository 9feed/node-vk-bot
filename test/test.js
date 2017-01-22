/* global describe before it */
const Bot = require('..')
// const assert = require('assert')

const peer = process.env.TEST_PEER_ID
const token = process.env.TEST_VK_TOKEN

describe('Bot', function () {
  let engbot, rusbot, bot, pollingbot

  before(function beforeAll () {
    bot = new Bot({ token })
    engbot = new Bot({
      token,
      api: { lang: 'en' }
    })
    rusbot = new Bot({
      token,
      api: { lang: 'ru' }
    })
    pollingbot = new Bot({ token })
    pollingbot.start()
  })

  describe('Events', function () {
    it('Emits "update" on recieved message', (done) => {
      pollingbot.once('update', () => done())
      pollingbot.send('Test message', peer)
    })
  })

  describe('#send', function () {
    it('Sends message', function () {
      return bot.send('Test message 2', peer)
    })
  })

  describe('API', function () {
    describe('Languages', function () {
      it('Gets response in Russian', function () {
        return rusbot.api('users.get', { user_ids: 1 })
          .then(res => res[0])
          .then(durov => {
            if (durov.first_name !== 'Павел') throw new Error()
          })
      })
      it('Gets response in English', function () {
        return engbot.api('users.get', { user_ids: 1 })
          .then(res => res[0])
          .then(durov => {
            if (durov.first_name !== 'Pavel') throw new Error()
          })
      })
    })
  })
})
