import React from 'react';
import { Stack, Box, Chip } from '@mui/material';
import LabeledItem from '../atoms/LabeledItem';
import { DAG } from '../../models';

type Props = {
  dag: DAG;
};

function DAGAttributes({ dag: config }: Props) {
  const preconditions = config.Preconditions?.map((c) => (
    <li>
      {c.Condition}
      {' => '}
      {c.Expected}
    </li>
  ));
  return (
    <Stack direction="column" spacing={1}>
      <LabeledItem label="名称">{config.Name}</LabeledItem>
      <LabeledItem label="计划">
        <Stack direction={'row'}>
          {config.Schedule?.map((s) => (
            <Chip
              key={s.Expression}
              sx={{
                fontWeight: 'semibold',
                marginRight: 1,
              }}
              size="small"
              label={s.Expression}
            />
          ))}
        </Stack>
      </LabeledItem>
      <LabeledItem label="描述">{config.Description}</LabeledItem>
      <LabeledItem label="最大并行数">{config.MaxActiveRuns}</LabeledItem>
      <LabeledItem label="参数">{config.Params?.join(' ')}</LabeledItem>
      <Stack direction={'column'}>
        <React.Fragment>
          <LabeledItem label="前提条件">{null}</LabeledItem>
          <Box sx={{ pl: 2 }}>
            <ul>{preconditions}</ul>
          </Box>
        </React.Fragment>
      </Stack>
    </Stack>
  );
}

export default DAGAttributes;
