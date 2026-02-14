import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { MdDelete } from "react-icons/md";
import Badge from "../../components/ui/badge/Badge";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";

import Swal from "sweetalert2";

import { fetchInActiveSoftware } from "../../utils/Handlerfunctions/getdata";
import { deleteSoftware } from "../../utils/Handlerfunctions/formdeleteHandlers";
import { updateSoftwareStatus } from "../../utils/Handlerfunctions/formEditHandlers";

import { useNavigate } from "react-router-dom";

interface SoftwareItem {
  id: number;
  image: string;
}

export default function InActiveSoftware() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<SoftwareItem[]>([]);
  const [_selectedColumns] = useState<string[]>([]);

  const navigate = useNavigate();

  // ✅ Fetch InActive Software Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const softwareData = await fetchInActiveSoftware();
      setData(softwareData);
    } catch (error) {
      console.error("Error fetching software:", error);
    }
  };

  // ✅ Activate Software (Inactive → Active)
  const handleToggleStatus = async (id: number) => {
    await updateSoftwareStatus(id, 1, fetchData);
  };

  // ✅ DELETE SOFTWARE FUNCTION
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This software will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteSoftware(id);

        if (success) {
          Swal.fire("Deleted!", "Software has been deleted.", "success");
          fetchData();
        }
      }
    });
  };

  // ✅ Pagination Handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ✅ Table Data Show
  const filteredData = useMemo(() => {
    return data;
  }, [data]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page, rowsPerPage]);

  return (
    <>
      <div className="font-poppins text-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-5">InActive Software</h3>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
          {/* ✅ Header Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div></div>

            <div className="flex justify-end">
              <Button
                size="small"
                variant="contained"
                className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
                onClick={() => navigate("/admin/softwares")}
              >
                Show Active Software
              </Button>
            </div>
          </div>

          {/* ✅ Table */}
          <div className="max-w-full overflow-x-auto mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="columtext">Sr. No</TableCell>
                  <TableCell className="columtext">Image</TableCell>
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

                      {/* ✅ Image */}
                      <TableCell className="rowtext">
                        <img
                          src={item.image}
                          alt="software"
                          className="w-40 h-20 object-cover rounded"
                        />
                      </TableCell>

                      {/* ✅ Toggle + Delete */}
                      <TableCell className="rowtext flex gap-3">
                        {/* ✅ Activate Toggle */}
                        <Badge variant="light" color="primary">
                          <Switch
                            checked={false}
                            color="success"
                            onChange={() => handleToggleStatus(item.id)}
                          />
                        </Badge>

                        {/* ✅ Delete Button */}
                        <Badge variant="light" color="error">
                          <MdDelete
                            className="text-2xl cursor-pointer"
                            onClick={() => handleDelete(item.id)}
                          />
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* ✅ Pagination SAME */}
          <div className="mt-4 flex justify-between items-center w-full">
            <div className="w-1/2">
              <p className="text-sm dark:text-gray-400">
                Showing {filteredData.length === 0 ? 0 : page * rowsPerPage + 1}
                –{Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
              </p>
            </div>

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
    </>
  );
}
