import { StyledProps } from "../../_type";

export interface Tab extends StyledProps {
  id: string
  label: React.ReactNode
  disabled?: boolean
  active?: boolean
}

export interface TabsProps extends StyledProps {
  tabs?: Tab[]
  activeId?: string
  defaultActiveId?: string
  onActive?: (tab: Tab, evt: React.SyntheticEvent) => void;
}




