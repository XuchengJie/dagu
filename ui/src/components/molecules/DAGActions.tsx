import { Box, Stack } from '@mui/material';
import React from 'react';
import { DAG, SchedulerStatus, Status } from '../../models';
import ActionButton from '../atoms/ActionButton';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faReply } from '@fortawesome/free-solid-svg-icons';
import VisuallyHidden from '../atoms/VisuallyHidden';
import StartDAGModal from './StartDAGModal';
import ConfirmModal from './ConfirmModal';
import LabeledItem from '../atoms/LabeledItem';
import { Workflow, WorkflowStatus } from '../../models/api';

type LabelProps = {
  show: boolean;
  children: React.ReactNode;
};

type Props = {
  status?: Status | WorkflowStatus;
  name: string;
  dag: DAG | Workflow;
  label?: boolean;
  redirectTo?: string;
  refresh?: () => void;
};

function Label({ show, children }: LabelProps): JSX.Element {
  if (show) return <>{children}</>;
  return <VisuallyHidden>{children}</VisuallyHidden>;
}

function DAGActions({
  status,
  name,
  dag,
  refresh,
  redirectTo,
  label = true,
}: Props) {
  const nav = useNavigate();

  const [isStartModal, setIsStartModal] = React.useState(false);
  const [isStopModal, setIsStopModal] = React.useState(false);
  const [isRetryModal, setIsRetryModal] = React.useState(false);

  const onSubmit = React.useCallback(
    async (params: {
      name: string;
      action: string;
      requestId?: string;
      params?: string;
    }) => {
      const url = `${getConfig().apiURL}/dags/${params.name}`;
      const ret = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(params),
      });
      if (redirectTo) {
        nav(redirectTo);
        refresh && refresh();
        return;
      }
      if (!ret.ok) {
        const e = await ret.text();
        alert(e || 'Failed to submit');
      }
      refresh && refresh();
    },
    [refresh]
  );

  const buttonState = React.useMemo(
    () => ({
      start: status?.Status != SchedulerStatus.Running,
      stop: status?.Status == SchedulerStatus.Running,
      retry:
        status?.Status != SchedulerStatus.Running && status?.RequestId != '',
    }),
    [status]
  );
  return (
    <Stack direction="row" spacing={2}>
      <ActionButton
        label={label}
        icon={
          <>
            <Label show={false}>开始</Label>
            <span className="icon">
              <FontAwesomeIcon icon={faPlay} />
            </span>
          </>
        }
        disabled={!buttonState['start']}
        onClick={() => setIsStartModal(true)}
      >
        {label && '开始'}
      </ActionButton>
      <ActionButton
        label={label}
        icon={
          <>
            <Label show={false}>停止</Label>
            <span className="icon">
              <FontAwesomeIcon icon={faStop} />
            </span>
          </>
        }
        disabled={!buttonState['stop']}
        onClick={() => setIsStopModal(true)}
      >
        {label && '停止'}
      </ActionButton>
      <ActionButton
        label={label}
        icon={
          <>
            <Label show={false}>重试</Label>
            <span className="icon">
              <FontAwesomeIcon icon={faReply} />
            </span>
          </>
        }
        disabled={!buttonState['retry']}
        onClick={() => setIsRetryModal(true)}
      >
        {label && '重试'}
      </ActionButton>
      <ConfirmModal
        title="Confirmation"
        buttonText="停止"
        visible={isStopModal}
        dismissModal={() => setIsStopModal(false)}
        onSubmit={() => {
          setIsStopModal(false);
          onSubmit({ name: name, action: 'stop' });
        }}
      >
        <Box>Do you really want to cancel the DAG?</Box>
      </ConfirmModal>
      <ConfirmModal
        title="Confirmation"
        buttonText="返回"
        visible={isRetryModal}
        dismissModal={() => setIsRetryModal(false)}
        onSubmit={() => {
          setIsRetryModal(false);
          onSubmit({
            name: name,
            action: 'retry',
            requestId: status?.RequestId,
          });
        }}
      >
        <Stack direction="column">
          <Box>Do you really want to rerun the last execution?</Box>
          <LabeledItem label="请求ID">{null}</LabeledItem>
          <Box>{status?.RequestId}</Box>
        </Stack>
      </ConfirmModal>
      <StartDAGModal
        dag={dag}
        visible={isStartModal}
        onSubmit={(params) => {
          setIsStartModal(false);
          onSubmit({ name: name, action: 'start', params: params });
        }}
        dismissModal={() => {
          setIsStartModal(false);
        }}
      />
    </Stack>
  );
}
export default DAGActions;
