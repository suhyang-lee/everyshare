import React from "react";
import { getFormatDate } from "utils/format";
import styled from "styled-components";

const UserViewItem = ({ item, path }) => {
  return (
    <tr>
      <th>
        <input type="checkbox" name="updateChecked" />
      </th>
      <th>
        <Link
          href={
            path === "comments" ? `/view/${item.PostId}` : `/view/${item.id}`
          }
        >
          {item[Object.keys(item)[1]]}
        </Link>
      </th>
      <th>{getFormatDate(item.createdAt)}</th>
    </tr>
  );
};

const Link = styled.a`
  color: black;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default UserViewItem;
