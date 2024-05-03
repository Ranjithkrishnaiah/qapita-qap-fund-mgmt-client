import React, { useState, useEffect, useContext, useMemo } from "react";
import debounce from "lodash.debounce";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { User } from "../../../../pages/ManageUsers";

type UserSearchBtn = {
  setUsers: (a: User[]) => void;
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
};

export const UserSearchBtn = ({
  setUsers,
  page,
  setTotalResult,
  itemsPerPage,
}: UserSearchBtn) => {
  const [isSearchToggled, setIsSearchToggled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { getClient } = useContext(ApplicationContext);
  const service = getClient().getInvitationsService();

  const handleOnClick = () => {
    setIsSearchToggled(true);
  };

  //invokes on clicking cross icon
  const handleOnClickClose = () => {
    setSearchQuery("");
    setIsSearchToggled(false);
    //getting all invites i.e cancelling search effect

    service.getUser({ page, page_size: itemsPerPage }).then((res: any) => {
      setUsers(res.data);
      setTotalResult(res.totalCount);
    });
  };

  const suffix = (
    <CloseCircleOutlined
      style={{
        fontSize: 16,
        color: "#633ea5",
      }}
      onClick={handleOnClickClose}
    />
  );

  // debounced function.
  const onHandleChange = (searchText) => {
    if (searchText.length >= 3) {
      console.log("query", searchText);
      service
        .getUser({
          page: 1,
          page_size: itemsPerPage,
          blankSearchText: searchText,
        })
        .then((res: any) => {
          setUsers(res.data);
          setTotalResult(res.totalCount);
        });
    }
  };

  const debouncedOnHandleChange = useMemo(
    () => debounce(onHandleChange, 800),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    return () => {
      debouncedOnHandleChange.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="searchIconCont">
      {isSearchToggled ? (
        <Input
          placeholder="Search for name or email"
          onChange={(e) => debouncedOnHandleChange(e.target.value)}
          size="small"
          className="searchInput"
          suffix={suffix}
          autoFocus
        />
      ) : (
        <SearchOutlined className="searchIcon" onClick={handleOnClick} />
      )}
    </div>
  );
};
