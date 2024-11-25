import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

interface AccordionItem {
  title: string;
  content: string;
  defaultExpanded?: boolean;
}

interface ReusableAccordionProps {
  items: AccordionItem[];
}

export default function AccordionUi({ items }: ReusableAccordionProps) {
    const [expanded, setExpanded] = React.useState<string | false>(items[0]?.defaultExpanded ? 'panel0' : false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', padding: 2 }}>
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            marginBottom: 2,
            boxShadow: 'none',
            // border: '1px solid #ddd',
            borderRadius: 2,
            '&:before': {
              display: 'none', // Remove the default border-top
            },
            // '&.Mui-expanded': {
            //   backgroundColor: '#f5f5f5', // Background color when expanded
            // },
            // '&:hover': {
            //   borderColor: '#007bff', // Hover effect for border color
            // },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#007bff' }} />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              backgroundColor: '#f9f9f9', // Light background color for header
              borderBottom: '1px solid #ddd', // Divider between header and content
              padding: '12px 20px',
              '&:hover': {
                backgroundColor: '#f0f0f0', // Header hover effect
              },
            }}
          >
            <Typography
              sx={{
                width: '100%',
                fontWeight: 600,
                color: '#333',
              }}
            >
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: '16px 20px',
              backgroundColor: '#fff',
              fontSize: '14px',
              color: '#555',
            }}
          >
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
