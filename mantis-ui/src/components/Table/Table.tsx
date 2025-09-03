import React from 'react';
import './Table.css';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
}

export interface TableProps<T = any> {
  /** Table columns configuration */
  columns: TableColumn<T>[];
  /** Table data source */
  dataSource: T[];
  /** Row key field or function */
  rowKey?: string | ((record: T) => string);
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

export const Table = <T extends any>({
  columns,
  dataSource,
  rowKey = 'id',
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

  const baseClasses = 'mantis-table';
  const borderedClass = bordered ? 'mantis-table--bordered' : '';
  const hoverableClass = hoverable ? 'mantis-table--hoverable' : '';
  const stripedClass = striped ? 'mantis-table--striped' : '';
  const sizeClass = `mantis-table--${size}`;
  const responsiveClass = responsive ? 'mantis-table--responsive' : '';
  const loadingClass = loading ? 'mantis-table--loading' : '';

  const tableClasses = [
    baseClasses,
    borderedClass,
    hoverableClass,
    stripedClass,
    sizeClass,
    responsiveClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = responsive ? 'mantis-table-wrapper' : '';

  return (
    <div className={wrapperClasses}>
      <div className="mantis-table-container">
        <table className={tableClasses}>
          <thead className="mantis-table__head">
            <tr className="mantis-table__row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`mantis-table__header-cell mantis-table__header-cell--${column.align || 'left'}`}
                  style={{ width: column.width }}
                >
                  {column.title}
                  {column.sortable && (
                    <span className="mantis-table__sort-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 14L12 9L17 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="mantis-table__body">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="mantis-table__loading-cell">
                  <div className="mantis-table__loading">
                    <div className="mantis-animate-spin">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4" 
                          className="opacity-25"
                        />
                        <path 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          className="opacity-75"
                        />
                      </svg>
                    </div>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : dataSource.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="mantis-table__empty-cell">
                  <div className="mantis-table__empty">
                    {emptyText}
                  </div>
                </td>
              </tr>
            ) : (
              dataSource.map((record, index) => (
                <tr
                  key={getRowKey(record, index)}
                  className={`mantis-table__row ${onRowClick ? 'mantis-table__row--clickable' : ''}`}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`mantis-table__cell mantis-table__cell--${column.align || 'left'}`}
                      style={{ width: column.width }}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && dataSource.length > 0 && (
        <div className="mantis-table__pagination">
          {/* Pagination component would go here */}
          <div className="mantis-table__pagination-info">
            Showing {dataSource.length} items
          </div>
        </div>
      )}
    </div>
  );
};


