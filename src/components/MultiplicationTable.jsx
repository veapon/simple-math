import React from 'react';
import { Button, Card, Layout, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const MultiplicationTable = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };
  // 生成乘法表数据的逻辑
  const renderTable = () => {
    const rows = [];
    for (let i = 1; i <= 9; i++) {
      const cols = [];
      for (let j = 1; j <= i; j++) {
        cols.push(
          <Button
            key={`${i}-${j}`}
            style={{
              width: '100px', // 固定宽度让排列更整齐
              marginBottom: '10px',
              marginRight: '10px',
              backgroundColor: '#f9f9f9', // 稍微带点灰色的背景
              borderColor: '#e8e8e8',
              color: '#000',
              fontSize: '16px',
              height: '40px',
              textAlign: 'center',
            }}
          >
            {j} × {i} = {i * j}
          </Button>
        );
      }
      rows.push(
        <div key={i} style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {cols}
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <style>{`
        @media print {
          .ant-layout-header {
            display: none !important;
          }
          .ant-card {
            box-shadow: none !important;
            border: none !important;
          }
          body {
            background: #fff !important;
          }
        }
      `}</style>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* 顶部导航栏 */}
      <Header
        style={{
          backgroundColor: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e8e8e8',
          height: '64px',
        }}
      >
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>简数</Title>
        <Space>
          <Button onClick={handleBack}>返回</Button>
          <Button
            type="primary"
            onClick={handlePrint}
          >
            打印
          </Button>
        </Space>
      </Header>

      {/* 主要内容区域 */}
      <Content style={{ padding: '12px', display: 'flex', justifyContent: 'center' }}>
        <Card
          bordered={false}
          style={{
            width: '100%',
            maxWidth: '1200px', // 限制最大宽度
            minHeight: '800px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 卡片内部标题 */}
          <Title level={2} style={{ marginBottom: '60px', marginTop: '20px' }}>
            乘法口诀表
          </Title>

          {/* 乘法表容器 */}
          <div style={{ width: '100%'}}>
            {renderTable()}
          </div>
        </Card>
      </Content>
    </Layout>
    </>
  );
};

export default MultiplicationTable;