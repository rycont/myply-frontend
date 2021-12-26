import Image from "next/image"

export const LoadSVG: React.FC<{
    width: number
    height: number
    src: string
}> = (props) => {
    return (
        <div
            style={{
                position: "absolute",
                height: props.height + "rem",
                width: props.width + "rem",
            }}
        >
            <Image src={props.src} layout="fill" />
        </div>
    )
}
