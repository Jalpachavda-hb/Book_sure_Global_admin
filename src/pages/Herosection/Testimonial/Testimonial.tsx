import { useEffect, useMemo, useState } from "react";
import { Modal } from "../../../components/form/form-elements/Modal";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import TextArea from "../../../components/form/input/TextArea";
import Button from "../../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import Badge from "../../../components/ui/badge/Badge";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";

import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { fetchActiveTestimonials } from "../../../utils/Handlerfunctions/getdata";

import {
  updateTestimonialStatus,
  updateTestimonial,
} from "../../../utils/Handlerfunctions/formEditHandlers";

/* ✅ Interface */
interface TestimonialItem {
  TestimonialMasterId: number;
  TestimonialMessage: string;
  TestimonialClientName: string;
  TestimonialClientRole: string;
  TestimonialCompanyName: string;
  TestimonialCompanyType: string;
  Is_Active: number;
}

export default function Testimonial() {
  const navigate = useNavigate();

  /* ✅ Table Data */
  const [data, setData] = useState<TestimonialItem[]>([]);

  /* ✅ Pagination State */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* ✅ Edit Modal State */
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<TestimonialItem | null>(null);

  /* ✅ Fetch Active Testimonials */
  const fetchData = async () => {
    const res = await fetchActiveTestimonials();
    setData(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ✅ Filter Data */
  const filteredData = useMemo(() => {
    return data;
  }, [data]);

  /* ✅ Paginated Data */
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page, rowsPerPage]);

  /* ✅ Pagination Handlers */
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;

    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleMessageChange = (val: string) => {
    if (!editData) return;

    setEditData({
      ...editData,
      TestimonialMessage: val,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* ✅ Toggle Active → Inactive */
  const handleToggleStatus = async (item: TestimonialItem) => {
    const newStatus = item.Is_Active === 1 ? 0 : 1;

    await updateTestimonialStatus(
      item.TestimonialMasterId,
      newStatus,
      fetchData,
    );
  };

  /* ✅ Open Edit Modal */
  const handleEditClick = (item: TestimonialItem) => {
    setEditData(item);
    setEditOpen(true);
  };

  /* ✅ Edit Change Input */
  // const handleEditChange = (e: any) => {
  //   setEditData((prev: any) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  /* ✅ Save Updated Testimonial */
  const handleEditSave = async () => {
    if (!editData) return;

    const payload = {
      TestimonialMessage: editData.TestimonialMessage,
      TestimonialClientName: editData.TestimonialClientName,
      TestimonialClientRole: editData.TestimonialClientRole,
      TestimonialCompanyName: editData.TestimonialCompanyName,
      TestimonialCompanyType: editData.TestimonialCompanyType,
    };

    const success = await updateTestimonial(
      editData.TestimonialMasterId,
      payload,
    );

    if (success) {
      setEditOpen(false);
      fetchData();
    }
  };

  return (
    <>
      <div className="font-poppins text-gray-800 dark:text-white">
        <h3 className="text-xl font-bold mb-5">Active Testimonials</h3>

        {/* ✅ Header Buttons */}
        <div className="flex justify-end gap-3 mb-4">
          <Button
            className="!bg-indigo-700"
            onClick={() => navigate("/admin/testimonials/add")}
          >
            + Add Testimonial
          </Button>

          <Button
            className="!bg-cyan-700"
            onClick={() => navigate("/admin/inactivetestimonial")}
          >
            Show Inactive Testimonials
          </Button>
        </div>

        {/* ✅ Table */}
        <div className="max-w-full overflow-x-auto mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="columtext">Sr No</TableCell>
                <TableCell className="columtext">Message</TableCell>
                <TableCell className="columtext">Client Name</TableCell>
                <TableCell className="columtext">Client Role</TableCell>
                <TableCell className="columtext">Company Name</TableCell>
                <TableCell className="columtext">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center">
                    No Testimonials Found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={item.TestimonialMasterId}>
                    {/* ✅ Sr No */}
                    <TableCell className="rowtext">
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    {/* ✅ Message */}
                    <TableCell className="rowtext  max-w-[250px] whitespace-normal break-words">
                      {item.TestimonialMessage}
                    </TableCell>

                    {/* ✅ Client Name */}
                    <TableCell className="rowtext">
                      {item.TestimonialClientName}
                    </TableCell>

                    {/* ✅ Client Role */}
                    <TableCell className="rowtext">
                      {item.TestimonialClientRole}
                    </TableCell>

                    {/* ✅ Company */}
                    <TableCell className="rowtext">
                      {item.TestimonialCompanyName}
                    </TableCell>

                    {/* ✅ Actions */}
                    <TableCell className="rowtext flex gap-2 items-center">
                      {/* ✅ Switch */}
                      <Switch
                        checked={item.Is_Active === 1}
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

          {/* ✅ Pagination Footer */}
          <div className="mt-4 flex justify-between items-center w-full px-4 pb-3">
            {/* Left Info */}
            <div className="w-1/2">
              <p className="text-sm dark:text-gray-400">
                Showing {filteredData.length === 0 ? 0 : page * rowsPerPage + 1}
                –{Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
              </p>
            </div>

            {/* Right Pagination */}
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

      {/* ✅ Edit Modal */}
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        className="max-w-2xl w-full p-6"
      >
        {/* ✅ Modal Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-blue-800 dark:text-white">
            Edit Testimonial
          </h2>
        </div>

        {/* ✅ Modal Form Fields */}
        <Label>Massage *</Label>
        <div className="space-y-4">
          <TextArea
            value={editData?.TestimonialMessage || ""}
            onChange={handleMessageChange}
          />
          <Label>Client Name </Label>
          <Input
            name="TestimonialClientName"
            value={editData?.TestimonialClientName || ""}
            onChange={handleInputChange}
          />
          <Label>Client Role </Label>
          <Input
            name="TestimonialClientRole"
            value={editData?.TestimonialClientRole || ""}
            onChange={handleInputChange}
          />
          <Label>Company Name</Label>
          <Input
            name="TestimonialCompanyName"
            value={editData?.TestimonialCompanyName || ""}
            onChange={handleInputChange}
          />
          <Label>Company Type</Label>
          <Input
            name="TestimonialCompanyType"
            value={editData?.TestimonialCompanyType || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* ✅ Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={() => setEditOpen(false)}
            className="!rounded-xl !px-6 !py-2"
          >
            Cancel
          </Button>

          <Button
            onClick={handleEditSave}
            className="!rounded-xl !px-8 !py-2 !bg-indigo-700 hover:!bg-indigo-900"
          >
            Save Changes
          </Button>
        </div>
      </Modal>
    </>
  );
}
