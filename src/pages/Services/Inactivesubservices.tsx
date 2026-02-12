import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { deletesubService } from "../../utils/Handlerfunctions/formdeleteHandlers";
import { MdDelete } from "react-icons/md";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import { Badge, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getInActiveSubServiceBySlug } from "../../utils/Handlerfunctions/getdata";
import { updatesubServicesStatus } from "../../utils/Handlerfunctions/formEditHandlers";
import Swal from "sweetalert2";
/* ✅ Interface */
interface SubServiceItem {
  id: number;
  service_id: number;
  title: string;
  description: string;
  points: string[];
  is_active: number;
  image: string;
}

export default function InAtiveSubServicesTable() {
  const navigate = useNavigate();

  const { slug } = useParams();

  const [data, setData] = useState<SubServiceItem[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* ✅ Fetch Data */
  useEffect(() => {
    if (slug) {
      fetchData(slug);
    }
  }, [slug]);

  const fetchData = async (slugValue: string) => {
    const res = await getInActiveSubServiceBySlug(slugValue);

    if (res && Array.isArray(res)) {
      setData(res);
    } else {
      setData([]);
    }
  };

  /* ✅ Toggle Status */
  const handleToggleStatus = async (item: SubServiceItem) => {
    const newStatus = item.is_active === 1 ? 0 : 1;

    await updatesubServicesStatus(item.id, newStatus);

    if (slug) fetchData(slug); // ✅ reload
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
      const success = await deletesubService(id);

      if (success) {
        Swal.fire({
          title: "Deleted!",
          text: "Service has been deleted successfully ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        if (slug) fetchData(slug);
      }
    }
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

  /* ✅ Paginated Data */
  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">InActive Sub Services</h3>

      <div className="overflow-hidden rounded-2xl border bg-white px-4 pb-3 pt-4 sm:px-6">
        {/* ✅ Buttons */}
        {/* <div className="flex justify-end mb-4">
          <Button
            size="small"
            variant="contained"
            className="!bg-indigo-700 hover:!bg-indigo-900 text-white"
            onClick={() => navigate("/admin/subservices/add")}
          >
            + Add Sub-Service
          </Button>

          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
            onClick={() => navigate("/admin/Inactivesub_services")}
          >
            Show InActive Services
          </Button>
        </div> */}

        <div className="flex flex-wrap gap-2 justify-start sm:justify-end items-center">
          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
            onClick={() => navigate(-1)}
          >
            Show Active SubServices
          </Button>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr No</TableCell>
                <TableCell className="columtext">Title</TableCell>
                <TableCell className="columtext">Description</TableCell>
                <TableCell className="columtext">Image</TableCell>
                <TableCell className="columtext">Points</TableCell>
                <TableCell className="columtext">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No Sub Services Found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    {/* ✅ Sr No */}
                    <TableCell className="rowtext">
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    {/* ✅ Title */}
                    <TableCell className="rowtext">{item.title}</TableCell>

                    {/* ✅ Description */}
                    <TableCell className="rowtext max-w-[250px] whitespace-normal break-words">
                      {item.description}
                    </TableCell>

                    {/* ✅ Image */}
                    <TableCell className="rowtext">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-14 object-cover rounded border"
                      />
                    </TableCell>

                    {/* ✅ Points */}
                    <TableCell className="rowtext">
                      <ul className="list-disc ml-4 space-y-1">
                        {item.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </TableCell>

                    {/* ✅ Action */}
                    <TableCell className="rowtext">
                      {/* ✅ Status Switch */}
                      <Switch
                        checked={item.is_active === 1}
                        onChange={() => handleToggleStatus(item)}
                      />
                      <Badge color="error" className="ml-2">
                        <MdDelete
                          className="text-2xl text-red-600 cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                          title="Delete Service"
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
        <div className="mt-6 flex justify-end">
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
      </div>
    </div>
  );
}
