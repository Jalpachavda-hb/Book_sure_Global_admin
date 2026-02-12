import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Swal from "sweetalert2";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

import { MdDelete } from "react-icons/md";

import { getInactiveServices } from "../../utils/Handlerfunctions/getdata";
import { updateServicesStatus } from "../../utils/Handlerfunctions/formEditHandlers";
import { deleteService } from "../../utils/Handlerfunctions/formdeleteHandlers";

/* ✅ Interface */
interface ServiceItem {
  id: number;
  service_name: string;
  slug: string;
  is_active: number;
}

export default function InActiveservices() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<ServiceItem[]>([]);

  const navigate = useNavigate();

  /* ✅ Fetch Inactive Services */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const serviceData = await getInactiveServices();
    setData(serviceData);
  };

  /* ✅ Toggle Active Status */
  const handleToggleStatus = async (item: ServiceItem) => {
    const newStatus = item.is_active === 1 ? 0 : 1;

    await updateServicesStatus(item.id, newStatus);

    fetchData();
  };

const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This service will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626", // red
    cancelButtonColor: "#6b7280", // gray
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  /* ✅ If User Confirms */
  if (result.isConfirmed) {
    const success = await deleteService(id);

    if (success) {
      Swal.fire({
        title: "Deleted!",
        text: "Service has been deleted successfully ✅",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData(); // ✅ Refresh Table
    }
  }
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

  /* ✅ Pagination Data */
  const filteredData = useMemo(() => data, [data]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredData, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">Inactive Services</h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* ✅ Button */}
        <div className="flex justify-end mb-4">
          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
            onClick={() => navigate("/admin/services")}
          >
            Show Active Services
          </Button>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr. No</TableCell>
                <TableCell className="columtext">Service Name</TableCell>
                <TableCell className="columtext">Slug</TableCell>
                <TableCell className="columtext">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-12 text-gray-500"
                  >
                    No inactive services available
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

                    {/* ✅ Slug */}
                    <TableCell className="rowtext">{item.slug}</TableCell>

                    {/* ✅ Action */}
                    <TableCell className="rowtext flex items-center gap-4">
                      {/* ✅ Switch Activate */}
                      <Switch
                        checked={item.is_active === 1}
                        onChange={() => handleToggleStatus(item)}
                      />

                      {/* ✅ Delete */}
                      <MdDelete
                        className="text-2xl text-red-600 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                        title="Delete Service"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Pagination */}
        <div className="mt-4 flex justify-end">
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
      </div>
    </div>
  );
}
