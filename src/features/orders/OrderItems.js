import { List } from 'semantic-ui-react'

export const OrderItems = ({ item }) => {
  return (
    <List.Item >{item.item.name}</List.Item>
  )
}
