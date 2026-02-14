import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchSoftware } from "../../utils/Handlerfunctions/getdata";
import { updateSoftwareStatus } from "../../utils/Handlerfunctions/formEditHandlers";
import Switch from "@mui/material/Switch";
interface SoftwareItem {
  id: number;
  image: string;
}

export default function Software() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<SoftwareItem[]>([]);

  // ✅ Fetch Active Software Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const softwareData = await fetchSoftware();

      console.log("Software API Data:", softwareData); // ✅ Debug

      setData(softwareData); // ✅ correct
    } catch (error) {
      console.error("Error fetching software:", error);
    }
  };

  const handleToggleStatus = async (id: number) => {
    await updateSoftwareStatus(id, 0, fetchData);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ✅ Show Data Directly (No Title Filter Issue)
  const filteredData = useMemo(() => {
    return data;
  }, [data]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page, rowsPerPage]);
  const navigate = useNavigate();
  return (
    <>
      <div className="font-poppins text-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-5">Software</h3>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-wrap gap-2 items-center"></div>

            {/* Right Column */}
            <div className="flex flex-wrap gap-2 justify-start sm:justify-end items-center">
              <Button
                size="small"
                variant="contained"
                className="!bg-indigo-700 hover:!bg-indigo-900 text-white"
                onClick={() => navigate("/admin/softwares/add")}
              >
                + Add New Software
              </Button>

              <Button
                size="small"
                variant="contained"
                className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
                onClick={() => navigate("/admin/Inactivesoftwares")}
              >
                Show InActive Software
              </Button>
            </div>
          </div>

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
                    <TableCell className="justify-between py-12 text-gray-500">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="rowtext">
                        {page * rowsPerPage + index + 1}
                      </TableCell>

                      {/* ✅ Image */}
                      <TableCell className="rowtext">
                        <img
                          src={item.image}
                          alt="software"
                          className="w-40  h-20 object-cover rounded"
                        />
                      </TableCell>

                      {/* ✅ Toggle Button */}
                      <TableCell className="rowtext">
                        {/* <Button
                          size="small"
                          variant="contained"
                          color="warning"
                          onClick={() => handleToggleStatus(item.id)}
                        >
                          Make Inactive
                        </Button> */}

                        <Switch
                          checked={true} // ✅ Active always ON
                          className="text-indigo-900"
                          onChange={() => handleToggleStatus(item.id)}
                        />
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
