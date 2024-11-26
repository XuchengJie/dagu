import React, { CSSProperties } from 'react';
import { Step } from '../../models';
import DAGStepTableRow from './DAGStepTableRow';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import BorderedBox from '../atoms/BorderedBox';

type Props = {
  steps: Step[];
};

function DAGStepTable({ steps }: Props) {
  const tableStyle: CSSProperties = {
    tableLayout: 'fixed',
    wordWrap: 'break-word',
  };
  const styles = StepConfigTabColStyles;
  let i = 0;
  if (!steps.length) {
    return null;
  }
  return (
    <BorderedBox>
      <Table size="small" sx={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell style={styles[i++]}>名称</TableCell>
            <TableCell style={styles[i++]}>描述</TableCell>
            <TableCell style={styles[i++]}>命令</TableCell>
            <TableCell style={styles[i++]}>参数</TableCell>
            <TableCell style={styles[i++]}>目录</TableCell>
            <TableCell style={styles[i++]}>重复</TableCell>
            <TableCell style={styles[i++]}>前置条件</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {steps.map((step, idx) => (
            <DAGStepTableRow key={idx} step={step}></DAGStepTableRow>
          ))}
        </TableBody>
      </Table>
    </BorderedBox>
  );
}
export default DAGStepTable;

const StepConfigTabColStyles = [
  { maxWidth: '200px' },
  { maxWidth: '200px' },
  { maxWidth: '300px' },
  { maxWidth: '220px' },
  { maxWidth: '150px' },
  { maxWidth: '80px' },
  {},
];
