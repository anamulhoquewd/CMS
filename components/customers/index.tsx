"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useCustomer from "@/hooks/customer";
import { useState } from "react";
import { customersColumns } from "@/components/sheared/column";
import UsersTable from "@/components/sheared/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RegistrationForm from "@/components/customers/registerForm";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DeleteAlert from "@/components/sheared/delete-alert";
import PaginationForTable from "@/components/sheared/paginationToTable";
import UserFilter from "@/components/user/users-filter";
import { getStorage } from "@/store/local";
import { decodeJwtPayload } from "@/utils/helper";

const token = getStorage("accessToken");
const decoded = decodeJwtPayload(token as string);

function Index() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    _id: false,
    defaultOffDays: false,
    paymentStatus: false,
    paymentSystem: false,
  });

  const {
    customers,
    setIsAddOpen,
    setIsDelOpen,
    setIsEditing,
    isEditing,
    setDefaultValues: setValues,
    defaultValues: values,
    setCustomerId,
    isLoading,
    createCustomer: onSubmit,
    updateCustomer: onUpdate,
    form,
    isAddOpen,
    isDelOpen,
    deleteCustomer: onDelete,
    pagination,
    setPagination,
    setSearch,
    customersCount,
    setFilterWithStatus,
  } = useCustomer();

  const columns = customersColumns({
    setIsAddOpen,
    setIsEditing,
    setIsDelOpen,
    setValues,
    setId: setCustomerId,
    role: decoded?.role,
  });

  const table = useReactTable({
    columns,
    data: customers,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },

    manualPagination: true,

    initialState: {
      pagination: {
        pageSize: pagination.page,
      },
    },
  });
  return (
    <>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatsCard
          title="Total Customers in System"
          value={String(customersCount.total)}
          description={`${customersCount.growthPercentage} from last month`}
          icon="users"
        />
        <StatsCard
          title="Active Customers in System"
          value={String(customersCount.active)}
          description={`${customersCount.activePercentage} Active Customers`}
          icon="users"
        />
        <StatsCard
          title="Customer Increments in This Month"
          value={String(customersCount.currentMonthNew)}
          description={`${String(customersCount.growth)} from last month`}
          icon="users"
        />
      </div>

      <Card className="w-full overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-2 space-y-0">
          <div className="space-y-2">
            <CardTitle>All Customers</CardTitle>
            <CardDescription>Manage and view all customers</CardDescription>
          </div>
          <UserFilter onFilterChange={setFilterWithStatus} />
          <Dialog
            open={isAddOpen}
            onOpenChange={(open) => {
              if (!open) {
                form.reset({
                  name: "",
                  phone: "",
                  address: "",
                  defaultPrice: 0,
                  defaultQuantity: 1,
                  defaultOffDays: [],
                  paymentStatus: "",
                  defaultItem: "",
                  paymentSystem: "",
                  active: true,
                });
                setValues(null);
                setCustomerId("");
                setIsEditing(false);
              }
              setIsAddOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button
                onChange={() => setIsAddOpen(true)}
                className="w-full sm:w-auto cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add new
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Customer Registration Form</DialogTitle>
                <DialogDescription>
                  Fill out the form below to complete new customer registration.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="sm:max-w-[525px] h-[65dvh] overflow-hidden pr-2 md:px-4">
                <RegistrationForm
                  form={form}
                  values={values}
                  onSubmit={isEditing ? onUpdate : onSubmit}
                  isEditing={isEditing}
                  isLoading={isLoading}
                />
                <ScrollBar orientation="vertical" className="w-2.5" />
                <ScrollBar orientation="horizontal" className="w-2.5" />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <UsersTable table={table} columns={columns} setSearch={setSearch} />
          {pagination.total > 0 && (
            <PaginationForTable
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </CardContent>
      </Card>
      <DeleteAlert
        isOpen={isDelOpen}
        setIsOpen={setIsDelOpen}
        cb={onDelete}
        setId={setCustomerId}
      />
    </>
  );
}

export default Index;
