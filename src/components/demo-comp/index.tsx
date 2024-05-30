export interface DemoCompProps {
  title: string
}

function DemoComp({ title }: DemoCompProps) {
  return <h1 className="text-blue-500">{title}</h1>
}

export default DemoComp
