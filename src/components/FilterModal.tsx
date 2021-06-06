import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DEFAULT_SORT } from './TempsTable'

const Wrapper = styled.div`
  width: 345px;
  min-height: 100px;
  position: absolute;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 6px 0 rgba(147, 163, 192, 0.5);
  padding: 24px;
`

const SearchInputWrapper = styled.div`
  input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #196cff;
    padding: 0 8px;
  }
`

const SortingTitle = styled.p`
  color: #2b497c;
  font-weight: 700;
  margin-top: 26px;
`

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InputRow = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: 8px;
  }

  label {
    margin-left: 10px;
  }
`

type FilterModalProps = {
  isOpen: boolean
  onClose: (search: string, sortBy: string) => void
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(DEFAULT_SORT)

  const handleKeyPress = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        onClose('', DEFAULT_SORT)
      } else if (key === 'Enter') {
        onClose(search, sortBy)
      }
    },
    [onClose, search, sortBy]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  if (!isOpen) return null

  return (
    <Wrapper>
      <SearchInputWrapper>
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchInputWrapper>
      <SortingTitle>Option de tri</SortingTitle>
      <RadioWrapper>
        <InputRow>
          <input
            type="radio"
            name="sortBy"
            value="date"
            id="date"
            checked={sortBy === 'date'}
            onChange={(e) => setSortBy(e.target.value)}
          />
          <label htmlFor="date">Trier par date de création</label>
        </InputRow>
        <InputRow>
          <input
            type="radio"
            name="sortBy"
            value="az"
            id="az"
            checked={sortBy === 'az'}
            onChange={(e) => setSortBy(e.target.value)}
          />
          <label htmlFor="az">Trier de A à Z</label>
        </InputRow>
        <InputRow>
          <input
            type="radio"
            name="sortBy"
            value="za"
            id="za"
            checked={sortBy === 'za'}
            onChange={(e) => setSortBy(e.target.value)}
          />
          <label htmlFor="za">Trier de Z à A</label>
        </InputRow>
      </RadioWrapper>
    </Wrapper>
  )
}

export default FilterModal
