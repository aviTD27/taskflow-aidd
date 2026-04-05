export type PriorityFilter = 'all' | 'high' | 'medium' | 'low';
export type StatusFilter = 'all' | 'active' | 'completed';
export type SortOption = 'due_asc' | 'due_desc' | 'priority';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priorityFilter: PriorityFilter;
  onPriorityChange: (priority: PriorityFilter) => void;
  statusFilter: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function TaskFilters({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange
}: TaskFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4 mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Priority Filter */}
        <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
          {['all', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => onPriorityChange(p as PriorityFilter)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                priorityFilter === p
                  ? 'bg-white text-indigo-700 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {p === 'all' ? 'All Priorities' : p}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
          {['all', 'active', 'completed'].map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s as StatusFilter)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                statusFilter === s
                  ? 'bg-white text-indigo-700 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="relative w-full xl:w-auto">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg bg-white appearance-none"
          >
            <option value="due_asc">Due Date (Ascending)</option>
            <option value="due_desc">Due Date (Descending)</option>
            <option value="priority">Priority</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
