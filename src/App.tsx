import styled from 'styled-components'
import TempsTable from './components/TempsTable'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #fafafa;
  height: 100vh;
`

function App() {
  return (
    <Wrapper>
      <TempsTable />
    </Wrapper>
  )
}

export default App
