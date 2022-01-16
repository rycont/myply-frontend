import { LoadSVG } from "components"
import React from "react"
import { LogicalInput, Wrapper } from "./style"

export const Input: React.FC<{
    icon: string
    placeholder: string
    onChange?(content: string): void
}> = (props) => {
    return (
        <Wrapper y="center" gap={3}>
            <LoadSVG
                src="/icons/link.svg"
                width={5}
                height={5}
                alt="링크 아이콘"
            />
            <LogicalInput
                placeholder={props.placeholder}
                onChange={
                    props.onChange && ((e) => props.onChange?.(e.target.value))
                }
            />
        </Wrapper>
    )
}
