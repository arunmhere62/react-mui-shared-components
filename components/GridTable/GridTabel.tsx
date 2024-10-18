import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid, useGridApiRef, DEFAULT_GRID_AUTOSIZE_OPTIONS, GridColDef, GridSortDirection, GridToolbar } from '@mui/x-data-grid';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
interface GridTableProps {
    columns: GridColDef[];
    rows: any[];
    loading?: boolean;
    rowHeight?: number;
    hideFooter?: boolean;
}

const GridTable: React.FC<GridTableProps> = ({ hideFooter, loading, columns, rows, rowHeight }) => {
    const theme = useTheme();
    const apiRef = useGridApiRef();
    const [includeHeaders, setIncludeHeaders] = React.useState(DEFAULT_GRID_AUTOSIZE_OPTIONS.includeHeaders);
    const [includeOutliers, setExcludeOutliers] = React.useState(DEFAULT_GRID_AUTOSIZE_OPTIONS.includeOutliers);
    const [outliersFactor, setOutliersFactor] = React.useState(String(DEFAULT_GRID_AUTOSIZE_OPTIONS.outliersFactor));
    const [expand, setExpand] = React.useState(DEFAULT_GRID_AUTOSIZE_OPTIONS.expand);

    const autosizeOptions = {
        includeHeaders,
        includeOutliers,
        outliersFactor: Number.isNaN(parseFloat(outliersFactor)) ? 1 : parseFloat(outliersFactor),
        expand,
    };

    // Create skeleton rows when loading
    const skeletonRows = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        firstName: <Skeleton variant="text" width="100%" />,
        lastName: <Skeleton variant="text" width="100%" />,
        age: <Skeleton variant="text" width="100%" />,
        email: <Skeleton variant="text" width="100%" />,
        address: <Skeleton variant="text" width="100%" />,
        switchChecked: <Skeleton variant="rectangular" width={20} height={20} />,
    }));

    return (
        <div style={{ width: '100%' }}>
            {/* <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 1 }} useFlexGap flexWrap="wrap">
                <Button
                    size='small'
                    variant="outlined"
                    onClick={() => apiRef.current.autosizeColumns(autosizeOptions)}
                >
                    Autosize columns
                </Button>
            </Stack> */}
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid

                    onCellKeyDown={(params, events) => {
                        // Allow space key and other keys
                        if (events.key === ' ') {
                            events.stopPropagation(); // Allow space key
                        } else {
                            events.stopPropagation(); // Allow space key
                            // Handle other key events if necessary
                            // events.stopPropagation();
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
                    
                    hideFooter={hideFooter}
                    autoHeight
                    pageSizeOptions={[5, 10, 25, 50]}
                    editMode='cell'
                    sortingOrder={['asc', 'desc', null] as GridSortDirection[]}
                    loading={loading}
                    rowHeight={rowHeight}
                    apiRef={apiRef}
                    density="compact"
                    rows={loading ? skeletonRows : rows} // Show skeleton rows when loading
                    // rowBufferPx={5}
                    // scrollbarSize={100}
                    slots={{
                        toolbar: GridToolbar,
                        
                    }}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5 }, // Set the initial page size to 5
                        },
                    }}
                    sx={{
                        '& .css-1vfywqf-MuiButtonBase-root-MuiButton-root': {
                            color: theme.palette.text.primary, // Change button text color inside DataGrid
                        },
                        '& .MuiDataGrid-filler': {
                            height: '0 !important', // Set height to 0
                            '--rowBorderColor': 'transparent', // Remove border color if needed
                        },
                        '& .MuiDataGrid-scrollbar': {
                            display: 'none', // Hide horizontal scrollbar
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default GridTable;
