import {useState} from "react"

interface IProps {
    data: string[]
    onClick?: (index: number) => {} | void
    selected?: number
    className?: string
}

const Menu = (props: IProps) => {
    const [curIndex, setCurIndex] = useState(props.selected)
    const handleToogle = (index: number) => {
        setCurIndex(index)
    }
    const liElm = props.data.map((label, index) => (<li className={curIndex === index ? "activated" : undefined} onClick= {() => {
        handleToogle(index)
       if (props.onClick) props.onClick(index)
    }}>{label}</li>))
    return <ul className={props.className}>{liElm}</ul>
}

export default Menu