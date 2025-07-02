import React, { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList
} from 'recharts'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Search } from 'lucide-react'

const initialData = [
  { name: 'Team 1', usage: 65, resources: 4, resourceGrp: 2, budget: 35, actual: 100 },
  { name: 'Team 2', usage: 55, resources: 3, resourceGrp: 1, budget: 50, actual: 40 },
  { name: 'Team 3', usage: 80, resources: 5, resourceGrp: 2, budget: 60, actual: 70 },
  { name: 'Team 4', usage: 75, resources: 2, resourceGrp: 1, budget: 45, actual: 35 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const team = payload[0].payload
  return (
    <div className="rounded-lg shadow px-4 py-3 bg-white text-sm">
      <strong>{team.name}</strong>
      <div>Resources: <strong>{team.resources}</strong></div>
      <div>Resource Grp: <strong>{team.resourceGrp}</strong></div>
      <div>Budget: <strong>${team.budget}</strong></div>
      <div>Usage: <strong>${team.actual}</strong></div>
    </div>
  )
}

const sortData = (data, type) => {
  const sorted = [...data]
  switch (type) {
    case 'overspend':
      return sorted.sort((a, b) => (b.actual - b.budget) - (a.actual - a.budget))
    case 'underspend':
      return sorted.sort((a, b) => (a.actual - a.budget) - (b.actual - b.budget))
    case 'max':
      return sorted.sort((a, b) => b.usage - a.usage)
    case 'min':
      return sorted.sort((a, b) => a.usage - b.usage)
    default:
      return initialData
  }
}

export default function TeamUsageChart() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState(initialData)
  const [chartHeight, setChartHeight] = useState(300)
  const [marginLeft, setMarginLeft] = useState(120)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setChartHeight(400)
        setMarginLeft(80)
      } else if (window.innerWidth < 768) {
        setChartHeight(350)
        setMarginLeft(100)
      } else {
        setChartHeight(300)
        setMarginLeft(120)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSort = (type) => {
    setData(sortData(data, type))
  }

  const filtered = data.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto relative z-0 bg-[#F4F4F4]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <label className="text-lg font-semibold mr-0 sm:mr-4">Teams</label>
          <div className="relative bg-[#EBEBEB] rounded-md px-2 py-1 flex items-center w-full sm:w-auto sm:min-w-[220px]">
            <Search size={18} className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search Teams"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
              aria-label="Search teams"
            />
          </div>
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button 
              className="border px-3 py-1 rounded-md bg-white shadow text-sm z-10 relative w-full sm:w-auto whitespace-nowrap"
              aria-label="Sort options"
            >
              Sort By ▾
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            sideOffset={5}
            className="bg-white rounded shadow text-sm p-1 z-50 min-w-[200px]"
            align={window.innerWidth < 640 ? 'end' : 'start'}
          >
            <DropdownMenu.Item 
              onSelect={() => handleSort('overspend')} 
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              Most Overspending
            </DropdownMenu.Item>
            <DropdownMenu.Item 
              onSelect={() => handleSort('underspend')} 
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              Most Underspending
            </DropdownMenu.Item>
            <DropdownMenu.Item 
              onSelect={() => handleSort('max')} 
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              Max Resources Usage
            </DropdownMenu.Item>
            <DropdownMenu.Item 
              onSelect={() => handleSort('min')} 
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              Min Resources Usage
            </DropdownMenu.Item>
            <DropdownMenu.Item 
              onSelect={() => setData([...initialData])} 
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              Reset to Default
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filtered}
            layout="vertical"
            margin={{ left: marginLeft, right: 20, top: 10, bottom: 10 }}
            barCategoryGap={15}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tickLine={false}
              axisLine={{ stroke: '#000', strokeWidth: 1 }}
              tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={marginLeft - 20}
              tick={{ fontSize: window.innerWidth < 640 ? 12 : 14 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
              wrapperStyle={{ zIndex: 1000 }}
              isAnimationActive={false}
            />
            <Bar
              dataKey="usage"
              background={{ fill: '#EBEBEB', radius: 10 }}
            >
              {filtered.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#D9D9D9" radius={[10, 10, 10, 10]} />
              ))}
              <LabelList 
                dataKey="usage" 
                position="center" 
                formatter={(val) => `${val}%`} 
                fill="#333"
                fontSize={window.innerWidth < 640 ? 12 : 14}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}