import { providers } from "constant"
import { Hexile } from "@haechi/flexile"
import { Backdrop, PanelWrapper } from "./style"
import { ProviderItem } from "./partial"
import { Adaptor } from "myply-common"

export const ProviderSelector: React.FC<{
    onClick(d: Adaptor): void
    close(): void
}> = ({ onClick, close }) => {
    return (
        <Backdrop fillx filly y="bottom" onClick={close}>
            <PanelWrapper
                padding={6}
                gap={3}
                onClick={(e) => e.stopPropagation()}
            >
                {[...Array(Math.ceil(providers.length / 2))].map((_, i) => (
                    <Hexile gap={3}>
                        {[...Array(2)].map((_, j) => (
                            <ProviderItem
                                provider={providers[i * 2 + j]}
                                onClick={onClick}
                            />
                        ))}
                    </Hexile>
                ))}
            </PanelWrapper>
        </Backdrop>
    )
}
