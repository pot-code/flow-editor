import dayjs from "dayjs"
import { DotsThree, Trash } from "@phosphor-icons/react"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardFooter } from "@nextui-org/card"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"

export interface FlowCardProps {
  id: number
  name: string
  createdAt: string
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const FlowCard = memo(({ id, name, createdAt, onEdit, onDelete }: FlowCardProps) => {
  return (
    <Card isHoverable isPressable as="div" shadow="sm" onPress={() => onEdit?.(id)}>
      <CardHeader className="justify-between">
        <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">{name}</p>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <DotsThree />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<Trash weight="duotone" />}
              onClick={() => onDelete?.(id)}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardFooter>
        <p className="text-sm text-foreground-500">{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      </CardFooter>
    </Card>
  )
})

export default FlowCard
