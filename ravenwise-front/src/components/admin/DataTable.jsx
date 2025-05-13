// src/components/admin/DataTable.jsx
import React from "react";

const DataTable = ({ data, columns, actions }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-400">Aucune donnée disponible</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-[#182b4a]/50">
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-3 px-4 text-left text-sm font-medium text-gray-300"
              >
                {column.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">
                Actions
              </th>
            )}
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-700">
          {data.map((item, index) => (
            <tr 
              key={item.id || index} 
              className="hover:bg-[#182b4a]/30 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={`${item.id || index}-${column.key}`}
                  className="py-3 px-4 text-sm text-gray-300"
                >
                  {item[column.key]}
                </td>
              ))}
              
              {actions && actions.length > 0 && (
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    {actions
                      .filter(action => !action.shouldShow || action.shouldShow(item))
                      .map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.handler(item)}
                          className="px-2 py-1 text-xs bg-[#1e2942] text-gray-300 rounded hover:bg-[#2b3c5e] transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;