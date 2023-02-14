import React from "react";
import styled from "styled-components";

import { Table } from "./Table";
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function MainTable() {

  
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          // {
          //   Header: "Slno",
          //   accessor: "id"
          // },
          
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },

          {
            Header: "Profile Progress",
            accessor: "progress",
          },
         
          // {
          //   width: 300,
          //   Header: "Edit",
          //   Cell: ({  }) => (
          //     <button onClick={edit()}>
          //       Edit
          //     </button>
          //   )
          // },
         
          // {
          //   Header: "Image",
          //   accessor: "imageUrl",
          //   maxWidth: 70,
          //   minWidth: 70,
          //   Cell: ({ cell: { value } }) => (
          //     <img
          //       src={"https://react-table-v7.tanstack.com/_next/static/images/logo-light-66d4dd9109004332c863391e6d1cb309.svg"}
          //       width={60} alt={"img not found"}
          //     />
          //   )
          // }
        ],
      },
      // {
      //   Header: "Info",
      //   columns: [
      //     {
      //       Header: "Age",
      //       accessor: "age"
      //     },
      //     {
      //       Header: "Visits",
      //       accessor: "visits"
      //     },
      //     {
      //       Header: "Status",
      //       accessor: "status"
      //     },
      //     {
      //       Header: "Profile Progress",
      //       accessor: "progress"
      //     }
      //   ]
      // }
    ],
    []
  );

  const [data, setData] = React.useState([
    {
      id: "1",
      firstName: "cry",
      lastName: "flower",
      age: 12,
      visits: 68,
      progress: "66%",
      
    },
    {
      id: "2",
      firstName: "M",
      lastName: "Luck",
      age: 17,
      visits: 48,
      progress: "55%",
    },
    {
      id: "3",
      firstName: "Mrs",
      lastName: "Reena",
      age: 16,
      visits: 88,
      progress: "94%",
    },
    {
      id: "4",
      firstName: "Joy",
      lastName: "Duck",
      age: 22,
      visits: 69,
      progress: "80%",
    },
    {
      id: "5",
      firstName: "Lal",
      lastName: "Mories",
      age: 23,
      visits: 13,
      progress: "30%",
    },
  ]);
  // console.log("data", data);

  // const reOrding =
  //   data &&
  //   data !== undefined &&
  //   data.map((data, index) => {

  //     return (
  //       <div key={index}>
  //         <p>{data} </p>
  //       </div>
  //     );
  //   });

  return (
    <>
      <Styles>
        <Table columns={columns} data={data} setData={setData} />
      </Styles>
      {JSON.stringify(data)}
      {/* <Crud columns={columns} data={data} setData={setData} /> */}
     
    </>
  );
}

export default MainTable;









