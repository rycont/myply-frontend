import { modalContentAtom } from "coil"
import { useRecoilState } from "recoil"
import { Button, GDesc, IRegular, Readable, Regular } from ".."
import { ModalBackdrop, ModalWrapper } from "./style"

export interface ModalContent {
    content: string
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
            onClick={() => content.dismissable || setContent(null)}
        >
            <ModalWrapper
                fillx
                padding={6}
                gap={4}
                onClick={(e) => e.preventDefault()}
            >
                <IRegular>{content.title}</IRegular>
                <Readable>{content.content}</Readable>
                {content.button && (
                    <Button onClick={content.button.action}>
                        {content.button.label}
                    </Button>
                )}
            </ModalWrapper>
        </ModalBackdrop>
    ) : (
        <>
            <></>
        </>
    )
}
