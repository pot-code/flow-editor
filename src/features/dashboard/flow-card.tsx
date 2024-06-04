import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DotsThree } from "@phosphor-icons/react"
import dayjs from "dayjs"

export interface FlowCardProps {
  id: number
  name: string
  createdAt: string
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onCopy: (id: number) => void
}

const FlowCard = memo(({ id, name, createdAt, onEdit, onDelete, onCopy }: FlowCardProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(id)
  }
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(id)
  }
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCopy(id)
  }

  return (
    <Card className="cursor-pointer hover:shadow-md" onClick={handleEdit}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">{name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <DotsThree />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleCopy}>复制</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <span className="text-destructive">删除</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenu></DropdownMenu>
          </DropdownMenu>
        </div>
        <CardDescription className="text-sm text-neutral-400">
          {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </CardDescription>
      </CardHeader>
    </Card>
  )
})

export default FlowCard
