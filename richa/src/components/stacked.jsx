import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Search, ChevronDown } from 'lucide-react'

const data = [
  { name: 'ABC', storage: 10, networking: 20, database: 15, compute: 30, idle: 25, team: 'Team 1' },
  { name: 'DEF', storage: 15, networking: 25, database: 10, compute: 20, idle: 30, team: 'Team 1' },
  { name: 'HIJ', storage: 20, networking: 15, database: 20, compute: 25, idle: 20, team: 'Team 2' },
  { name: 'KLM', storage: 25, networking: 15, database: 30, compute: 10, idle: 20, team: 'Team 3' },
  { name: 'NOP', storage: 20, networking: 10, database: 25, compute: 20, idle: 25, team: 'Team 3' },
  { name: 'QRS', storage: 20, networking: 20, database: 10, compute: 30, idle: 20, team: 'Team 4' },
  { name: 'TUV', storage: 10, networking: 15, database: 25, compute: 25, idle: 25, team: 'Team 4' },
]

const COLORS = {
  storage: '#EAEAEA',
  networking: '#D9D9D9',
  database: '#CFCFCF',
  compute: '#BFBFBF',
  idle: '#AFAFAF',
}

function TooltipPortal({ active, payload, coordinate }) {
  if (!active || !payload?.length || !coordinate) return null

  const entry = payload[0].payload
  const compute = payload.find(p => p.dataKey === 'compute')
  const percent = compute?.value ?? 0

  const style = {
    position: 'fixed',
    top: coordinate.y + 10,
    left: coordinate.x + 10,
    zIndex: 9999,
  }

  return ReactDOM.createPortal(
    <div className="rounded-lg shadow px-4 py-3 bg-white text-sm w-52" style={style}>
      <div>Compute Cost</div>
      <div>
        <strong>{percent}%</strong>
        <span className="text-gray-400"> of overall cost</span>
      </div>
      <hr className="my-2" />
      <div className="text-gray-500 text-sm">Managed by</div>
      <div className="font-medium">👥 {entry.team}</div>
    </div>,
    document.body
  )
}

function DropdownMenuPortal({ open, anchorRef, onClose }) {
  const options = [
    'Most Overspending',
    'Most Underspending',
    'Max Resources Usage',
    'Min Resources Usage',
  ]

  if (!open || !anchorRef.current) return null

  const rect = anchorRef.current.getBoundingClientRect()

  return ReactDOM.createPortal(
    <div
      className="absolute bg-white border shadow rounded text-sm py-1"
      style={{
        top: rect.bottom + 4,
        left: rect.left,
        zIndex: 9999,
        minWidth: rect.width,
      }}
    >
      {options.map((opt) => (
        <div
          key={opt}
          className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
          onClick={onClose}
        >
          {opt}
        </div>
      ))}
    </div>,
    document.body
  )
}

export default function StackedBarChartUI() {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const filtered = data.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-[#F4F4F4] min-h-screen p-4 sm:p-6 relative">
      <DropdownMenuPortal
        open={showDropdown}
        anchorRef={dropdownRef}
        onClose={() => setShowDropdown(false)}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-xl font-semibold">Resources group</div>
            <div className="flex items-center bg-[#EBEBEB] rounded px-3 py-1 w-fit">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm flex-grow w-[100px]"
              />
              <Search size={16} className="text-gray-600" />
            </div>
          </div>

          <button
            ref={dropdownRef}
            onClick={() => setShowDropdown((prev) => !prev)}
            className="border px-3 py-1 rounded-md bg-white shadow text-sm flex items-center gap-1"
          >
            Sort By <ChevronDown size={14} />
          </button>
        </div>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filtered} barCategoryGap={30}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<TooltipPortal />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="storage" stackId="a" fill={COLORS.storage} />
              <Bar dataKey="networking" stackId="a" fill={COLORS.networking} />
              <Bar dataKey="database" stackId="a" fill={COLORS.database} />
              <Bar dataKey="compute" stackId="a" fill={COLORS.compute} />
              <Bar dataKey="idle" stackId="a" fill={COLORS.idle} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-md" style={{ background: COLORS.storage }}></span> Storage Cost</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-md" style={{ background: COLORS.networking }}></span> Networking Cost</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-md" style={{ background: COLORS.database }}></span> Database Cost</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-md" style={{ background: COLORS.compute }}></span> Compute Cost</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-md" style={{ background: COLORS.idle }}></span> Idle & Unused Resource Cost</div>
        </div>
      </div>
    </div>
  )
}