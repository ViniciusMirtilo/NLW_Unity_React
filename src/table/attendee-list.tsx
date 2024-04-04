import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table"
import { TableHeader } from "./table-header"
import { TableCell } from "./table-cell"
import { TableRow } from "./table-row"

export function AttendeeList() {
    return(
        <div className=" flex flex-col gap-4 ">
            <div className="flex gap-3 items-center">
                <h1 className=" text-2xl font-bold">Participantes</h1>
                <div className=" px-3 w-72 py-1.5 border border-white/10  rounded-lg text-sm flex items-center gap-3">
                    <Search className=" size-4 text-emerald-300"/>
                    <input className=" bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar Participante..."/>
                </div>
            </div>
            <table>
                <thead>
                            <tr className=" border-b border-white/10">
                                <TableHeader style={{width:48}}>
                                    <input type="checkbox" className=" size-4 bg-black/20 rounded border border-white/10" />
                                </TableHeader>
                                    <TableHeader>codigos</TableHeader>
                                    <TableHeader>Participantes</TableHeader>
                                    <TableHeader>Data de Inscricao</TableHeader>
                                    <TableHeader>Data do Ckeck-in</TableHeader>
                                    <TableHeader style={{width:64}}></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRow className=" border-b border-white/10 hover:bg-white/5">
                                <TableCell>
                                    <input type="checkbox" className=" size-4 bg-black/20 rounded border border-white/10"/>
                                </TableCell>
                                <TableCell>1234</TableCell>
                                <TableCell>
                                    <div className=" flex flex-col gap-1">
                                        <span className=" font-semibold text-white">Miritlo Furry</span>
                                        <span>mirtilo@email</span>
                                    </div>
                                </TableCell>
                                <TableCell>7 dias atras</TableCell>
                                <TableCell>3 dias atras</TableCell>
                                <TableCell>
                                    <IconButton transparent={true}>
                                        <MoreHorizontal className=" size-4"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </tbody>
                        <tfoot>
                            <tr>
                                <TableCell className=" py-3 px-4 text-sm text-zinc-300" colSpan={3}>
                                    Mostrando 10 de 28
                                </TableCell>
                                <TableCell  className=" py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
                                    <div className=" inline-flex items-center gap-8">

                                        <span>Pagina 1 de 23</span>

                                        <div className=" flex gap-1.5">
                                            <IconButton>
                                                <ChevronsLeft className=" size-4" / >
                                            </IconButton>

                                            <IconButton>
                                                <ChevronLeft className=" size-4" / >
                                            </IconButton>

                                            <IconButton>
                                                <ChevronRight className=" size-4" / >
                                            </IconButton>

                                            <IconButton>
                                                <ChevronsRight className=" size-4" / >
                                            </IconButton>
                                        </div>
                                    </div>
                                </TableCell >
                            </tr>
                        </tfoot>
            </table>
        </div>
    )
}