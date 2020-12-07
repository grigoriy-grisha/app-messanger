import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Wrapper } from "components/Modal";

import { usersService } from "store/UsersService";

import CreateDialogForm from "./CreateDialogForm";
import UsersContainer from "./UsersContainer";

const CreateDialogBlock = styled.div`
  width: 400px;
  height: 700px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  background: #fff;
  opacity: 1;
  display: flex;
  flex-direction: column;
`;

interface CreateDialogInterface {
  closeCreateDialog: () => void;
}

const CreateDialog = ({ closeCreateDialog }: CreateDialogInterface) => {
  const [addUsersIds, setUsersIds] = useState<string[]>([]);

  useEffect(() => {
    usersService.getUsers();
  }, []);

  return (
    <Wrapper>
      <CreateDialogBlock>
        <CreateDialogForm
          addUsersIds={addUsersIds}
          closeCreateDialog={closeCreateDialog}
        />
        <UsersContainer addUsersIds={addUsersIds} setUsersIds={setUsersIds} />
      </CreateDialogBlock>
      <div onClick={closeCreateDialog}>x</div>
    </Wrapper>
  );
};

export default React.memo(observer(CreateDialog));
