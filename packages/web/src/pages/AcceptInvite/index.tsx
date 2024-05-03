import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import { Spin } from "antd";

type AcceptInviteParams = {
  slugId: string;
  userInvitationId: string;
};

export const AcceptInvite = () => {
  const { slugId, userInvitationId }: AcceptInviteParams = useParams();
  //const { setSlugId, token } = useContext(ApplicationContext);
  const { getClient, setSlugId } = useContext(ApplicationContext);
  const [isAccepted, setIsAccepted] = useState(false);
  const client = getClient().getInvitationsService();

  //setting slugId in context
  useEffect(() => {
    setSlugId(slugId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId]);

  //invoking accept user invite
  useEffect(() => {
    client
      .acceptInvite(userInvitationId, {})
      .then(() => setIsAccepted(true))
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, userInvitationId, getClient]);

  //redirecting to the dashboard
  if (isAccepted) {
    return <Redirect exact to={`/${slugId}/dashboard`} />;
  }

  return (
    <div>
      <h2>
        Redirecting to dashboard <Spin />
      </h2>
    </div>
  );
};
