import React, { useState, useEffect } from 'react'
import {Layout, Typography, Input, Button, Space, Progress, Card, message, Tag, Popconfirm, InputNumber} from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { generateQuestions } from '../utils/questionGenerator'

const { Header, Content } = Layout
const { Title, Text } = Typography

function QuizPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const config = location.state?.config

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    if (!config) {
      navigate('/config')
      return
    }

    // Use passed questions if available (for retry), otherwise generate new ones
    const passedQuestions = location.state?.originalQuestions
    if (passedQuestions) {
      setQuestions(passedQuestions)
      setUserAnswers(new Array(passedQuestions.length).fill(null))
    } else {
      const generatedQuestions = generateQuestions(config)
      setQuestions(generatedQuestions)
      setUserAnswers(new Array(generatedQuestions.length).fill(null))
    }
  }, [config, navigate, location.state?.originalQuestions])

  if (!questions.length) {
    return null
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  // Format question to make ( ) wider
  const formatQuestion = (question) => {
    return question.replace(/\(\s*\)/g, '(   )')
  }

  const handleSubmit = () => {
    console.log(currentAnswer);
    if (currentAnswer === null || currentAnswer === undefined || currentAnswer === '') {
      message.warning('请输入答案')
      return
    }

    const answerNum = currentAnswer
    if (isNaN(answerNum)) {
      message.warning('请输入有效的数字')
      return
    }

    const correct = answerNum === currentQuestion.answer
    setIsCorrect(correct)

    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentIndex] = answerNum
    setUserAnswers(newUserAnswers)
    setIsSubmitted(true)

    // Show feedback message
    if (correct) {
      message.success('回答正确!')
    } else {
      message.error(`回答错误! 正确答案是: ${currentQuestion.answer}`)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setCurrentAnswer('')
      setIsSubmitted(false)
      setIsCorrect(false)
    } else {
      // Quiz completed, navigate to summary
      navigate('/quiz/summary', {
        state: {
          questions,
          userAnswers,
          config,
          originalQuestions: location.state?.originalQuestions || questions
        }
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitted) {
      handleSubmit()
    }
  }

  const handleQuit = () => {
    navigate('/')
  }

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh' }}>
      <Header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>简数</Title>
        <Popconfirm
          title="退出练习"
          description="确定要退出当前练习吗？进度将不会保存。"
          onConfirm={handleQuit}
          okText="确定"
          cancelText="取消"
        >
          <Button>退出</Button>
        </Popconfirm>
      </Header>

      <Content style={{
        padding: '24px',
        paddingTop: '88px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: '#f0f2f5',
        minHeight: 'calc(100vh - 64px)',
        overflowY: 'auto'
      }}>
        <Card style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <Progress
            percent={progress}
            showInfo={false}
            strokeColor="#1890ff"
            style={{ marginBottom: '16px' }}
          />

          <Text type="secondary" style={{ fontSize: '16px', marginBottom: '32px', display: 'block' }}>
            {currentIndex + 1} / {questions.length} 题
          </Text>

          <Title level={2} style={{ marginBottom: '48px', fontFamily: 'monospace' }}>
            {formatQuestion(currentQuestion.question)}
          </Title>

          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            <InputNumber
              controls={false}
              value={currentAnswer}
              onChange={e => setCurrentAnswer(e)}
              onKeyPress={handleKeyPress}
              placeholder="请输入答案"
              style={{ width: '100%', height: '60px', fontSize: '18px' }}
              disabled={isSubmitted}
              required={true}
            />

            {isSubmitted && (
              <Tag
                color={isCorrect ? 'success' : 'error'}
                style={{
                  fontSize: '16px',
                  padding: '8px 24px',
                  height: 'auto',
                  lineHeight: '24px'
                }}
              >
                {isCorrect ? '正确!' : `错误! 正确答案: ${currentQuestion.answer}`}
              </Tag>
            )}

            {!isSubmitted ? (
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                style={{ height: '50px', fontSize: '18px' }}
                block
              >
                提交
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={handleNext}
                style={{ height: '50px', fontSize: '18px' }}
                block
              >
                {currentIndex === questions.length - 1 ? '查看结果' : '下一题'}
              </Button>
            )}
          </Space>
        </Card>
      </Content>
    </Layout>
  )
}

export default QuizPage
