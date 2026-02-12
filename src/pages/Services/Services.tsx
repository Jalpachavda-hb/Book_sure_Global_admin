import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { FaRegEye } from "react-icons/fa";
import Badge from "../../components/ui/badge/Badge";
import { FaEdit } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getActiveServices } from "../../utils/Handlerfunctions/getdata";
import { updateServicesStatus } from "../../utils/Handlerfunctions/formEditHandlers";

/* ✅ Correct Interface */
interface ServiceItem {
  id: number;
  service_name: string;
  slug: string;
  is_active: number;
  description: string;
}

export default function services() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<ServiceItem[]>([]);

  const navigate = useNavigate();

  /* ✅ Fetch Services Data */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const serviceData = await getActiveServices();
    setData(serviceData);
  };

  const handleEditClick = (item: ServiceItem) => {
    navigate(`/admin/services/edit/${item.id}`);
  };

  /* ✅ Toggle Active Status */
  const handleToggleStatus = async (item: ServiceItem) => {
    const newStatus = item.is_active === 1 ? 0 : 1;

    await updateServicesStatus(item.id, newStatus);

    fetchData();
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

  /* ✅ Filter + Pagination */
  const filteredData = useMemo(() => data, [data]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">Active Services</h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* ✅ Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div></div>

          <div className="flex flex-wrap gap-2 justify-start sm:justify-end items-center">
            <Button
              size="small"
              variant="contained"
              className="!bg-indigo-700 hover:!bg-indigo-900 text-white"
              onClick={() => navigate("/admin/services/add")}
            >
              + Add New Service
            </Button>

            <Button
              size="small"
              variant="contained"
              className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
              onClick={() => navigate("/admin/InactiveServices")}
            >
              Show InActive Services
            </Button>
          </div>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr. No</TableCell>
                <TableCell className="columtext">Service Name</TableCell>
                <TableCell className="columtext">Description</TableCell>
                <TableCell className="columtext">Slug</TableCell>
                <TableCell className="columtext">View</TableCell>
                <TableCell className="columtext">Status</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-12 text-gray-500"
                  >
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

                    {/* ✅ Service Name */}
                    <TableCell className="rowtext">
                      {item.service_name}
                    </TableCell>
                      <TableCell className="rowtext  max-w-[250px] whitespace-normal break-words">
                      {item.description}
                    </TableCell>

                    {/* ✅ Slug */}
                    <TableCell className="rowtext">{item.slug}</TableCell>
                    <TableCell className="rowtext">
                      <div className="flex gap-2 mt-1">
                        <Link
                          to={`/admin/subservices/${item.slug}`}
                          state={{ siteName: item.service_name }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Badge variant="light" color="success">
                            View <FaRegEye />
                          </Badge>
                        </Link>
                      </div>
                    </TableCell>
                    {/* ✅ Active Toggle */}
                    <TableCell className="rowtext">
                      <Switch
                        checked={item.is_active === 1}
                        onChange={() => handleToggleStatus(item)}
                      />
                      <Badge variant="light">
                        <FaEdit
                          className="text-2xl cursor-pointer"
                          onClick={() => handleEditClick(item)}
                        />
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Pagination */}
        <div className="mt-4 flex justify-between items-center w-full">
          <div className="w-1/2">
            <p className="text-sm dark:text-gray-400">
              Showing {filteredData.length === 0 ? 0 : page * rowsPerPage + 1}–
              {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
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
  );
}
