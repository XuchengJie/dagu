import { Button } from '@mui/material';
import React from 'react';

function CreateDAGButton() {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{
        width: '100px',
      }}
      onClick={async () => {
        const name = window.prompt('请输入新的任务名称', '');
        if (name === null) {
          return;
        }
        if (name === '') {
          alert('文件名称不能为空');
          return;
        }
        if (name.indexOf(' ') != -1) {
          alert('文件名称不能包含空格');
          return;
        }
        const resp = await fetch(`${getConfig().apiURL}/dags`, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'new',
            value: name,
          }),
        });
        if (resp.ok) {
          window.location.href = `/dags/${name.replace(/.yaml$/, '')}/spec`;
        } else {
          const e = await resp.text();
          alert(e);
        }
      }}
    >
      New
    </Button>
  );
}
export default CreateDAGButton;
