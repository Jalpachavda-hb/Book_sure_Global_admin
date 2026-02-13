import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

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

import { getinquirymsg } from "../../../utils/Handlerfunctions/getdata";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  pricing_model: string;
}

export default function Inquery() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [tableData, setTableData] = useState<Contact[]>([]);

  /* ✅ Fetch Contact Data */
  useEffect(() => {
    const loadContacts = async () => {
      const data = await getinquirymsg();
      setTableData(Array.isArray(data) ? data : []);
    };

    loadContacts();
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
      <h3 className="text-lg font-semibold mb-5"> Quote  Inquiry</h3>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03] px-4 pb-3 pt-4 sm:px-6">
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            {/* ✅ Select Columns */}
            <FormControl size="small" sx={{ minWidth: 200 }}>
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
                sx={{
                  fontFamily: "Poppins",
                  "& .MuiSelect-select": {
                    color: "#6B7280",
                    fontWeight: 300,
                  },
                }}
              >
                {["name", "email", "phone", "message", "created_at"].map(
                  (col) => (
                    <MenuItem key={col} value={col}>
                      <Checkbox checked={selectedColumns.includes(col)} />
                      <ListItemText
                        primary={
                          {
                            name: "Name",
                            email: "Email",
                            phone: "Phone",
                            message: "Message",
                            pricing_model: "Pricing Model",
                            created_at: "Created At",
                          }[col]
                        }
                      />
                    </MenuItem>
                  ),
                )}
              </MuiSelect>
            </FormControl>
          </div>

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
        <div className="max-w-full overflow-x-auto mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr. No</TableCell>

                {isColumnVisible("name") && (
                  <TableCell className="columtext">Name</TableCell>
                )}

                {isColumnVisible("email") && (
                  <TableCell className="columtext">Email</TableCell>
                )}

                {isColumnVisible("phone") && (
                  <TableCell className="columtext">Phone</TableCell>
                )}

                {isColumnVisible("pricing_model") && (
                  <TableCell className="columtext">Pricing Model</TableCell>
                )}
                {isColumnVisible("message") && (
                  <TableCell className="columtext">Message</TableCell>
                )}
                {isColumnVisible("created_at") && (
                  <TableCell className="columtext">Created At</TableCell>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="rowtext">
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    {isColumnVisible("name") && (
                      <TableCell className="rowtext">{item.name}</TableCell>
                    )}

                    {isColumnVisible("email") && (
                      <TableCell className="rowtext">{item.email}</TableCell>
                    )}

                    {isColumnVisible("phone") && (
                      <TableCell className="rowtext">{item.phone}</TableCell>
                    )}
                    {isColumnVisible("pricing_model") && (
                      <TableCell className="rowtext">
                        {item.pricing_model}
                      </TableCell>
                    )}

                    {isColumnVisible("message") && (
                      <TableCell className="rowtext">{item.message}</TableCell>
                    )}
                    {isColumnVisible("created_at") && (
                      <TableCell className="rowtext">
                        {item.created_at}
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

        {/* ✅ Pagination Footer */}
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
