import { Adaptor } from "myply-common"
import { Hexile } from "@haechi/flexile"
import { providers } from "constant"
import { Backdrop, PanelWrapper } from "./style"
import { ProviderItem } from "./partial"
import { GDesc } from "components"

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
                <GDesc>
                    멜론, 플로, 지니는 모바일 앱이 설치되어야 사용할 수 있어요
                </GDesc>
                {[...Array(Math.ceil(providers.length / 2))].map((_, i) => (
                    <Hexile gap={3} key={i}>
                        {[...Array(2)].map((_, j) => (
                            <ProviderItem
                                key={j}
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
