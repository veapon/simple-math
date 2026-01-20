import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import ConfigPage from './components/ConfigPage'
import PrintPreview from './components/PrintPreview'
import QuizPage from './components/QuizPage'
import QuizSummary from './components/QuizSummary'
import MultiplicationTable from './components/MultiplicationTable'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/print" element={<PrintPreview />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/summary" element={<QuizSummary />} />
        <Route path="/multiplication-table" element={<MultiplicationTable />} />
      </Routes>
    </ConfigProvider>
  )
}

export default App
