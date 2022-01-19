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
                <GDesc>
                    플레이리스트 생성에 실패할 수 있어요.. 오류가 발생했을 때는
                    새로고침 후 다시 시도해주세요.
                </GDesc>
                <GDesc>
                    오류가 지속적으로 발생한다면 부담 갖지 말고{" "}
                    <a href="http://namecard.kakao.com/rycont">이쪽</a>
                    으로 문의 주세요!
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
