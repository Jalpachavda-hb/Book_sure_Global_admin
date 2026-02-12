
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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getInactiveAssociate } from "../../utils/Handlerfunctions/getdata";
import { updateourassociateStatus } from "../../utils/Handlerfunctions/formEditHandlers";
import { deleteFounder } from "../../utils/Handlerfunctions/formdeleteHandlers";
// ✅ Interface (Full API Fields)
interface OurAssociateItem {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
  status: number;
}

export default function OurAssociate() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<OurAssociateItem[]>([]);

  const navigate = useNavigate();

  // ✅ Fetch Active Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const associateData = await getInactiveAssociate();

      console.log("Associate API Response:", associateData);

      setData(associateData); // ✅ Now only array comes
    } catch (error) {
      console.error("Error fetching associates:", error);
    }
  };
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Founder will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteFounder(id);

        if (success) {
          Swal.fire("Deleted!", "Software has been deleted.", "success");
          fetchData();
        }
      }
    });
  };
  // ✅ Toggle Status Active ↔ Inactive
  const handleToggleStatus = async (item: OurAssociateItem) => {
    const newStatus = item.status === 1 ? 0 : 1;

    await updateourassociateStatus(item.id, newStatus, fetchData);
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

  // ✅ Pagination Data
  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      {/* ✅ Heading */}
      <h3 className="text-lg font-semibold mb-5">InActive Associates </h3>

      {/* ✅ Wrapper */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* ✅ Top Buttons */}
        <div className="flex flex-wrap gap-2 justify-start sm:justify-end items-center mb-2">
          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900"
            onClick={() => navigate("/admin/our_associate")}
          >
            Show Active Associates
          </Button>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* ✅ Table Header */}
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr. No</TableCell>
                <TableCell className="columtext">Image</TableCell>
                <TableCell className="columtext">Name</TableCell>
                <TableCell className="columtext">Designation</TableCell>
                <TableCell className="columtext">Description</TableCell>
                <TableCell className="columtext">Status</TableCell>
              </TableRow>
            </TableHeader>

            {/* ✅ Table Body */}
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 rowtext">
                    No InActive Associates Found
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
                        alt="associate"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    </TableCell>

                    {/* ✅ Name */}
                    <TableCell className="rowtext">{item.name}</TableCell>

                    {/* ✅ Designation */}
                    <TableCell className="rowtext">
                      {item.designation}
                    </TableCell>

                    {/* ✅ Description */}
                    <TableCell className="rowtext">
                      {item.description}
                    </TableCell>

                    {/* ✅ Status Toggle */}
                    <TableCell className="rowtext">
                      <Switch
                        checked={item.status === 1}
                        onChange={() => handleToggleStatus(item)}
                      />
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

        {/* ✅ Pagination */}
        <div className="mt-6 flex justify-end">
          <TablePagination
            component="div"
            count={data.length}
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
