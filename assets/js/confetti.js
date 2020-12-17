// Source: https://unpkg.com/extra.css@1.2.0/confetti.js

(() => {
  const worklet = `
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

if (typeof registerPaint !== 'undefined') {
  class ExtraConfetti {
    static get inputProperties() {
      return ['--extra-confettiNumber','--extra-confettiLengthVariance', '--extra-confettiWeightVariance']
    }
  
    paint(ctx, size, properties) {
      const confettiNum = properties.get('--extra-confettiNumber')

      const minLength = 3
      const maxLength = minLength + parseInt(properties.get('--extra-confettiLengthVariance'))
      const minWeight = 1
      const maxWeight = minWeight + parseInt(properties.get('--extra-confettiWeightVariance'))

      for (var i = 0; i < confettiNum; i++) {
        const x = Math.random() * size.width
        const y = Math.random() * (size.height - maxLength)
        const confettiLength = getRandom(minLength, maxLength)
        const confettiWeight = getRandom(minWeight, maxWeight)

        // Set Color
        const hue = getRandom(0,360)
        const sat = getRandom(90,100)
        const light = getRandom(40,90)
        const color = 'hsl(' + hue + 'deg,' + sat + '%,' + light + '%)'

        // Set Paint Info
        ctx.lineWidth = confettiWeight
        ctx.strokeStyle = color
        
        //  Calculate New Position
        const angle = getRandom(0,89)
        const hypotenuse = confettiLength
        const newX = x + Math.cos(angle) * hypotenuse
        const newY = y + Math.sin(angle) * hypotenuse

        // Paint
        ctx.beginPath();
        ctx.moveTo(x,y)
        ctx.lineTo(newX, newY)
        ctx.stroke()
      }
    }
  }
  
  registerPaint('extra-confetti', ExtraConfetti)
}`

const workletBlob = URL.createObjectURL(new Blob([worklet], { type: 'application/javascript' }))

window.CSS.paintWorklet.addModule(workletBlob)
})()