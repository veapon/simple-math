import { Layout, Typography, Button, Space } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { generateQuestions } from '../utils/questionGenerator'

const { Header, Content } = Layout
const { Title } = Typography

function PrintPreview() {
  const navigate = useNavigate()
  const location = useLocation()
  const config = location.state?.config

  if (!config) {
    navigate('/config')
    return null
  }

  const questions = generateQuestions(config)

  // Format question to make ( ) wider
  const formatQuestion = (question) => {
    return question.replace(/\(\s*\)/g, '(   )')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleBack = () => {
    navigate('/config')
  }

  // Group questions by columns for printable layout
  const columns = 2
  const questionsPerColumn = Math.ceil(questions.length / columns)
  const columnGroups = []
  for (let i = 0; i < columns; i++) {
    columnGroups.push(questions.slice(i * questionsPerColumn, (i + 1) * questionsPerColumn))
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>简数</Title>
        <Space>
          <Button onClick={handleBack}>返回</Button>
          <Button type="primary" onClick={handlePrint}>打印</Button>
        </Space>
      </Header>
      <Content style={{
        padding: '40px',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Printable area */}
        <div className="printable-area" style={{
          width: '100%',
          maxWidth: '210mm',
          padding: '20mm',
          background: '#fff',
          '@media print': {
            padding: '10mm'
          }
        }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            四则运算练习题
          </Title>

          {/* Info section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            fontSize: '14px',
            borderBottom: '1px solid #ddd',
            paddingBottom: '10px'
          }}>
            <span>日期: ___________</span>
            <span>姓名: ___________</span>
            <span>得分: ___________</span>
          </div>

          {/* Questions grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '24px'
          }}>
            {columnGroups.map((column, colIndex) => (
              <div key={colIndex} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {column.map((q, qIndex) => {
                  const globalIndex = colIndex * questionsPerColumn + qIndex + 1
                  return (
                    <div key={globalIndex} style={{
                      fontSize: '16px',
                      fontFamily: 'monospace',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ minWidth: '24px', color: '#999' }}>
                        {globalIndex}.
                      </span>
                      <span style={{ flex: 1 }}>{formatQuestion(q.question)}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </Content>

      {/* Print styles */}
      <style>{`
        @media print {
          .ant-layout-header {
            display: none !important;
          }
          .ant-layout-content {
            padding: 0 !important;
            background: #fff !important;
          }
          body {
            background: #fff !important;
          }
        }
      `}</style>
    </Layout>
  )
}

export default PrintPreview
