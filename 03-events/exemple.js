const stdin = process.openStdin()
stdin.addListener('data', function (value) {
  console.log(`Voce digitou: ${value.toString().trim()}`)
})
