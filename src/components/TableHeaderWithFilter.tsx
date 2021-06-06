import styled from 'styled-components'

import filter from '../icons/filter.svg'

type TableHeaderWithFilterProps = {
  label: string
  onFilter: () => void
}

const Wrapper = styled.div`
  text-align: left;
  padding-left: 8px;
  display: flex;
  align-items: center;
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const FilterImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 6px;
`

const TableHeaderWithFilter: React.FC<TableHeaderWithFilterProps> = ({
  label,
  onFilter,
}) => {
  return (
    <th>
      <Wrapper>
        <span>{label}</span>
        <FilterButton onClick={onFilter}>
          <FilterImage src={filter} alt={filter} />
        </FilterButton>
      </Wrapper>
    </th>
  )
}

export default TableHeaderWithFilter
