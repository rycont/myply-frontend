import { Vexile } from "@haechi/flexile"
import { IRegular } from "components"
import { Adaptor } from "myply-common"
import { FixedSizeItem, ProviderItemWrapper } from "./style"

export const ProviderItem: React.FC<{
    provider: Adaptor
    onClick(d: Adaptor): void
}> = ({ provider, onClick }) => {
    if (!provider) return <Vexile fillx padding={6} />
    return (
        <ProviderItemWrapper
            y="space"
            fillx
            padding={6}
            gap={4}
            css={{ backgroundColor: provider.display.color }}
            onClick={() => onClick(provider)}
        >
            <FixedSizeItem
                dangerouslySetInnerHTML={{ __html: provider.display.logo }}
            />
            <IRegular css={{ color: "white" }}>
                {provider.display.name}
            </IRegular>
        </ProviderItemWrapper>
    )
}
