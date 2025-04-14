import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({ Transactions }: { Transactions: Array<any> }) {
  if (!Transactions || Transactions.length === 0) {
    return <div>No Transactions available</div>;
  }
  if (!Array.isArray(Transactions)) {
    return <div>Invalid data format</div>;
  }
  if (Transactions.some((Transaction) => typeof Transaction !== "object")) {
    return <div>Invalid data format</div>;
  }
  if (
    Transactions.some(
      (Transaction) =>
        !Transaction.amount ||
        !Transaction.date ||
        !Transaction.type ||
        !Transaction._id
    )
  ) {
    return <div>Missing required fields in invoice data</div>;
  }
  if (
    Transactions.some(
      (Transaction) =>
        typeof Transaction.amount !== "number" ||
        typeof Transaction.date !== "string" ||
        typeof Transaction.type !== "string" ||
        typeof Transaction._id !== "string"
    )
  ) {
    return <div>Invalid data types in Transactions data</div>;
  }
  return (
    <Table>
      <TableCaption>A list of your recent Transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Transactions</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Transactions.map((Transaction) => (
          <TableRow key={Transaction._id}>
            <TableCell className="font-medium">{Transaction._id}</TableCell>
            <TableCell>{Transaction.type}</TableCell>
            <TableCell>{Transaction.date}</TableCell>
            <TableCell className="text-right">{Transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
