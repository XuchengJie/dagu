import React from 'react';
import { Button, Stack } from '@mui/material';

type Props = {
  name: string;
};

function DAGEditButtons({ name }: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={async () => {
          const val = window.prompt('请输入新的任务名称', '');
          if (!val) {
            return;
          }
          if (val.indexOf(' ') != -1) {
            alert('DAG name cannot contain space');
            return;
          }
          const url = `${getConfig().apiURL}/dags/${name}`;
          const resp = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'rename',
              value: val,
            }),
          });
          if (resp.ok) {
            window.location.href = `/dags/${val}`;
          } else {
            const e = await resp.text();
            alert(e);
          }
        }}
      >
        重命名
      </Button>
      <Button
        onClick={async () => {
          if (!confirm('确定删除此任务?')) {
            return;
          }
          const url = `${getConfig().apiURL}/dags/${name}`;
          const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (resp.ok) {
            window.location.href = '/dags/';
          } else {
            const e = await resp.text();
            alert(e);
          }
        }}
      >
        删除
      </Button>
    </Stack>
  );
}

export default DAGEditButtons;
