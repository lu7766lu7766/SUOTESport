import Hammer from 'hammerjs'
import { isEmpty } from 'lodash'

var gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe', 'doubletap']
var directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']

var VueHammer = {
  config: {},
  customEvents: {},
  guardDirections: function (options) {
    var dir = options.direction
    if (typeof dir === 'string') {
      var hammerDirection = 'DIRECTION_' + dir.toUpperCase()
      if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
        options.direction = Hammer[hammerDirection]
      } else {
        console.warn('[vue-hammer] invalid direction: ' + dir)
      }
    }
  },
  capitalize: function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

VueHammer.install = function (Vue) {
  Vue.directive('hammer', {
    bind: function (el, binding) {
      if (!el.hammer) {
        el.hammer = new Hammer.Manager(el)
      }
      var mc = el.hammer

      // determine event type
      var event = binding.arg
      if (!event) {
        console.warn('[vue-hammer] event type argument is required.')
      }
      VueHammer.config[event] = {}

      var direction = binding.modifiers
      if (!isEmpty(direction)) {
        Object.keys(direction).map(function (keyName) {
          VueHammer.config[event].direction = String(keyName)
        })
      }

      var recognizerType, recognizer

      if (VueHammer.customEvents[event]) {
        // custom event
        var custom = VueHammer.customEvents[event]
        recognizerType = custom.type
        recognizer = new Hammer[VueHammer.capitalize(recognizerType)](custom)
        recognizer.recognizeWith(mc.recognizers)
        mc.add(recognizer)
      } else {
        // built-in event
        recognizerType = gestures.find(function (gesture) { return gesture === event })
        if (!recognizerType) {
          console.warn('[vue-hammer] invalid event type: ' + event)
          return
        }
        recognizer = mc.get(recognizerType)
        if (!recognizer) {
          // add recognizer
          recognizer = new Hammer[VueHammer.capitalize(recognizerType)]()
          // make sure multiple recognizers work together...
          recognizer.recognizeWith(mc.recognizers)
          mc.add(recognizer)
        }
        // apply global options
        var globalOptions = VueHammer.config[recognizerType]
        if (globalOptions) {
          VueHammer.guardDirections(globalOptions)
          recognizer.set(globalOptions)
        }
        // apply local options
        var localOptions =
          el.hammerOptions &&
          el.hammerOptions[recognizerType]
        if (localOptions) {
          VueHammer.guardDirections(localOptions)
          recognizer.set(localOptions)
        }
      }
    },
    inserted: function (el, binding) {
      var mc = el.hammer
      var event = binding.arg
      if (mc.handler) {
        mc.off(event, mc.handler)
      }
      if (typeof binding.value !== 'function') {
        mc.handler = null
        console.warn(
          '[vue-hammer] invalid handler function for v-hammer: ' +
          binding.arg
        )
      } else {
        mc.on(event, (mc.handler = binding.value))
      }
    },
    update: function (el, binding) {
      var mc = el.hammer
      var event = binding.arg
      // teardown old handler
      if (mc.handler) {
        mc.off(event, mc.handler)
      }
      if (typeof binding.value !== 'function') {
        mc.handler = null
        console.warn(
          '[vue-hammer] invalid handler function for v-hammer: ' +
          binding.arg
        )
      } else {
        mc.on(event, (mc.handler = binding.value))
      }
    },
    unbind: function (el, binding) {
      var mc = el.hammer
      if (mc.handler) {
        el.hammer.off(binding.arg, mc.handler)
      }
      if (!Object.keys(mc.handlers).length) {
        el.hammer.destroy()
        el.hammer = null
      }
    },
  })
}

export default VueHammer

