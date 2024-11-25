import React from 'react';
import { Status } from '../../models';
import StatusChip from '../atoms/StatusChip';
import { Stack } from '@mui/material';
import LabeledItem from '../atoms/LabeledItem';
import { Link } from 'react-router-dom';
import moment from 'moment';

type Props = {
  status?: Status;
  name: string;
  file?: string;
};

function formatTime(time: any) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

function DAGStatusOverview({ status, name, file = '' }: Props) {
  const url = `/dags/${name}/scheduler-log?&file=${encodeURI(file)}`;
  if (!status) {
    return null;
  }
  return (
    <Stack direction="column" spacing={1}>
      <LabeledItem label="状态">
        <StatusChip status={status.Status}>{status.StatusText}</StatusChip>
      </LabeledItem>
      <LabeledItem label="请求ID">{status.RequestId}</LabeledItem>
      <LabeledItem label="开始时间">{formatTime(status.StartedAt)}</LabeledItem>
      <LabeledItem label="完成时间">{formatTime(status.FinishedAt)}</LabeledItem>
      <LabeledItem label="参数">{status.Params}</LabeledItem>
      <LabeledItem label="计划任务日志">
        <Link to={url}>{status.Log}</Link>
      </LabeledItem>
    </Stack>
  );
}
export default DAGStatusOverview;
