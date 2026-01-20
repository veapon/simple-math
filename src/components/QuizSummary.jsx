import { useState, useEffect } from 'react'
import { Layout, Typography, Card, Button, Space, Tag, List, Divider } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircleOutlined, CloseCircleOutlined, HomeOutlined } from '@ant-design/icons'

const { Header, Content } = Layout
const { Title, Text } = Typography

function QuizSummary() {
  const navigate = useNavigate()
  const location = useLocation()
  const { questions, userAnswers, config, originalQuestions } = location.state || { questions: [], userAnswers: [], config: null, originalQuestions: null }

  useEffect(() => {
    if (!questions.length || !userAnswers.length) {
      navigate('/config')
    }
  }, [questions, userAnswers, navigate])

  if (!questions.length) {
    return null
  }

  // Format question to make ( ) wider
  const formatQuestion = (question) => {
    return question.replace(/\(\s*\)/g, '(   )')
  }

  const correctCount = questions.filter((q, idx) => q.answer === userAnswers[idx]).length
  const wrongCount = questions.length - correctCount
  const score = Math.round((correctCount / questions.length) * 100)

  const handleGoHome = () => {
    navigate('/')
  }

  const handleRetry = () => {
    if (config && originalQuestions) {
      navigate('/quiz', { state: { config, originalQuestions } })
    } else if (config) {
      navigate('/quiz', { state: { config } })
    } else {
      navigate('/config')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>简数</Title>
      </Header>

      <Content style={{
        padding: '24px',
        background: '#f0f2f5',
        minHeight: 'calc(100vh - 64px)'
      }}>
        <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Score Summary */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={2}>练习完成!</Title>
            <div style={{ fontSize: '72px', fontWeight: 'bold', color: score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#f5222d' }}>
              {score}分
            </div>
            <Space size="large" style={{ marginTop: '16px' }}>
              <Text type="success">
                <CheckCircleOutlined /> 正确: {correctCount} 题
              </Text>
              <Text type="danger">
                <CloseCircleOutlined /> 错误: {wrongCount} 题
              </Text>
            </Space>
          </div>

          <Divider />

          {/* Question Details */}
          <Title level={4}>题目详情</Title>
          <List
            dataSource={questions.map((q, idx) => ({ ...q, userAnswer: userAnswers[idx], idx }))}
            renderItem={(item) => {
              const isCorrect = item.answer === item.userAnswer
              return (
                <List.Item
                  key={item.idx}
                  style={{
                    padding: '16px',
                    background: isCorrect ? '#f6ffed' : '#fff1f0',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      isCorrect ? (
                        <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                      ) : (
                        <CloseCircleOutlined style={{ fontSize: '24px', color: '#f5222d' }} />
                      )
                    }
                    title={
                      <Text style={{ fontSize: '18px', fontFamily: 'monospace' }}>
                        {item.idx + 1}. {formatQuestion(item.question)}
                      </Text>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Text>你的答案: {item.userAnswer ?? '未作答'}</Text>
                        {!isCorrect && (
                          <Text type="danger">正确答案: {item.answer}</Text>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )
            }}
          />

          <Divider />

          {/* Action Buttons */}
          <Space style={{ width: '100%', justifyContent: 'center' }} size="middle">
            <Button
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              size="large"
            >
              返回首页
            </Button>
            <Button
              type="primary"
              onClick={handleRetry}
              size="large"
            >
              再练一次
            </Button>
          </Space>
        </Card>
      </Content>
    </Layout>
  )
}

export default QuizSummary
