import React, { useState } from "react";
import MaterialTable from "material-table";

export const Crud = (column,  data,setData) => {
//   const [data, setData] = useState([
//     {
//       id: "1",
//       name: "Aaron Miles",
//       email: "aaron@mailinator.com",
//       role: "member"
//     },
//     {
//       id: "2",
//       name: "Aishwarya Naik",
//       email: "aishwarya@mailinator.com",
//       role: "member"
//     },
//     {
//       id: "3",
//       name: "Arvind Kumar",
//       email: "arvind@mailinator.com",
//       role: "admin"
//     },
//     {
//       id: "4",
//       name: "Caterina Binotto",
//       email: "caterina@mailinator.com",
//       role: "member"
//     },
//     {
//       id: "5",
//       name: "Chetan Kumar",
//       email: "chetan@mailinator.com",
//       role: "member"
//     },
//     {
//       id: "6",
//       name: "Jim McClain",
//       email: "jim@mailinator.com",
//       role: "member"
//     }
//   ]);
//   const [columns] = useState([
//     { title: "Id", field: "id" },
//     { title: "Name", field: "name" },
//     { title: "Email", field: "email" },
//     { title: "Role", field: "role" }
//   ]);



  return (
    <div>
      <MaterialTable
        data={data}
        columns={column}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            })
        }}
        options={{
          selection: false,
          sorting: false,
          exportButton: false,
          showTitle: false,
          search: false,
          paging: false,
          actionsColumnIndex: -1
        }}
      />
    </div>
  );
};
