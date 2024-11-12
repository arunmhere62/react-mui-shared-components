import React from 'react';
import { Skeleton, Grid } from '@mui/material';

// Conditional typing based on isEmpty property
export type SkeletonItem =
  | {
      id: number;
      isEmpty: 'empty'; // Mark this as an empty grid space
      xs: number; // Grid item width
    }
  | {
      id: number;
      isEmpty?: 'skeleton'; // Default to skeleton if not explicitly empty
      variant: 'rectangular' | 'text' | 'circular' | 'rounded';
      animation: 'wave' | 'pulse' | false;
      height: number;
      width?: number | string;
      borderRadius?: string;
      backgroundColor: string;
      fontSize?: string;
      xs: number; // Grid item width
      margin?: number | string; // Margin-top for the skeleton item
      padding?: number | string; // Padding for the skeleton item
    };

export interface GridConfig {
  rowSpacing: number;
  columnSpacing: number;
}

export interface SkeletonConfig {
  gridConfig: GridConfig;
  skeletonItems: SkeletonItem[]; // All items must follow the SkeletonItem type
}

interface SkeletonUiProps {
  skeletonData: SkeletonConfig;
}

const SkeletonUi: React.FC<SkeletonUiProps> = ({ skeletonData }) => {
  return (
    <Grid container rowSpacing={skeletonData.gridConfig.rowSpacing} columnSpacing={skeletonData.gridConfig.columnSpacing}>
      {skeletonData.skeletonItems.map((item) => {
        if (item.isEmpty === 'empty') {
          return <Grid item xs={item.xs} key={`empty-${item.id}`} />;
        }
        return (
          <Grid item xs={item.xs} key={item.id}>
            <Skeleton
              variant={item.variant}
              animation={item.animation}
              height={item.height}
              width={item.width}
              sx={{
                borderRadius: item.borderRadius,
                backgroundColor: item.backgroundColor,
                fontSize: item.fontSize,
                width: item.width || '100%', // Default to 100% width if not defined
                margin: item.margin, // Apply margin-top if specified
                padding: item.padding, // Apply padding if specified
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SkeletonUi;
