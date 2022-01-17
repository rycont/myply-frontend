import { Hexile } from "@haechi/flexile"
import { MouseEvent } from "react"
import { useRecoilState } from "recoil"
import { modalContentAtom } from "coil"
import { IRegular, Readable } from ".."
import { ModalBackdrop, ModalWrapper } from "./style"

export interface ModalContent {
    content: JSX.Element | string
    title: string
    button?: {
        label: string
        action(): void
    }
    dismissable?: boolean
}

export const ModalPlaceholder = () => {
    const [content, setContent] = useRecoilState(modalContentAtom)

    return content ? (
        <ModalBackdrop
            fillx
            filly
            x="center"
            y="center"
            onClick={() => content.dismissable && setContent(null)}
        >
            <ModalWrapper
                fillx
                padding={6}
                gap={4}
                onClick={(e: MouseEvent) => e.stopPropagation()}
            >
                <IRegular>{content.title}</IRegular>
                {typeof content.content === "string" ? (
                    <Readable>{content.content}</Readable>
                ) : (
                    content.content
                )}
                {content.button && (
                    <Hexile fillx x="right">
                        <IRegular onClick={content.button.action} accent>
                            {content.button.label}
                        </IRegular>
                    </Hexile>
                )}
            </ModalWrapper>
        </ModalBackdrop>
    ) : (
        <>
            <></>
        </>
    )
}
