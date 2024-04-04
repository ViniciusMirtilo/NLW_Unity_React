import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge'

interface TableCellProps extends ComponentProps<'tr'> {}

export function TableRow (props: TableCellProps){
    return(
        <tr className=" border-b border-white/10 hover:bg-white/5" {...props} />
    )
}