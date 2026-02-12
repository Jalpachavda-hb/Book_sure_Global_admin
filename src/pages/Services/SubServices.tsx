import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import { Button } from "@mui/material";

import { useParams, useLocation, useNavigate } from "react-router-dom";

import Badge from "../../components/ui/badge/Badge";
import { FaEdit } from "react-icons/fa";

import { getSubServiceBySlug } from "../../utils/Handlerfunctions/getdata";
import { updatesubServicesStatus } from "../../utils/Handlerfunctions/formEditHandlers";

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

export default function SubServicesTable() {
  const navigate = useNavigate();

  const { slug } = useParams();
  const location = useLocation();

  const serviceName = location.state?.siteName || slug;

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
    const res = await getSubServiceBySlug(slugValue);

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

  /* ✅ Edit */
  const handleEditClick = (item: SubServiceItem) => {
    navigate(`/admin/sub-services/edit/${item.id}`);
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

  /* ✅ Paginated Data */
  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">
        Sub Services - {serviceName}
      </h3>

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
            className="!bg-indigo-700 hover:!bg-indigo-900 text-white"
            onClick={() => navigate("/admin/subservices/add")}
          >
            + Add Sub-Service
          </Button>

          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900 text-white"
            onClick={() => navigate(`/admin/Inactivesub_services/${slug}`)}
          >
            Show InActive sub-Services
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

                      {/* ✅ Edit */}
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
