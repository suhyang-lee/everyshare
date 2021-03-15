import React from 'react';
import { getFormatDate } from 'utils/format';
import styled from 'styled-components';
const UserViewItem = ({ item }) => {
  return (
    <tr>
      <th>
        <input type='checkbox' name='updateChecked' />
      </th>
      <td>
        <Link href={`/view/${item.id}`}>{item[Object.keys(item)[1]]}</Link>
      </td>
      <td>{getFormatDate(item.createdAt)}</td>
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
