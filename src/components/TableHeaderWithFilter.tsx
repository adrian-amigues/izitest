import styled from 'styled-components'

import filter from '../icons/filter.svg'

type TableHeaderWithFilterProps = {
  label: string
  isActive: boolean
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

const FilterImage = styled.img<{ isActive: boolean }>`
  width: 16px;
  height: 16px;
  margin-left: 6px;

  filter: ${(props) =>
    props.isActive ? 'invert(59%) saturate(6193%) hue-rotate(164deg)' : 'none'};
`

const TableHeaderWithFilter: React.FC<TableHeaderWithFilterProps> = ({
  label,
  isActive,
  onFilter,
}) => {
  return (
    <th>
      <Wrapper>
        <span>{label}</span>
        <FilterButton onClick={onFilter}>
          <FilterImage src={filter} alt="filter" isActive={isActive} />
        </FilterButton>
      </Wrapper>
    </th>
  )
}

export default TableHeaderWithFilter
