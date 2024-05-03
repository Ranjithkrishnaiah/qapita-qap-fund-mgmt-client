import React, { ReactElement, useContext, useState } from "react";
import "./reminderBtn.scss";
import { Button } from "antd";
import { ReminderArray } from "../../../../pages/ManageUsers";
import { ReminderModal } from "../../Modal/Reminder";

type ReminderButtonProps = {
  reminderArray: ReminderArray[];
  setIsReminded: (a: boolean) => void;
  setCheckAll: (a: boolean) => void;
};

export const ReminderButton = ({
  reminderArray,
  setIsReminded,
  setCheckAll,
}: ReminderButtonProps): ReactElement => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* <Button
        className="userTableBtn"
        value="large"
        onClick={() => setVisible(true)}
        ghost
      >
        Send Reminder
      </Button> */}

      <button className="sendReminderBtn" onClick={() => setVisible(true)}>
        Send Reminder
      </button>

      <ReminderModal
        visible={visible}
        setVisible={setVisible}
        onCancel={() => {
          setVisible(false);
        }}
        reminderArray={reminderArray}
        setIsReminded={setIsReminded}
        setCheckAll={setCheckAll}
      />
    </>
  );
};
