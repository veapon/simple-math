import { Layout, Typography, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Header, Content } = Layout
const { Title } = Typography

function Homepage() {
  const navigate = useNavigate()

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
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        background: '#f0f2f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={1}>简数</Title>
          <Title level={4} type="secondary" style={{ fontStyle : 'italic'}}>简简单单的学习数学</Title>
        </div>
        <Space direction="vertical" size="middle">
          <Button
            type="primary"
            onClick={() => navigate('/config')}
            style={{ minWidth: '200px' }}
          >
            四则运算
          </Button>
          <Button
              type="primary"
            onClick={() => navigate('/multiplication-table')}
            style={{ minWidth: '200px' }}
          >
            乘法口诀
          </Button>
        </Space>
      </Content>
    </Layout>
  )
}

export default Homepage
