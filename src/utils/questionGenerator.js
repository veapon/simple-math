// Generate random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate an addition question (ensure result is within range)
function generateAddition(min, max) {
  // Generate result first, then work backwards to ensure all numbers are within range
  const answer = randomInt(min + 1, max)
  const a = randomInt(min, answer - 1)
  const b = answer - a
  return {
    question: `${a} + ${b} =`,
    answer: answer
  }
}

// Generate a subtraction question (ensure all numbers are within range)
function generateSubtraction(min, max) {
  // Generate a, b, and result all within range, ensuring result is non-negative
  const a = randomInt(min + 1, max)
  const b = randomInt(min, a - 1)
  const result = a - b
  return {
    question: `${a} - ${b} =`,
    answer: result
  }
}

// Generate a multiplication question (ensure product is within range)
function generateMultiplication(min, max) {
  // For primary school, cap max at 12 for multiplication table style
  const actualMax = Math.min(max, 12)

  // Generate factors where both are within range and product is within range
  // Generate result first, then find factors
  const answer = randomInt(min, actualMax)

  // Find all factor pairs of answer
  const factors = []
  for (let a = min; a <= answer; a++) {
    if (answer % a === 0 && answer / a <= actualMax) {
      factors.push([a, answer / a])
    }
  }

  // If no valid factors found, use simple fallback
  if (factors.length === 0) {
    return {
      question: `1 × ${answer} =`,
      answer: answer
    }
  }

  // Randomly select a factor pair
  const [a, b] = factors[randomInt(0, factors.length - 1)]
  return {
    question: `${a} × ${b} =`,
    answer: answer
  }
}

// Generate a division question (ensure dividend, divisor, and answer are all within range)
function generateDivision(min, max) {
  // For primary school, cap max at 12 for division table style
  const actualMax = Math.min(max, 12)

  // Generate answer first
  const answer = randomInt(min, actualMax)

  // Generate divisor such that dividend = answer × divisor ≤ actualMax
  // divisor must be between 1 and actualMax/answer
  const maxDivisor = Math.floor(actualMax / answer)
  const divisor = randomInt(1, Math.max(2, maxDivisor))
  const dividend = answer * divisor

  return {
    question: `${dividend} ÷ ${divisor} =`,
    answer: answer
  }
}

// Reverse type: ( ) + b = c, a + ( ) = c (ensure all numbers within range)
function generateReverseAddition(min, max) {
  // Generate sum first, then operands
  const sum = randomInt(min + 1, max)
  const a = randomInt(min, sum - 1)
  const b = sum - a
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
  // Generate all three numbers within range
  const a = randomInt(min + 1, max)
  const b = randomInt(min, a - 1)
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
  // For primary school, cap max at 12
  const actualMax = Math.min(max, 12)

  // Generate product first within range
  const product = randomInt(min, actualMax)

  // Find all factor pairs
  const factors = []
  for (let a = min; a <= product; a++) {
    if (product % a === 0 && product / a <= actualMax) {
      factors.push([a, product / a])
    }
  }

  // If no valid factors, use fallback
  if (factors.length === 0) {
    return {
      question: `( ) × 1 = ${product}`,
      answer: product
    }
  }

  // Randomly select a factor pair
  const [a, b] = factors[randomInt(0, factors.length - 1)]

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
  // For primary school, cap max at 12
  const actualMax = Math.min(max, 12)

  // Generate answer first
  const answer = randomInt(min, actualMax)

  // Generate divisor such that dividend = answer × divisor ≤ actualMax
  const maxDivisor = Math.floor(actualMax / answer)
  const divisor = randomInt(1, Math.max(2, maxDivisor))
  const dividend = answer * divisor

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

// Continuous operations: a + b + c = (), a + b + () = c (ensure all numbers within range)
function generateContinuousAddition(min, max) {
  // Generate sum first, then work backwards to ensure all numbers are within range
  const sum = randomInt(min + 2, max)
  // Generate three numbers that sum to the total
  const a = randomInt(min, sum - 2)
  const remainingAfterA = sum - a
  const b = randomInt(min, remainingAfterA - 1)
  const c = remainingAfterA - b
  return {
    question: `${a} + ${b} + ${c} =`,
    answer: sum
  }
}

function generateContinuousAdditionWithMissing(min, max) {
  // Generate sum first, then work backwards
  const sum = randomInt(min + 2, max)
  const a = randomInt(min, sum - 2)
  const remainingAfterA = sum - a
  const b = randomInt(min, remainingAfterA - 1)
  const c = remainingAfterA - b

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
  // Generate all numbers within range
  const a = randomInt(min + 2, max)
  const b = randomInt(1, a - 1)
  const result1 = a - b
  const c = randomInt(1, result1 - 1)
  return {
    question: `${a} - ${b} - ${c} =`,
    answer: result1 - c
  }
}

function generateContinuousMixed(min, max) {
  // Generate result first, then work backwards for a + b - c = result
  // This ensures all numbers (a, b, c, and result) are within range
  const result = randomInt(min, max - 2)
  const c = randomInt(min, max - result - 1)
  const sum = result + c
  const a = randomInt(min, sum - 1)
  const b = sum - a

  return {
    question: `${a} + ${b} - ${c} =`,
    answer: result
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
