import * as React from 'react';
import { DataGrid, useGridApiRef, GridColDef, GridSortDirection, GridToolbar } from '@mui/x-data-grid';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';

interface GridTableProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  rowHeight?: number;
  hideFooter?: boolean;
  showToolbar?: boolean;
}

const GridTable: React.FC<GridTableProps> = ({ showToolbar, hideFooter, loading, columns, rows, rowHeight }) => {
  const theme = useTheme();
  const apiRef = useGridApiRef();

  // Create skeleton rows with matching column fields when loading
  const skeletonRows = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    ...columns.reduce((acc, col) => {
      acc[col.field] = <Skeleton variant="text" width="100%" />;
      return acc;
    }, {} as any),
  }));

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          onCellKeyDown={(params, events) => {
            if (events.key === ' ') {
              events.stopPropagation();
            } else {
              events.stopPropagation();
            }
          }}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          hideFooter={hideFooter}
          // autoHeight
          pageSizeOptions={[5, 10, 25, 50]}
          editMode="cell"
          sortingOrder={['asc', 'desc', null] as GridSortDirection[]}
          loading={loading}
          rowHeight={rowHeight}
          apiRef={apiRef}
          density="compact"
          rows={loading ? skeletonRows : rows} // Ensure this works as intended
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          slots={{
            toolbar: showToolbar ? GridToolbar : GridToolbar,
          }}
          sx={{
            '& .css-1vfywqf-MuiButtonBase-root-MuiButton-root': {
              color: theme.palette.text.primary,
            },
            '& .MuiDataGrid-filler': {
              height: '0 !important',
              '--rowBorderColor': 'transparent',
            },
            '& .MuiDataGrid-scrollbar': {
              display: 'none',
            },
            '& .css-h9culo-MuiDataGrid-toolbarContainer': {
              padding: '10px 5px 10px 5px',
              backgroundColor: theme.palette.background.level1,
            },
            '& .css-1yvl2ce-MuiInputBase-input-MuiInput-input': {
              fontSize: '14px',
            },
            '& .MuiDataGrid-columnHeader': {
              color: theme.palette.text.primary, // Example: Change text color of header
              fontWeight: 'bold', // Example: Make the header text bold
              marginTop : "5px",
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '14px', // Adjust font size of column header text
            },
          }}
        />
      </div>
    </div>
  );
};

export default GridTable;
