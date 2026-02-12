import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { FaEdit } from "react-icons/fa";
import TablePagination from "@mui/material/TablePagination";
import { Button, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/badge/Badge";
import { getActiveteam_member } from "../../utils/Handlerfunctions/getdata";
import { updateTeamStatus } from "../../utils/Handlerfunctions/formEditHandlers";
interface TeamItem {
  id: number;
  name: string;
  member_type: string;
  description: string;
  // image: string;
  is_active: number;
}

export default function Team() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<TeamItem[]>([]);
  const navigate = useNavigate();

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await getActiveteam_member();
      setData(response);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Edit
  const handleEditClick = (item: TeamItem) => {
    navigate(`/admin/team/edit/${item.id}`);
  };

  // Toggle Status
  const handleToggleStatus = async (item: TeamItem) => {
    const newStatus = item.is_active === 1 ? 0 : 1;

    const res = await updateTeamStatus(item.id, newStatus);

    if (res?.success) {
      fetchData();
    }
  };

  // Pagination
  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">Our Team Members</h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* Top Buttons */}
        <div className="flex gap-2 justify-end mb-4">
          <Button
            size="small"
            variant="contained"
            className="!bg-indigo-700 hover:!bg-indigo-900"
            onClick={() => navigate("/admin/team/add")}
          >
            + Add New Team Member
          </Button>

          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900"
            onClick={() => navigate("/admin/inactive_team")}
          >
            Show Inactive Team Members
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr No</TableCell>
                <TableCell className="columtext">Name</TableCell>
                <TableCell className="columtext">role</TableCell>

                <TableCell className="columtext">Description</TableCell>
                <TableCell className="columtext">Status</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No Associates Found ❌
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                    {/* <TableCell className="rowtext">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                        onError={(e: any) =>
                          (e.target.src =
                            "https://via.placeholder.com/80")
                        }
                      />
                    </TableCell> */}

                    <TableCell className="rowtext">{item.name}</TableCell>

                    <TableCell className="rowtext">
                      {item.member_type}
                    </TableCell>

                    <TableCell className="rowtext  max-w-[250px] whitespace-normal break-words">
                      {item.description}
                    </TableCell>

                    <TableCell className="rowtext">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.is_active === 1}
                          onChange={() => handleToggleStatus(item)}
                        />

                        <Badge variant="light">
                          <FaEdit
                            className="text-xl cursor-pointer"
                            onClick={() => handleEditClick(item)}
                          />
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-end">
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
      </div>
    </div>
  );
}
