import {
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  EllipsisVertical,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

// Define Props Interface
interface ColumnsProps {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsDelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValues: (values: any) => void;
}

const userColumns = ({
  setIsAddOpen,
  setIsEditing,
  setIsDelOpen,
  setValues,
  setId,
}: ColumnsProps): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => (
        <Avatar>
          <AvatarFallback>
            {(row.getValue("name") as string).charAt(0).toUpperCase()}
          </AvatarFallback>
          <AvatarImage src={row.getValue("avatar") as string} />
        </Avatar>
      ),
    },
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("_id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "NID",
      header: "NID",
      cell: ({ row }) => <div>{row.getValue("NID")}</div>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    {
      accessorKey: "active",
      header: ({ column }) => {
        return (
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("active")}</div>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                setValues!(row.original);
                setId(row.getValue("_id"));
                setIsAddOpen!(true);
                setIsEditing!(true);
              }}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit User
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setId(row.getValue("_id"));
                setIsDelOpen(true);
              }}
              className="cursor-pointer"
            >
              <Trash2 />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return columns;
};

// Props Interface
interface CustomersColumnsProps extends ColumnsProps {
  role: string;
}
const customersColumns = ({
  setIsAddOpen,
  setIsEditing,
  setIsDelOpen,
  setValues,
  setId,
  role,
}: CustomersColumnsProps): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("_id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
    },
    {
      accessorKey: "defaultItem",
      header: "Item",
      cell: ({ row }) => <div>{row.getValue("defaultItem")}</div>,
    },
    {
      accessorKey: "defaultPrice",
      header: "Price",
      cell: ({ row }) => <div>{row.getValue("defaultPrice")}</div>,
    },
    {
      accessorKey: "defaultQuantity",
      header: "Quantity",
      cell: ({ row }) => <div>{row.getValue("defaultQuantity")}</div>,
    },
    {
      accessorKey: "defaultOffDays",
      header: "Off Days",
      cell: ({ row }) => <div>{row.getValue("defaultOffDays")}</div>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
    },
    {
      accessorKey: "paymentSystem",
      header: "Payment System",
      cell: ({ row }) => <div>{row.getValue("paymentSystem")}</div>,
    },
    {
      accessorKey: "active",
      header: ({ column }) => {
        return (
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("active")}</div>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/dashboard/customers/${row.getValue("_id")}`}>
              <DropdownMenuItem className="cursor-pointer">
                <EllipsisVertical className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onClick={() => {
                setValues!(row.original);
                setId(row.getValue("_id"));
                setIsAddOpen!(true);
                setIsEditing!(true);
              }}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Customer
            </DropdownMenuItem>

            {(role === "super_admin" || role === "admin") && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setId(row.getValue("_id"));
                    setIsDelOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Trash2 />
                  Delete Customer
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return columns;
};

interface orderColumnsProps extends Partial<ColumnsProps> {
  hasAction?: boolean;
  role: string;
}
const orderColumns = ({
  setIsAddOpen,
  setIsEditing,
  setIsDelOpen,
  setValues,
  setId,
  hasAction = true,
  role,
}: orderColumnsProps): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("_id")}</div>,
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      cell: ({ row }) => <div>{row.getValue("customerId")}</div>,
    },
    {
      accessorKey: "customerName",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("customerName")}</div>,
    },
    {
      accessorKey: "customerPhone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("customerPhone")}</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => <div>{row.getValue("note")}</div>,
    },
    {
      accessorKey: "item",
      header: "Item",
      cell: ({ row }) => <div>{row.getValue("item")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>{row.getValue("price")}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => <div>{row.getValue("total")}</div>,
    },
  ];

  if (hasAction) {
    columns.push({
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setValues!(row.original);
                setId!(row.getValue("_id"));
                setIsAddOpen!(true);
                setIsEditing!(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            {(role === "super_admin" || role === "admin") && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setId!(row.getValue("_id"));
                    setIsDelOpen!(true);
                  }}
                  className="cursor-pointer"
                >
                  <Trash2 />
                  Delete Customer
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    });
  }

  return columns;
};

interface paymentColumnsProps extends Partial<ColumnsProps> {
  hasAction?: boolean;
}

const paymentColumns = ({
  setIsAddOpen,
  setIsEditing,
  setValues,
  setId,
  setIsDelOpen,
  hasAction = true,
}: paymentColumnsProps): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("_id")}</div>,
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      cell: ({ row }) => <div>{row.getValue("customerId")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "transactionDetails",
      header: "Transactions",
      cell: ({ row }) => {
        const transactionDetails = row.getValue("transactionDetails") as {
          paymentMethod: string;
        };
        return (
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">View Details</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    {transactionDetails.paymentMethod.toUpperCase()} Transaction
                    Details
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Short Descriptions.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label>Amount</Label>
                    <span className="font-medium">
                      {Number.parseFloat(row.getValue("amount")).toFixed(2)}
                    </span>
                  </div>

                  {Object.entries(transactionDetails).map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-2 items-center gap-4"
                    >
                      <Label className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <span className="font-medium text-wrap">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div>{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => <div>{row.getValue("note")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
  ];

  if (hasAction) {
    columns.push({
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setValues!(row.original);
                setId!(row.getValue("_id"));
                setIsAddOpen!(true);
                setIsEditing!(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                setId!(row.getValue("_id"));
                setIsDelOpen!(true);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    });
  }

  return columns;
};

export { userColumns, customersColumns, orderColumns, paymentColumns };
