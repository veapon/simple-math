// Generate random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate an addition question
function generateAddition(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(min, max)
  return {
    question: `${a} + ${b} =`,
    answer: a + b
  }
}

// Generate a subtraction question (ensure non-negative result for primary school)
function generateSubtraction(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(min, max)
  // Ensure result is non-negative
  if (a >= b) {
    return {
      question: `${a} - ${b} =`,
      answer: a - b
    }
  }
  return {
    question: `${b} - ${a} =`,
    answer: b - a
  }
}

// Generate a multiplication question
function generateMultiplication(min, max) {
  // For multiplication, use smaller range for primary school
  const actualMax = Math.min(max, 12) // Standard multiplication table goes up to 12
  const a = randomInt(min, actualMax)
  const b = randomInt(1, 10) // Second factor typically 1-10 for primary school
  return {
    question: `${a} × ${b} =`,
    answer: a * b
  }
}

// Generate a division question (ensure whole number result)
function generateDivision(min, max) {
  // Generate answer first, then work backwards
  const answer = randomInt(min, Math.min(max, 12))
  const divisor = randomInt(1, 10)
  const dividend = answer * divisor
  return {
    question: `${dividend} ÷ ${divisor} =`,
    answer: answer
  }
}

// Reverse type: ( ) + b = c, a + ( ) = c
function generateReverseAddition(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(min, max)
  const sum = a + b
  // Randomly choose which number to hide
  if (Math.random() < 0.5) {
    return {
      question: `( ) + ${b} = ${sum}`,
      answer: a
    }
  }
  return {
    question: `${a} + ( ) = ${sum}`,
    answer: b
  }
}

function generateReverseSubtraction(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(min, a) // b must be <= a to keep result non-negative
  const result = a - b
  // Randomly choose which number to hide
  if (Math.random() < 0.5) {
    return {
      question: `( ) - ${b} = ${result}`,
      answer: a
    }
  }
  return {
    question: `${a} - ( ) = ${result}`,
    answer: b
  }
}

function generateReverseMultiplication(min, max) {
  const actualMax = Math.min(max, 12)
  const a = randomInt(min, actualMax)
  const b = randomInt(1, 10)
  const product = a * b
  // Randomly choose which number to hide
  if (Math.random() < 0.5) {
    return {
      question: `( ) × ${b} = ${product}`,
      answer: a
    }
  }
  return {
    question: `${a} × ( ) = ${product}`,
    answer: b
  }
}

function generateReverseDivision(min, max) {
  const divisor = randomInt(1, 10)
  const answer = randomInt(min, Math.min(max, 12))
  const dividend = divisor * answer
  // Randomly choose which number to hide (dividend or divisor)
  if (Math.random() < 0.5) {
    return {
      question: `( ) ÷ ${divisor} = ${answer}`,
      answer: dividend
    }
  }
  return {
    question: `${dividend} ÷ ( ) = ${answer}`,
    answer: divisor
  }
}

// Continuous operations: a + b + c = (), a + b + () = c
function generateContinuousAddition(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(min, max)
  const c = randomInt(min, max)
  return {
    question: `${a} + ${b} + ${c} =`,
    answer: a + b + c
  }
}

function generateContinuousAdditionWithMissing(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(min, max)
  const c = randomInt(min, max)
  const sum = a + b + c
  // Randomly choose which number to hide
  const missing = randomInt(0, 2)
  if (missing === 0) {
    return {
      question: `( ) + ${b} + ${c} = ${sum}`,
      answer: a
    }
  } else if (missing === 1) {
    return {
      question: `${a} + ( ) + ${c} = ${sum}`,
      answer: b
    }
  } else {
    return {
      question: `${a} + ${b} + ( ) = ${sum}`,
      answer: c
    }
  }
}

function generateContinuousSubtraction(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(Math.min(min, 1), Math.min(a, max))
  const result1 = a - b
  const c = randomInt(Math.min(min, 1), Math.min(result1, max))
  return {
    question: `${a} - ${b} - ${c} =`,
    answer: result1 - c
  }
}

function generateContinuousMixed(min, max) {
  const a = randomInt(min, max)
  const b = randomInt(min, max)
  const c = randomInt(1, Math.min(max, 10))
  const sum = a + b
  const result = sum - c
  if (result >= 0) {
    return {
      question: `${a} + ${b} - ${c} =`,
      answer: result
    }
  }
  // If result is negative, swap operations
  return {
    question: `${a} - ${b} + ${c} =`,
    answer: a - b + c
  }
}

// Generate questions based on config
export function generateQuestions(config) {
  const { operations, questionTypes, range, questionCount } = config
  const [min, max] = range
  const questions = []

  const hasQuestionTypes = questionTypes && questionTypes.length > 0

  for (let i = 0; i < questionCount; i++) {
    let question

    // If special question types are selected, always generate those types
    if (hasQuestionTypes) {
      const selectedType = questionTypes[randomInt(0, questionTypes.length - 1)]

      if (selectedType === 'reverse') {
        const operation = operations[randomInt(0, operations.length - 1)]
        switch (operation) {
          case 'addition':
            question = generateReverseAddition(min, max)
            break
          case 'subtraction':
            question = generateReverseSubtraction(min, max)
            break
          case 'multiplication':
            question = generateReverseMultiplication(min, max)
            break
          case 'division':
            question = generateReverseDivision(min, max)
            break
          default:
            question = generateReverseAddition(min, max)
        }
      } else if (selectedType === 'continuous') {
        const continuousType = randomInt(0, 2)
        switch (continuousType) {
          case 0:
            question = generateContinuousAddition(min, max)
            break
          case 1:
            question = generateContinuousAdditionWithMissing(min, max)
            break
          case 2:
            question = generateContinuousSubtraction(min, max)
            break
          default:
            question = generateContinuousAddition(min, max)
        }
      }
    } else {
      // No special types selected, generate normal questions
      const operation = operations[randomInt(0, operations.length - 1)]
      switch (operation) {
        case 'addition':
          question = generateAddition(min, max)
          break
        case 'subtraction':
          question = generateSubtraction(min, max)
          break
        case 'multiplication':
          question = generateMultiplication(min, max)
          break
        case 'division':
          question = generateDivision(min, max)
          break
        default:
          question = generateAddition(min, max)
      }
    }

    questions.push(question)
  }

  return questions
}
