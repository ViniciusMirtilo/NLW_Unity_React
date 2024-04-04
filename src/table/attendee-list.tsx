import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table"
import { TableHeader } from "./table-header"
import { TableCell } from "./table-cell"
import { TableRow } from "./table-row"
import { ChangeEvent, useEffect, useState } from "react"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendees {
    id: string
    name: string
    email: string
    createAt: string
    checkInAt: string | null
}

export function AttendeeList() {
    const [search, setSearch] = useState(() =>{
        const url = new URL(window.location.toString())
        if (url.searchParams.has('search')){
            return url.searchParams.get('search') ?? ''
        }
        
        return ''
    })
    const [page, Setpage] = useState(() =>{
        const url = new URL(window.location.toString())
        if (url.searchParams.has('page')){
            return Number(url.searchParams.get('page'))
        }
        
        return 1
    })
    const [attendees, setAttendees] = useState<Attendees[]>([])
    const [total, setTotal] = useState(0)
    const totalPage = Math.ceil(total / 10)
    
    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

        url.searchParams.set('pageIndex', String(page - 1))

        if (search.length > 0) {
            url.searchParams.set('query' , search)
        }

        fetch(url)
        .then(Response => Response.json())
        .then(data => {
            setAttendees(data.attendees)
            setTotal(data.total)
        })
    }, [page, search])


    function setCurrentSearch(search: string){
        const url = new URL(window.location.toString())
        url.searchParams.set('search', String(search))
        window.history.pushState({}, "", url)
        setSearch(search)
    }

    function setCurrentPage(page: number){
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(page))
        window.history.pushState({}, "", url)
        Setpage(page)
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    function goToNextPage() {
        // Setpage(page + 1)
        setCurrentPage(page + 1)
        
    }
    
    function goToPreviousPage() {
        // Setpage(page - 1)
        setCurrentPage(page - 1)
    }

    function goToLastPage() {
        // Setpage(totalPage)
        setCurrentPage(totalPage)
    }

    function goToFirstPage(){
        setCurrentPage(1)
    }

    return(
        <div className=" flex flex-col gap-4 ">
            <div className="flex gap-3 items-center">
                <h1 className=" text-2xl font-bold">Participantes</h1>
                <div className=" px-3 w-72 py-1.5 border border-white/10  rounded-lg text-sm flex items-center gap-3">
                    <Search className=" size-4 text-emerald-300"/>
                    <input onChange={onSearchInputChanged} value= {search} className=" bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar Participante..."/>
                </div>
            </div>

            <div className="border border-white/10 rounded-lg">
                <table className=" w-full">
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
                                {attendees.map((attendees) =>{
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
                                            <TableCell>{attendees.checkInAt === null ? <span className=" text-zinc-400">'Nao fez check-in'</span> : dayjs().to(attendees.checkInAt)}</TableCell>
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
                                        Mostrando {attendees.length} de {total}
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
        </div>
    )
}