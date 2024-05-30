const Millisecond = 1
const Second = Millisecond * 1000
const Minute = Second * 60
const Hour = Minute * 60
const Day = Hour * 24

function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

export default {
  Millisecond,
  Second,
  Minute,
  Hour,
  Day,
  sleep,
}
