
# From: http://stackoverflow.com/questions/8333981/how-do-you-sync-javascript
#   -animations-with-the-tempo-of-a-song-without-building
# Accurate Interval, guaranteed not to drift!
# (Though each call can still be a few milliseconds late)
accurateInterval = (time, fn) ->

  # This value is the next time the the timer should fire.
  nextAt = new Date().getTime() + time

  # Allow arguments to be passed in in either order.
  if typeof time is 'function'
    [fn, time] = [time, fn]

  # Create a function that wraps our function to run.  This is responsible for
  # scheduling the next call and aborting when canceled.
  wrapper = ->
    nextAt += time
    wrapper.timeout = setTimeout wrapper, nextAt - new Date().getTime()
    fn()

  # Clear the next call when canceled.
  wrapper.cancel = -> clearTimeout wrapper.timeout

  # Schedule the first call.
  setTimeout wrapper, nextAt - new Date().getTime()

  # Return the wrapper function so cancel() can later be called on it.
  return wrapper



class Tempo
  ## 
  # Constructs a new metronome with specified bpm and resolution.
  # [0] sub = 1/64,
  # [1] div = 1/16th, 
  # [2] beat = 1/4er, 
  # [3] bar = 1, 
  # [4] word = 4, 
  # [5] verse = 16, 
  # [6] song = 64
  constructor: (@bpm, @resolution) ->
    @callbacks = [null,null,null,null,null,null,null]
    @ticker = 0
    @resolution = 2 if @resolution is undefined
    @delay = (1 / (@bpm / 60000)) / Math.pow(4, 2 - @resolution) # Onbeat / Res
    @fix = 0
    @devlog = false

  play: ->
    @timer = accurateInterval(@delay, @tick.bind(this))
    return true
    # Check bpm. If too high, don't play, return false.

  tick: ->
    @ticker++
    if @devlog
      log = @ticker + " ~ "
      log = Array(10 - log.length).join(' ') + log unless log.length >= 10
      log = log + Array(@resolution).join(' 0')

    n = 1
    while (@ticker / Math.pow(4, n)) >> 0 > 0
      pow = Math.pow(4, n)
      if @ticker % pow is 0
        @callbacks[n + @resolution]() if @callbacks[n + @resolution]
      
      log = log + " " + (((@ticker / pow) >> 0) % 4) if @devlog
      
      n++
    console.log log if @devlog
    return

  getTime: ->
    @ticker

  register: (event, callback) ->
    index = switch event
      when "sub",   "1/64" , "0" then 0
      when "div",   "1/16" , "1" then 1
      when "beat",  "1/4"  , "2" then 2
      when "bar",   "1"    , "3" then 3
      when "word",  "4"          then 4
      when "verse", "16"   , "5" then 5
      when "song",  "64"   , "6" then 6
      else false

    return this unless index
    @callbacks[index] = callback
    return this

module.exports = Tempo

#
# Test
if require.main is module
  b = new Tempo(128, 1)
  b.devlog = true
  s = null
  b.register('beat', () ->
    console.log "bam"
  )
  
  b.register('bar', () -> console.log "badambam")
  
  b.play()
  