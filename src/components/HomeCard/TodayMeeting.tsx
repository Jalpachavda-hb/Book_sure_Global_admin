import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import TablePagination from "@mui/material/TablePagination";
import { useState, useEffect, useMemo } from "react";
import { getTodayActiveMeetings } from "../../utils/Handlerfunctions/getdata";

interface CalendlyEvent {
  id: number;
  invitee_name: string;
  invitee_email: string;
  event_start: string;
  event_end: string;
  timezone: string;
  status: string;
}

export default function Todaymeeting() {
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
     
      const res = await getTodayActiveMeetings();
      if (res?.success) {
        setEvents(res.data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Error loading events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = useMemo(() => {
    return events.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [events, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">
       Today's scheduled meeting
      </h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">

        {/* Table */}
        <div className="max-w-full overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr. No</TableCell>
                <TableCell className="columtext">Client Name</TableCell>
                <TableCell className="columtext">Email</TableCell>
                <TableCell className="columtext">Date</TableCell>
                <TableCell className="columtext">Time</TableCell>
                <TableCell className="columtext">Timezone</TableCell>
                <TableCell className="columtext">Status</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell className="text-center py-12 text-gray-500">
                    Loading bookings...
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center py-12 text-gray-500">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((event, index) => {
                  const dateObj = new Date(event.event_start);

                  return (
                    <TableRow key={event.id}>
                      <TableCell className="rowtext">
                        {page * rowsPerPage + index + 1}
                      </TableCell>

                      <TableCell className="rowtext">
                        {event.invitee_name}
                      </TableCell>

                      <TableCell className="rowtext">
                        {event.invitee_email}
                      </TableCell>

                      <TableCell className="rowtext">
                        {dateObj.toLocaleDateString()}
                      </TableCell>

                      <TableCell className="rowtext">
                        {dateObj.toLocaleTimeString()}
                      </TableCell>

                      <TableCell className="rowtext">
                        {event.timezone}
                      </TableCell>

                      <TableCell className="rowtext">
                        <Badge
                          variant="light"
                          color={
                            event.status === "active"
                              ? "success"
                              : "error"
                          }
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center w-full">
          <p className="text-sm dark:text-gray-400">
            Showing{" "}
            {events.length === 0
              ? 0
              : page * rowsPerPage + 1}
            –
            {Math.min(
              (page + 1) * rowsPerPage,
              events.length
            )}{" "}
            of {events.length} entries
          </p>

          <TablePagination
            component="div"
            count={events.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25 ,30 ,35 ,40 ,50]}
          />
        </div>
      </div>
    </div>
  );
}