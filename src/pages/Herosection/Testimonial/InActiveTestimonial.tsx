import { useState, useEffect, useMemo } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { MdDelete } from "react-icons/md";
import Badge from "../../../components/ui/badge/Badge";

import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { fetchInactiveTestimonials } from "../../../utils/Handlerfunctions/getdata";
import { updateTestimonialStatus } from "../../../utils/Handlerfunctions/formEditHandlers";
import { deleteTestimonial } from "../../../utils/Handlerfunctions/formdeleteHandlers";

/* ✅ Interface */
interface TestimonialItem {
  TestimonialMasterId: number;
  TestimonialMessage: string;
  TestimonialClientName: string;
  TestimonialClientRole: string;
  TestimonialCompanyName: string;
  TestimonialCompanyType: string;
  Is_Active: number;
}

export default function InActiveTestimonial() {
  const [data, setData] = useState<TestimonialItem[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  /* ✅ Fetch Inactive Testimonials */
  const fetchData = async () => {
    try {
      const res = await fetchInactiveTestimonials();
      setData(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Error fetching inactive testimonials:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ✅ Activate Testimonial */
  const handleActivate = async (item: TestimonialItem) => {
    await updateTestimonialStatus(item.TestimonialMasterId, 1, fetchData);
  };

  /* ✅ Delete Testimonial */
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This testimonial will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteTestimonial(id);

        if (success) {
          Swal.fire("Deleted!", "Testimonial has been deleted.", "success");
          fetchData();
        }
      }
    });
  };

  /* ✅ Filter Data */
  const filteredData = useMemo(() => {
    return data;
  }, [data]);

  /* ✅ Pagination Data */
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page, rowsPerPage]);

  /* ✅ Pagination Handlers */
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">Inactive Testimonials</h3>

      {/* ✅ Header Button */}
      <div className="flex justify-end mb-4">
        <Button
          size="small"
          variant="contained"
          className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
          onClick={() => navigate("/admin/testimonial_section")}
        >
          Show Active Testimonials
        </Button>
      </div>

      {/* ✅ Table */}
      <div className="max-w-full overflow-x-auto mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="columtext">Sr No</TableCell>
              <TableCell className="columtext">Message</TableCell>
              <TableCell className="columtext">Client</TableCell>
              <TableCell className="columtext">Role</TableCell>
              <TableCell className="columtext">Company</TableCell>
              <TableCell className="columtext">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  No Inactive Testimonials Found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow key={item.TestimonialMasterId}>
                  {/* ✅ Sr No */}
                  <TableCell className="rowtext">
                    {page * rowsPerPage + index + 1}
                  </TableCell>

                  {/* ✅ Message */}
                  <TableCell className="rowtext">
                    {item.TestimonialMessage}
                  </TableCell>

                  {/* ✅ Client */}
                  <TableCell className="rowtext">
                    {item.TestimonialClientName}
                  </TableCell>

                  {/* ✅ Role */}
                  <TableCell className="rowtext">
                    {item.TestimonialClientRole}
                  </TableCell>

                  {/* ✅ Company */}
                  <TableCell className="rowtext">
                    {item.TestimonialCompanyName}
                  </TableCell>

                  {/* ✅ Actions */}
                  <TableCell className="rowtext flex gap-3 items-center">
                    {/* ✅ Activate */}
                    <Switch
                      checked={false}
                      onChange={() => handleActivate(item)}
                    />

                    {/* ✅ Delete */}
                    <Badge variant="light" color="error">
                      <MdDelete
                        className="text-2xl cursor-pointer"
                        onClick={() => handleDelete(item.TestimonialMasterId)}
                      />
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* ✅ Proper Pagination Footer */}
        <div className="mt-4 flex justify-between items-center w-full">
          {/* Left Info */}
          <div className="w-1/2">
            <p className="text-sm dark:text-gray-400">
              Showing {filteredData.length === 0 ? 0 : page * rowsPerPage + 1}–
              {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>
          </div>

          {/* Right Pagination */}
          <div className="w-1/2 flex justify-end">
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
    </div>
  );
}
