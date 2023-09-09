import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({
  currentPage,
  totalPages,
  onChange,
}) {
  return (
    <Stack spacing={2} className="mt-3">
      <Pagination
        shape="rounded"
        siblingCount={1}
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onChange(page)}
        size="small"
        sx={{
          "& .MuiPagination-ul": {
            flexDirection: "row-reverse",
          },
          "& .MuiPagination-ellipsis": {
            transform: "rotateY(180deg)",
          },
        }}
      />
    </Stack>
  );
}
