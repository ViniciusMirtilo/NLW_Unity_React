import { AttendeeList } from "./table/attendee-list";
import { Header } from "./table/header";

export function App() {
 return (
  <div className=" max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
    <Header />
    <AttendeeList />
  </div>
 )
}

