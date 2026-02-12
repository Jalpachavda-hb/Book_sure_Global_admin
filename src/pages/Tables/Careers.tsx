import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { FaRegEye } from "react-icons/fa";
import {
  TextField,
  MenuItem,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { Select as MuiSelect } from "@mui/material";

import TablePagination from "@mui/material/TablePagination";
import { useState, useEffect, useMemo } from "react";

import { getcareerpage } from "../../utils/Handlerfunctions/getdata";

/* ✅ Correct Interface */
interface Career {
  id: number;
  full_name: string;
  position: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  resume: string;
  created_at: string;
}

export default function CareerDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [tableData, setTableData] = useState<Career[]>([]);

  /* ✅ Fetch Career Data */
  useEffect(() => {
    const loadCareers = async () => {
      const data = await getcareerpage();
      setTableData(Array.isArray(data) ? data : []);
    };

    loadCareers();
  }, []);

  /* ✅ Column Visibility */
  const isColumnVisible = (column: string) =>
    selectedColumns.length === 0 || selectedColumns.includes(column);

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

  /* ✅ Search Filter */
  const filteredData = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return tableData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(searchTerm),
    );
  }, [tableData, search]);

  /* ✅ Pagination Slice */
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-5">Careers Details</h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* ✅ Column Select */}
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <MuiSelect
              multiple
              value={selectedColumns}
              onChange={(e) =>
                setSelectedColumns(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value,
                )
              }
              displayEmpty
              className="bg-white dark:bg-gray-200 rounded-md"
              renderValue={() => "Select Columns"}
            >
              {[
                "full_name",
                "position",
                "email",
                "phone",
                "gender",
                "resume",
                "created_at",
              ].map((col) => (
                <MenuItem key={col} value={col}>
                  <Checkbox checked={selectedColumns.includes(col)} />
                  <ListItemText
                    primary={
                      {
                        full_name: "Name",
                        position: "Position",
                        email: "Email",
                        phone: "Phone",
                        gender: "Gender",
                        resume: "Resume",
                        created_at: "Created At",
                      }[col]
                    }
                  />
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>

          {/* ✅ Search */}
          <div className="flex justify-end">
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value.trimStart())}
              className="dark:bg-gray-200 rounded-md"
            />
          </div>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr No</TableCell>

                {isColumnVisible("full_name") && (
                  <TableCell className="columtext">Name</TableCell>
                )}

                {isColumnVisible("position") && (
                  <TableCell className="columtext">Position</TableCell>
                )}

                {isColumnVisible("email") && (
                  <TableCell className="columtext">Email</TableCell>
                )}

                {isColumnVisible("phone") && (
                  <TableCell className="columtext">Phone</TableCell>
                )}

                {isColumnVisible("gender") && (
                  <TableCell className="columtext">Gender</TableCell>
                )}

                {isColumnVisible("resume") && (
                  <TableCell className="columtext">Resume</TableCell>
                )}

                {isColumnVisible("created_at") && (
                  <TableCell className="columtext">Apply On</TableCell>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    {/* ✅ Sr No */}
                    <TableCell className="rowtext">
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    {/* ✅ Name */}
                    {isColumnVisible("full_name") && (
                      <TableCell className="rowtext">
                        {item.full_name}
                      </TableCell>
                    )}

                    {/* ✅ Position */}
                    {isColumnVisible("position") && (
                      <TableCell className="rowtext">{item.position}</TableCell>
                    )}

                    {/* ✅ Email */}
                    {isColumnVisible("email") && (
                      <TableCell className="rowtext">{item.email}</TableCell>
                    )}

                    {/* ✅ Phone */}
                    {isColumnVisible("phone") && (
                      <TableCell className="rowtext">{item.phone}</TableCell>
                    )}

                    {/* ✅ Gender */}
                    {isColumnVisible("gender") && (
                      <TableCell className="rowtext">{item.gender}</TableCell>
                    )}

                    {/* ✅ Resume File */}

                    {isColumnVisible("resume") && (
                      <TableCell className="rowtext">
                        <a
                          href={item.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                        < FaRegEye  className="text-2xl cursor-pointer"/>
                        </a>
                        
                      </TableCell>
                    )}

                    {/* ✅ Created Date */}
                    {isColumnVisible("created_at") && (
                      <TableCell className="rowtext">
                        {new Date(item.created_at).toLocaleDateString()}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center py-4 text-gray-500 font-poppins">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Pagination */}
        <div className="mt-4 flex justify-between items-center w-full">
          <p className="text-sm dark:text-gray-400">
            Showing {filteredData.length === 0 ? 0 : page * rowsPerPage + 1}–
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
