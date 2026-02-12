import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Swal from "sweetalert2";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Switch from "@mui/material/Switch";
import { MdDelete } from "react-icons/md";

import { fetchInActiveFaq } from "../../../utils/Handlerfunctions/getdata";
import { updateFaqStatus } from "../../../utils/Handlerfunctions/formEditHandlers";
import { deleteFaq } from "../../../utils/Handlerfunctions/formdeleteHandlers";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  is_active: number;
}

export default function InactiveFaq() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<FaqItem[]>([]);

  const navigate = useNavigate();

  /* ✅ Fetch FAQ Data */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const faqData = await fetchInActiveFaq();
      setData(faqData || []);
    } catch (error) {
      console.error("Error fetching FAQ:", error);
    }
  };

  /* ✅ Toggle Active / Inactive */
  const handleToggleStatus = async (id: number, status: 0 | 1) => {
    await updateFaqStatus(id, status, fetchData);
  };

  /* ✅ Delete FAQ */
const handleDelete = async (id: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This FAQ will be deleted permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const success = await deleteFaq(id);

      if (success) {
        Swal.fire("Deleted!", "FAQ has been deleted.", "success");
        fetchData(); // ✅ Refresh Table
      }
    }
  });
};
  /* ✅ Pagination */
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* ✅ Filter + Pagination */
  const filteredData = useMemo(() => data, [data]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredData, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">Inactive FAQs</h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* ✅ Buttons */}
        <div className="flex justify-end gap-3 mb-5">
        

          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
            onClick={() => navigate("/admin/faq")}
          >
            Show Active FAQ
          </Button>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr. No</TableCell>
                <TableCell className="columtext">Question</TableCell>
                <TableCell className="columtext">Answer</TableCell>
                <TableCell className="columtext">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell className="justify-between py-12 text-gray-500">
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

                    {/* ✅ Question */}
                    <TableCell className="rowtext">
                      {item.question}
                    </TableCell>

                    {/* ✅ Answer */}
                    <TableCell className="rowtext">
                      {item.answer}
                    </TableCell>

                    {/* ✅ Toggle + Delete */}
                    <TableCell className="rowtext flex gap-4 items-center">
                      {/* ✅ Status Toggle */}
                      <Switch
                        checked={item.is_active === 1}
                        onChange={() =>
                          handleToggleStatus(
                            item.id,
                            item.is_active === 1 ? 0 : 1
                          )
                        }
                      />

                      {/* ✅ Delete Icon */}
                      <MdDelete
                        className="text-2xl text-red-600 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                        title="Delete FAQ"
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
            Showing{" "}
            {filteredData.length === 0 ? 0 : page * rowsPerPage + 1} –
            {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </p>

          <TablePagination
            component="div"
            count={filteredData.length}
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
