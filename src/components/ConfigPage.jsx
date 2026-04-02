import { useState } from 'react'
import { Layout, Typography, Card, Radio, InputNumber, Button, Space, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Header, Content } = Layout
const { Title } = Typography

const OPERATION_OPTIONS = [
  { label: '加法', value: 'addition' },
  { label: '减法', value: 'subtraction' },
  { label: '乘法', value: 'multiplication' },
  { label: '除法', value: 'division' },
]



const QUESTION_COUNT_OPTIONS = [
  { label: '10题', value: 10 },
  { label: '20题', value: 20 },
  { label: '30题', value: 30 },
  { label: '自定义', value: 'custom' },
]

const QUESTION_TYPE_OPTIONS = [
  { label: '逆向题型', value: 'reverse' },
  { label: '连续运算', value: 'continuous' },
]

function ConfigPage() {
  const navigate = useNavigate()
  const [operations, setOperations] = useState(['addition'])
  const [questionTypes, setQuestionTypes] = useState([])
  const [rangeMin, setRangeMin] = useState(1)
  const [rangeMax, setRangeMax] = useState(10)
  const [questionCountType, setQuestionCountType] = useState(10)
  const [customQuestionCount, setCustomQuestionCount] = useState(50)

  const getConfig = () => ({
    operations,
    questionTypes,
    range: [rangeMin, rangeMax],
    questionCount: questionCountType === 'custom' ? customQuestionCount : questionCountType,
  })

  const handleStart = () => {
    const config = getConfig()
    navigate('/quiz', { state: { config } })
  }

  const handlePrint = () => {
    const config = getConfig()
    navigate('/print', { state: { config } })
  }

  const handleBack = () => {
    navigate('/')
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: '#f0f2f5'
      }}>
        <Card style={{ width: '100%', maxWidth: '500px', height: 'fit-content' }} title={'题目设置'}>
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            {/* 运算类型 */}
            <div>
              <Title level={5}>运算</Title>
              <Space wrap>
                {OPERATION_OPTIONS.map(option => (
                  <Tag.CheckableTag
                    key={option.value}
                    checked={operations.includes(option.value)}
                    onChange={(checked) => {
                      if (checked) {
                        setOperations([...operations, option.value])
                      } else {
                        setOperations(operations.filter(op => op !== option.value))
                      }
                    }}
                  >
                    {option.label}
                  </Tag.CheckableTag>
                ))}
              </Space>
            </div>

            {/* 数值范围 */}
            <div>
              <Title level={5}>范围</Title>
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber
                  min={1}
                  max={rangeMax - 1}
                  value={rangeMin}
                  onChange={(value) => value && setRangeMin(value)}
                  style={{ width: '45%' }}
                  placeholder="最小值"
                />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '10%',
                  background: '#fafafa',
                  border: '1px solid #d9d9d9',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}>~</div>
                <InputNumber
                  min={rangeMin + 1}
                  max={10000}
                  value={rangeMax}
                  onChange={(value) => value && setRangeMax(value)}
                  style={{ width: '45%' }}
                  placeholder="最大值"
                />
              </Space.Compact>
            </div>

            {/* 题量 */}
            <div>
              <Title level={5}>题量</Title>
              <Radio.Group
                value={questionCountType}
                onChange={(e) => setQuestionCountType(e.target.value)}
                style={{ width: '100%' }}
                optionType="button"
                buttonStyle="solid"
                size={'small'}
              >
                {QUESTION_COUNT_OPTIONS.map(option => (
                  <Radio.Button key={option.value} value={option.value}>
                    {option.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
              {questionCountType === 'custom' && (
                <InputNumber
                  min={1}
                  max={1000}
                  value={customQuestionCount}
                  onChange={(value) => setCustomQuestionCount(value)}
                  style={{ marginTop: '8px', width: '100%' }}
                  placeholder="请输入题目数量"
                />
              )}
            </div>

            {/* 题型 */}
            <div>
              <Title level={5}>题型</Title>
              <Space wrap>
                {QUESTION_TYPE_OPTIONS.map(option => (
                  <Tag.CheckableTag
                    key={option.value}
                    checked={questionTypes.includes(option.value)}
                    onChange={(checked) => {
                      if (checked) {
                        setQuestionTypes([...questionTypes, option.value])
                      } else {
                        setQuestionTypes(questionTypes.filter(t => t !== option.value))
                      }
                    }}
                  >
                    {option.label}
                  </Tag.CheckableTag>
                ))}
              </Space>
            </div>

            {/* 按钮组 */}
            <Space style={{ width: '100%', justifyContent: 'center' }} size="middle">
              <Button onClick={handleBack}>
                返回
              </Button>
              <Button onClick={handlePrint}>
                打印
              </Button>
              <Button type="primary" onClick={handleStart}>
                开始练习
              </Button>
            </Space>
          </Space>
        </Card>
      </Content>
    </Layout>
  )
}

export default ConfigPage
