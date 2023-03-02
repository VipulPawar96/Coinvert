import React from "react";
import { Table, Icon, Menu } from "semantic-ui-react";

const CustomTable = ({ data }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Fx(real-time)</Table.HeaderCell>
        <Table.HeaderCell>Fx(overrided)</Table.HeaderCell>
        <Table.HeaderCell>From Currency</Table.HeaderCell>
        <Table.HeaderCell>To Currency</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {data?.map((item, index) => (
        <Table.Row>
          <Table.Cell>{item.fxRealtime}</Table.Cell>
          <Table.Cell>{item.fxOverride}</Table.Cell>
          <Table.Cell positive={index === 0}>{item.fromCurrency}</Table.Cell>
          <Table.Cell positive={index === 0}>{item.toCurrency}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="4">
          <Menu floated="right" pagination>
            <Menu.Item as="a" icon>
              <Icon name="chevron left" />
            </Menu.Item>
            <Menu.Item as="a">1</Menu.Item>
            <Menu.Item as="a">2</Menu.Item>
            <Menu.Item as="a">3</Menu.Item>
            <Menu.Item as="a">4</Menu.Item>
            <Menu.Item as="a" icon>
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

export default CustomTable;
