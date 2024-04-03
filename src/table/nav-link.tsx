import { ComponentProps } from "react"

//tipagem do navlinkProps
interface navlinkProps extends ComponentProps<'a'> {
    children : string
    href: string
}


//Exportar uma funcao
export function NavLink(props:navlinkProps) {
    return(
        <a {...props} href="{props.href}" className=' font-medium text-sm'>
            {props.children}
        </a>
    )
}