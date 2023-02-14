import React, { useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTable, useRowSelect } from "react-table";
import { DraggableTableRow } from "./DraggableTableRow";
import { StaticTableRow } from "./StaticTableRow";

export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div>
        <input type="checkbox"  ref={resolvedRef} {...rest}/>
      </div>
    );
  }
);

export function Table({ columns, data, setData }) {
  const [activeId, setActiveId] = useState();

  const items = useMemo(() => data?.map(({ id }) => id), [data]);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
        //  checkBox: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // Header: ({ getToggleAllRowsSelectedProps }) => (
          //  <div>
             // <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
           // </div>
          //),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),

        
        },
        ...columns,
      ]);
    }
  );
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData((data) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row = rows.find(({ original }) => original.id === activeId);
    prepareRow(row);
    return row;
  }, [activeId, rows, prepareRow]);

  console.log("selectedRowIds", selectedRowIds);
   console.log("selectedFlatRows", selectedFlatRows);

  // Render the UI for your table


  // ----------------------------button
  const Button = (props) => {
    const [color, setColors] = React.useState("");
    const [active, setActive] = React.useState(false);
    const handleClickButton = (name) => {
      setActive(true);
      setColors(name);
      if (active === true) {
        setActive(false);
        setColors("button");
      }
    };
  
    console.log(active);
    return (
      <button
        className={`button ${color}`}
        onClick={() => handleClickButton(props.name)}
      >
        {props.name}
      </button>
    );
  };
 
// --------------------- orignal data with the  id-------------------
  console.log("selectedFlatRows", selectedFlatRows.map(
    d => d.original
  ))
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (<DraggableTableRow key={row.original.id} row={row} />
             
              );
            })}
                    


          </SortableContext>
        </tbody>
        
      </table>






      <p>Selected Rows: {Object.keys(selectedFlatRows).length}</p>

      <pre>
        <code>
          {JSON.stringify(
            {
              // selectedRowIds: selectedRowIds,
              'selectedRowID': selectedFlatRows.map(
                d => d.original.id
              ),
            },
          
          )}
        </code>
      </pre>

      <DragOverlay>
        {activeId && (
          <table style={{ width: "100%" }}>
            <tbody>
              <StaticTableRow row={selectedRow} />
            </tbody>
          </table>
        )}
      </DragOverlay>
    </DndContext>
  );
}
