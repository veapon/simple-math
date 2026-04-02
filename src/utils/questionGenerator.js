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
  // Each operand must be at least lo (>= 1 to avoid trivial 0s)
  const lo = Math.max(min, 1)
  // sum must be >= 3*lo so each of the 3 operands can be >= lo
  const sum = randomInt(3 * lo, max)
  // Constrain a so remaining (sum - a) >= 2*lo, leaving room for b and c
  const a = randomInt(lo, sum - 2 * lo)
  const remainingAfterA = sum - a
  // Constrain b so c = remaining - b >= lo
  const b = randomInt(lo, remainingAfterA - lo)
  const c = remainingAfterA - b
  return {
    question: `${a} + ${b} + ${c} =`,
    answer: sum
  }
}

function generateContinuousAdditionWithMissing(min, max) {
  const lo = Math.max(min, 1)
  const sum = randomInt(3 * lo, max)
  const a = randomInt(lo, sum - 2 * lo)
  const remainingAfterA = sum - a
  const b = randomInt(lo, remainingAfterA - lo)
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
  const lo = Math.max(min, 1)
  // Need a >= 2*lo so both b and c can be >= lo and result >= 0
  const a = randomInt(2 * lo, max)
  // b in [lo, a - lo] ensures afterB = a - b >= lo
  const b = randomInt(lo, a - lo)
  const afterB = a - b
  // c in [lo, afterB] ensures result = afterB - c >= 0
  const c = randomInt(lo, afterB)
  return {
    question: `${a} - ${b} - ${c} =`,
    answer: afterB - c
  }
}

function generateContinuousMixed(min, max) {
  const lo = Math.max(min, 1)
  // a + b - c = result, where a, b, c >= lo, result >= 0
  // Generate result and c first, then split (result + c) into a + b
  const result = randomInt(lo, max - 2 * lo)
  const c = randomInt(lo, max - result - lo)
  const sum = result + c // sum >= 2*lo since result >= lo and c >= lo
  const a = randomInt(lo, sum - lo)
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
