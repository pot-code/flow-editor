import { Meta, StoryObj } from "@storybook/react"
import FlowCard from "./flow-card"

type Story = StoryObj<typeof FlowCard>

export const Basic: Story = {
  args: {
    name: "demo",
    createdAt: "2022-01-01 00:00:00",
  },
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-2">
      <FlowCard id="3" name="demo" createdAt="2022-01-01 00:00:00" />
      <FlowCard id="3" name="demo" createdAt="2022-01-01 00:00:00" />
      <FlowCard id="3" name="demo" createdAt="2022-01-01 00:00:00" />
      <FlowCard id="3" name="demo" createdAt="2022-01-01 00:00:00" />
    </div>
  ),
}

export default {
  title: "component/FlowCard",
  component: FlowCard,
} as Meta<typeof FlowCard>
