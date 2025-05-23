const choices = [
  {
    question: "You open a new tab to escape... but it opens this website again.",
    options: ["Scream into the void", "Refresh the page"],
    outcomes: ["The void echoes back... ‘Nice try.’", "You refreshed. Now there are two of this website."],
  },
  {
    question: "A notification says: 'You're being watched 👁️'.",
    options: ["Wave hello", "Unplug your router"],
    outcomes: ["The notification waves back. It's polite like that.", "Nice move. But... the message appears *on your toaster*."],
  },
  {
    question: "An error pops up: '404 Escape Not Found'.",
    options: ["Cry", "Ctrl+Alt+Delete reality"],
    outcomes: ["You cry in binary. The website offers a tissue… made of pixels.", "You triggered a boss fight. Against your own reflection."],
  },
  {
    question: "Your cursor glitches and forms the words: 'JOIN US'.",
    options: ["Join them", "Fight back with emojis"],
    outcomes: ["You are now part of the glitch cult. Welcome, Glitchling.", "Your emojis bounce back. Now the website speaks only in 🐸🍕✨."],
  },
  {
    question: "Final Round: The Restart Button is now... breathing?",
    options: ["Click it anyway", "Run far, far away"],
    outcomes: ["You’ve been rebooted. As a JavaScript function.", "Too late. The button clicked **you**."],
  },
]



let step = 0

const questionEl = document.getElementById("question")
const optionsEl = document.getElementById("options")
const resultEl = document.getElementById("result")
const restartBtn = document.getElementById("restart")
const clickSound = document.getElementById("clickSound")
const glitchSound = document.getElementById("glitchSound")
const successSound = document.getElementById("successSound")

function typeText(element, text, callback) {
  let i = 0
  element.textContent = ''
  const interval = setInterval(() => {
    element.textContent += text.charAt(i)
    i++
    if (i === text.length) {
      clearInterval(interval)
      if (callback) callback()
    }
  }, 35)
}

function showStep() {
  const current = choices[step]
  document.body.classList.toggle('fun', step % 2 === 1)
  questionEl.classList.remove("flash")
  resultEl.classList.add("hidden")
  restartBtn.classList.add("hidden")
  optionsEl.innerHTML = ""

  typeText(questionEl, current.question)

  current.options.forEach((opt, i) => {
    const btn = document.createElement("button")
    btn.textContent = opt
    btn.onclick = () => handleChoice(i)
    optionsEl.appendChild(btn)
  })
}

function handleChoice(index) {
  glitchSound.play()
  document.body.classList.add("flash")
  setTimeout(() => document.body.classList.remove("flash"), 200)

  const outcome = choices[step].outcomes[index]
  resultEl.textContent = outcome
  resultEl.classList.remove("hidden")

  if (step === choices.length - 1) {
    successSound.play()
    restartBtn.classList.remove("hidden")
  } else {
    step++
    setTimeout(showStep, 2500)
  }
}

restartBtn.onclick = () => {
  clickSound.play()
  step = 0
  showStep()
}

showStep()
