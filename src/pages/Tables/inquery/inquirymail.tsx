import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fetchInqueryemail } from "../../../utils/Handlerfunctions/getdata";
import { updateInqEmailStatus } from "../../../utils/Handlerfunctions/formEditHandlers";

interface ContactmailItem {
  id: number;
  email: string;
  is_active: number;
}

export default function Inquirymail() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<ContactmailItem[]>([]);

  const navigate = useNavigate();

  /* ✅ Fetch Email Data */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const emailData = await fetchInqueryemail();
      setData(emailData || []);
    } catch (error) {
      console.error("Error fetching Inquiry Emails:", error);
    }
  };

  /* ✅ Delete Email (Make Inactive with Swal Popup) */
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This email will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // ✅ API Update
        await updateInqEmailStatus(id, 0, fetchData);

        // ✅ Remove instantly from UI
        setData((prev) => prev.filter((item) => item.id !== id));

        // ✅ Swal Success
        Swal.fire({
          title: "Deleted!",
          text: "Email removed successfully ✅",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  /* ✅ Pagination */
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* ✅ Pagination Data */
  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">Quote Emails</h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* ✅ Add Button */}
        <div className="flex justify-end mb-5">
          <Button
            size="small"
            variant="contained"
            className="!bg-indigo-700 hover:!bg-indigo-900 text-white"
            onClick={() => navigate("/admin/inquiry_email/add")}
          >
            + Add New Quote Inquiry Email
          </Button>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr. No</TableCell>
                <TableCell className="columtext">Email</TableCell>
                <TableCell className="columtext">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell className="py-12 text-gray-500">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    {/* ✅ Sr No */}
                    <TableCell className="rowtext">
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    {/* ✅ Email */}
                    <TableCell className="rowtext">{item.email}</TableCell>

                    {/* ✅ Delete Icon */}
                    <TableCell className="rowtext">
                      <MdDelete
                        className="text-2xl text-red-600 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                        title="Delete Email"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Pagination */}
        <div className="mt-6 flex justify-between items-center w-full">
          <p className="text-sm dark:text-gray-400">
            Showing {data.length === 0 ? 0 : page * rowsPerPage + 1} –
            {Math.min((page + 1) * rowsPerPage, data.length)} of {data.length}{" "}
            entries
          </p>

          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Rows per page:"
            sx={{
              color: "#9CA3AF",
              ".MuiSelect-select": { color: "#9CA3AF" },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                { color: "#9CA3AF" },
              ".MuiSvgIcon-root": { color: "#9CA3AF" },
            }}
          />
        </div>
      </div>
    </div>
  );
}
