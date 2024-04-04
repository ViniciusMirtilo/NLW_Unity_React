import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table"
import { TableHeader } from "./table-header"
import { TableCell } from "./table-cell"
import { TableRow } from "./table-row"
import { ChangeEvent, useState } from "react"
import relativeTime from "dayjs/plugin/relativeTime"
import { attendees } from "../data/attendens"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    const [search, setSearch] = useState('')
    const [page, Setpage] = useState(1)
    const totalPage = Math.ceil(attendees.length / 10)

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    function goToNextPage() {
        Setpage(page + 1)
    }
    
    function goToPreviousPage() {
        Setpage(page - 1)
    }

    function goToLastPage() {
        Setpage(totalPage)
    }

    function goToFirstPage(){
        Setpage(1)
    }

    return(
        <div className=" flex flex-col gap-4 ">
            <div className="flex gap-3 items-center">
                <h1 className=" text-2xl font-bold">Participantes</h1>
                <div className=" px-3 w-72 py-1.5 border border-white/10  rounded-lg text-sm flex items-center gap-3">
                    <Search className=" size-4 text-emerald-300"/>
                    <input onChange={onSearchInputChanged} className=" bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar Participante..."/>
                </div>

                {search}
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
                            {attendees.slice((page - 1) * 10 , page * 10).map((attendees) =>{
                                return(
                                    <TableRow key={attendees.id} className=" border-b border-white/10 hover:bg-white/5">
                                        <TableCell>
                                            <input type="checkbox" className=" size-4 bg-black/20 rounded border border-white/10"/>
                                        </TableCell>
                                        <TableCell>{attendees.id}</TableCell>
                                        <TableCell>
                                            <div className=" flex flex-col gap-1">
                                                <span className=" font-semibold text-white">{attendees.name}</span>
                                                <span>{attendees.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{dayjs().to(attendees.createAt)}</TableCell>
                                        <TableCell>{dayjs().to(attendees.checkInAt)}</TableCell>
                                        <TableCell>
                                            <IconButton transparent={true}>
                                                <MoreHorizontal className=" size-4"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}         
                        </tbody>

                        <tfoot>
                            <tr>
                                <TableCell className=" py-3 px-4 text-sm text-zinc-300" colSpan={3}>
                                    Mostrando 10 de {attendees.length}
                                </TableCell>
                                <TableCell  className=" py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
                                    <div className=" inline-flex items-center gap-8">

                                        <span>Pagina {page} de {totalPage}</span>

                                        <div className=" flex gap-1.5">
                                            <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                                <ChevronsLeft className=" size-4" / >
                                            </IconButton>

                                            <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                                <ChevronLeft className=" size-4" / >
                                            </IconButton>

                                            <IconButton onClick={goToNextPage} disabled={page === totalPage}>
                                                <ChevronRight className=" size-4" / >
                                            </IconButton>

                                            <IconButton onClick={goToLastPage} disabled={page === totalPage}>
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