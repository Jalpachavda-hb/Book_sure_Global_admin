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
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/badge/Badge";

import { getInActivePricingModel } from "../../utils/Handlerfunctions/getdata";

import { updatePricingModelStatus } from "../../utils/Handlerfunctions/formEditHandlers";

/* ✅ Pricing Model Interface */
interface PricingModel {
  id: number;
  title: string;
  price: number;
  short_description: string;
  features: string[];
  button_text: string;
  button_link: string;
  is_featured: number;
  is_active: number;
}

export default function INActivePricingModelTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<PricingModel[]>([]);

  const navigate = useNavigate();

  /* ✅ Fetch Active Pricing Models */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const pricingData = await getInActivePricingModel();
    setData(pricingData);
  };

  /* ✅ Edit */
  const handleEditClick = (item: PricingModel) => {
    navigate(`/admin/pricing-model/edit/${item.id}`);
  };

  /* ✅ Toggle Active Status */
  const handleToggleStatus = async (item: PricingModel) => {
    const newStatus = item.is_active === 1 ? 0 : 1;

    await updatePricingModelStatus(item.id, newStatus);

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

  /* ✅ Paginated Data */
  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <div className="font-poppins text-gray-800">
      {/* ✅ Heading */}
      <h3 className="text-lg font-semibold mb-5">Active Pricing Models</h3>

      {/* ✅ Wrapper */}
      <div className="overflow-hidden rounded-2xl border bg-white px-4 pb-3 pt-4 sm:px-6">
        {/* ✅ Top Buttons */}
        <div className="flex gap-2 justify-end mb-4">
         

          <Button
            size="small"
            variant="contained"
            className="!bg-cyan-700 hover:!bg-cyan-900"
            onClick={() => navigate("/admin/pricing_model")}
          >
            Show Active Models
          </Button>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* ✅ Header */}
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr No</TableCell>
                <TableCell className="columtext">Title</TableCell>
                <TableCell className="columtext">Price</TableCell>
                <TableCell className="columtext">Short Description</TableCell>
                {/* <TableCell className="columtext">Features</TableCell>
                <TableCell className="columtext">Featured</TableCell> */}
                {/* <TableCell className="columtext">Status</TableCell> */}
                <TableCell className="columtext">Action</TableCell>
              </TableRow>
            </TableHeader>

            {/* ✅ Body */}
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    No Active Pricing Models Found
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

                    {/* ✅ Price */}
                    <TableCell className="rowtext">₹{item.price}</TableCell>

                    {/* ✅ Description */}
                    <TableCell className="rowtext">
                      {item.short_description}
                    </TableCell>

                    {/* ✅ Features */}
                    {/* <TableCell className="max-w-[250px] whitespace-normal">
                      <ul className="list-disc ml-4 space-y-1">
                        {(item.features || []).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </TableCell> */}

                    {/* ✅ Featured */}
                    {/* <TableCell>
                      {item.is_featured === 1 ? "✅ Yes" : "No"}
                    </TableCell> */}

                

                    {/* ✅ Action */}
                    <TableCell className="rowtext">
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
