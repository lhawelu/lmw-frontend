import { List } from 'semantic-ui-react'

export const OrderItems = ({ item }) => {
  console.log(item.item.name)
  return (
    <List.Item>{item.item.name}</List.Item>
  )
}
