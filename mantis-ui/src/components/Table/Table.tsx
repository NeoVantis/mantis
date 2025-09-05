import React from 'react';

export interface TableColumn<T = Record<string, any>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
}

export interface TableProps<T = Record<string, any>> {
  /** Table columns configuration */
  columns: TableColumn<T>[];
  /** Table data source */
  dataSource: T[];
  /** Row key field or function */
  rowKey?: keyof T | ((record: T) => string);
  /** Whether table is loading */
  loading?: boolean;
  /** Whether table has borders */
  bordered?: boolean;
  /** Whether rows are hoverable */
  hoverable?: boolean;
  /** Whether rows are striped */
  striped?: boolean;
  /** Table size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether table is responsive */
  responsive?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Empty state content */
  emptyText?: React.ReactNode;
  /** Row click handler */
  onRowClick?: (record: T, index: number) => void;
  /** Pagination configuration */
  pagination?: boolean | {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize: number) => void;
  };
}

export const Table = <T extends Record<string, any> = Record<string, any>>({
  columns,
  dataSource,
  rowKey = 'id' as keyof T,
  loading = false,
  bordered = false,
  hoverable = true,
  striped = false,
  size = 'md',
  responsive = true,
  className = '',
  emptyText = 'No data',
  onRowClick,
  pagination = false,
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey] || index.toString();
  };

  const renderCell = (column: TableColumn<T>, record: T, index: number) => {
    const { dataIndex, render } = column;

    if (render) {
      return render(dataIndex ? (record as any)[dataIndex] : record, record, index);
    }

    if (dataIndex) {
      return (record as any)[dataIndex];
    }

    return null;
  };

  // Size classes
  const sizeClasses = {
    sm: {
      table: 'text-sm',
      cell: 'px-3 py-2',
    },
    md: {
      table: 'text-base',
      cell: 'px-4 py-3',
    },
    lg: {
      table: 'text-lg',
      cell: 'px-5 py-4',
    },
  };

  // Table base classes
  const tableClasses = [
    'w-full',
    'border-collapse',
    'border-spacing-0',
    'font-mantis',
    'bg-white',
    sizeClasses[size].table,
    ...(bordered ? ['border', 'border-gray-200'] : []),
    className,
  ].filter(Boolean).join(' ');

  // Row classes
  const getRowClasses = (index: number) => [
    'transition-colors',
    ...(onRowClick ? ['cursor-pointer'] : []),
    ...(hoverable ? ['hover:bg-gray-50'] : []),
    ...(striped && index % 2 === 1 ? ['bg-gray-50'] : []),
    ...(striped && hoverable && index % 2 === 1 ? ['hover:bg-gray-100'] : []),
  ].filter(Boolean).join(' ');

  // Cell alignment classes
  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const wrapperClasses = responsive ? 'w-full overflow-x-auto' : 'w-full';

  return (
    <div className={wrapperClasses}>
      <div className="relative w-full min-w-full">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="flex items-center gap-2">
              <svg className="animate-spin w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
              </svg>
              <span className="text-gray-600">Loading...</span>
            </div>
          </div>
        )}

        <table className={tableClasses}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={[
                    'font-semibold',
                    'text-gray-900',
                    'border-b-2',
                    'border-gray-200',
                    'relative',
                    'whitespace-nowrap',
                    sizeClasses[size].cell,
                    getAlignClass(column.align),
                    ...(bordered ? ['border-r', 'border-gray-200', 'last:border-r-0'] : []),
                  ].filter(Boolean).join(' ')}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-1">
                    {column.title}
                    {column.sortable && (
                      <span className="inline-flex items-center opacity-50 transition-opacity hover:opacity-100">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M7 14L12 9L17 14H7Z" fill="currentColor" />
                        </svg>
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {dataSource.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={[
                    'text-center',
                    'text-gray-500',
                    'border-b',
                    'border-gray-200',
                    sizeClasses[size].cell,
                  ].join(' ')}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              dataSource.map((record, index) => (
                <tr
                  key={getRowKey(record, index)}
                  className={getRowClasses(index)}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={[
                        'border-b',
                        'border-gray-200',
                        'text-gray-700',
                        'align-middle',
                        sizeClasses[size].cell,
                        getAlignClass(column.align),
                        ...(bordered ? ['border-r', 'border-gray-200', 'last:border-r-0'] : []),
                      ].filter(Boolean).join(' ')}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {pagination && dataSource.length > 0 && (
          <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {dataSource.length} items
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


