import React from 'react';
import { Node, Step } from '../../models';
import MultilineText from '../atoms/MultilineText';
import NodeStatusChip from '../molecules/NodeStatusChip';
import { TableCell } from '@mui/material';
import StyledTableRow from '../atoms/StyledTableRow';
import { OpenInNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import moment from 'moment';

type Props = {
  rownum: number;
  node: Node;
  file: string;
  name: string;
  onRequireModal: (step: Step) => void;
};

function formatTime(time: any) {
  let d = moment(time)
  return d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : '';
}

function NodeStatusTableRow({
  name,
  rownum,
  node,
  file,
  onRequireModal,
}: Props) {
  const url = `/dags/${name}/log?file=${file}&step=${encodeURIComponent(node.Step.Name)}`;
  const buttonStyle = {
    margin: '0px',
    padding: '0px',
    border: '0px',
    background: 'none',
    outline: 'none',
  };
  let args = '';
  if (node.Step.Args) {
    // Use uninterpolated args to avoid render issues with very long params
    args = node.Step.CmdWithArgs.replace(node.Step.Command, '').trimStart();
  }
  return (
    <StyledTableRow>
      <TableCell> {rownum} </TableCell>
      <TableCell> {node.Step.Name} </TableCell>
      <TableCell>
        <MultilineText>{node.Step.Description}</MultilineText>
      </TableCell>
      <TableCell> {node.Step.Command} </TableCell>
      <TableCell> {args} </TableCell>
      <TableCell> {formatTime(node.StartedAt)} </TableCell>
      <TableCell> {formatTime(node.FinishedAt)} </TableCell>
      <TableCell>
        <button style={buttonStyle} onClick={() => onRequireModal(node.Step)}>
          <NodeStatusChip status={node.Status}>
            {node.StatusText}
          </NodeStatusChip>
        </button>
      </TableCell>
      <TableCell> {node.Error} </TableCell>
      <TableCell>
        {node.Log ? (
          <Link to={url}>
            <OpenInNew />
          </Link>
        ) : null}
      </TableCell>
    </StyledTableRow>
  );
}
export default NodeStatusTableRow;
