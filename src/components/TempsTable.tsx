import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { tempsData, Temp, tempLabelMapping } from '../tempsData'
import FilterModal from './FilterModal'
import TableHeaderWithFilter from './TableHeaderWithFilter'

const Wrapper = styled.div`
  min-height: 800px;
  background: white;
`

const Table = styled.table`
  border-radius: 8px;
  padding: 17px 24px;
  border-spacing: 0;
  width: 800px;
  table-layout: fixed;

  td,
  th {
    border-bottom: 1px solid #e2e6ee;
  }
`

const TableRow = styled.tr`
  height: 40px;
`

const TableHead = styled.thead`
  background: #f7f9fa;
  color: #2b497c;
`

const FilterModalTableRow = styled.tr`
  height: 0;
  display: block;
  text-align: left;

  th {
    font-weight: initial;
  }
`

const TableCell = styled.td`
  padding-left: 8px;
`

export const DEFAULT_SORT = 'date'

const TempsTable: React.FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [searchedProperty, setSearchedProperty] =
    useState<keyof Temp | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(DEFAULT_SORT)

  const handleOpenFilterModal = (name: keyof Temp) => {
    setIsFilterModalOpen(true)
    setSearchedProperty(name)
  }

  const handleCloseFilterModal = (search: string, sortBy: string) => {
    setSearch(search)
    setSortBy(sortBy)
    setIsFilterModalOpen(false)
  }

  const refinedTemps = useMemo(() => {
    const filteredTemps = searchedProperty
      ? tempsData.filter((temp) => {
          const property = temp[searchedProperty]
          if (typeof property !== 'string') return true

          return property.toLowerCase().startsWith(search.toLowerCase())
        })
      : tempsData

    const sortedTemps = filteredTemps.sort((a, b) => {
      if (sortBy === 'date') return a.creationDate <= b.creationDate ? -1 : 1

      if (!searchedProperty || typeof a[searchedProperty] !== 'string') return 0

      if (sortBy === 'az')
        return a[searchedProperty] <= b[searchedProperty] ? -1 : 1
      // sortyBy === 'za'
      return a[searchedProperty] > b[searchedProperty] ? -1 : 1
    })
    return sortedTemps
  }, [search, searchedProperty, sortBy])

  return (
    <Wrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderWithFilter
              label={tempLabelMapping.email}
              onFilter={() => handleOpenFilterModal('email')}
              isActive={!!search && searchedProperty === 'email'}
            />
            <TableHeaderWithFilter
              label={tempLabelMapping.job}
              onFilter={() => handleOpenFilterModal('job')}
              isActive={!!search && searchedProperty === 'job'}
            />
            <TableHeaderWithFilter
              label={tempLabelMapping.client}
              onFilter={() => handleOpenFilterModal('client')}
              isActive={!!search && searchedProperty === 'client'}
            />
          </TableRow>
          <FilterModalTableRow>
            <th>
              <FilterModal
                isOpen={isFilterModalOpen}
                onClose={handleCloseFilterModal}
                searchedProperty={searchedProperty}
              />
            </th>
          </FilterModalTableRow>
        </TableHead>
        <tbody>
          {refinedTemps.map((temp) => (
            <TableRow key={temp.email}>
              <TableCell>{temp.email}</TableCell>
              <TableCell>{temp.job}</TableCell>
              <TableCell>{temp.client}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}

export default TempsTable
