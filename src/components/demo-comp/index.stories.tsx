import { Meta, StoryObj } from "@storybook/react"
import DemoComp from "."

type Story = StoryObj<typeof DemoComp>

export const Basic: Story = {
  args: {
    title: "Hello World",
  },
}

export default {
  title: "component/DemoComp",
  component: DemoComp,
} as Meta<typeof DemoComp>
