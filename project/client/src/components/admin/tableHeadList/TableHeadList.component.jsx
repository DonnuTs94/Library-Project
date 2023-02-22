import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "author", label: "Author", minWidth: 170, align: "center" },
  { id: "category", label: "Category", minWidth: 170, align: "center" },
]
const TableHeadList = (props) => {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map((val) => (
          <TableCell
            key={val.id}
            sortDirection={orderBy === val.id ? order : false}
            align={val.align}
            style={{ minWidth: val.minWidth }}
            sx={{
              fontWeight: "bold",
              backgroundColor: "#39B5E0",
              color: "white",
            }}
          >
            <TableSortLabel
              active={orderBy === val.id}
              direction={orderBy === val.id ? order : "asc"}
              onClick={createSortHandler(val.id)}
            >
              {val.label}
              {orderBy === val.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          align="center"
          sx={{
            minWidth: 170,
            fontWeight: "bold",
            backgroundColor: "#39B5E0",
            color: "white",
          }}
        >
          Description
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 170,
            fontWeight: "bold",
            backgroundColor: "#39B5E0",
            color: "white",
          }}
        >
          Book Images
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 100,
            fontWeight: "bold",
            backgroundColor: "#39B5E0",
            color: "white",
          }}
        >
          Edit
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 100,
            fontWeight: "bold",
            backgroundColor: "#39B5E0",
            color: "white",
          }}
        >
          Delete
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeadList
