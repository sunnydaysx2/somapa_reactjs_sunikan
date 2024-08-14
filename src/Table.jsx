import { useState } from 'react';
import sampleData from '../lib/sample-data.json';
import { MdEdit } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import Form from './Form';

export default function Table() {
  const [data, setData] = useState(sampleData);

  const [editData, setEditData] = useState(null);

  const handleAdd = (newData) => {
    if (editData) {
        
        setData(data.map(item =>
            item.id === editData.id ? { ...item, ...newData } : item
        ));
        setEditData(null); 
    } else {
        // Add New Data......
        const newId = data.length ? data[data.length - 1].id + 1 : 1;
        setData([...data, { id: newId, ...newData }]);
    }
};

const handleEdit = (item) => {
    setEditData(item);
};

const handleCancel = () => {
    setEditData(null); 
  };

  return (
    <div className="p-6">
       <Form addData={handleAdd} editData={editData} onCancel={handleCancel} />
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-indigo-400 text-white">
          <tr className="border-b border-gray-300 font-normal">
            <th className="py-2 px-4 text-center border-r border-gray-300">No.</th>
            <th className="py-2 px-4 text-left border-r border-gray-300"></th>
            <th className="py-2 px-4 text-left border-r border-gray-300">First Name</th>
            <th className="py-2 px-4 text-left border-r border-gray-300">Last Name</th>
            <th className="py-2 px-4 text-center border-r border-gray-300">Gender</th>
            <th className="py-2 px-4 text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 odd:bg-white even:bg-blue-100">
              <td className="py-2 px-4 border-r border-gray-300 text-center w-[100px]">{item.id}</td>
              <td className="py-2 px-4 border-r border-gray-300 text-center w-[80px]">
                <button onClick={() => handleEdit(item)}>
                  <MdEdit size={20} />
                </button>
              </td>
              <td className="py-2 px-4 border-r border-gray-300">{item.firstname}</td>
              <td className="py-2 px-4 border-r border-gray-300">{item.lastname}</td>
              <td className="py-2 px-4 border-r border-gray-300 text-center">
                {/* tooltip */}
                <span
                  data-tooltip-id="gender"
                  data-tooltip-content={item.gender === 'M' ? 'Male' : item.gender === 'F' ? 'Female' : 'Unknown'}
                  className="cursor-pointer"
                >
                  {item.gender === 'M' ? 'M' : item.gender === 'F' ? 'F' : 'U'}
                </span>
                <Tooltip
                  id="gender"
                  place="right"
                  border="1px solid rgb(129 140 248)"
                  style={{ backgroundColor: 'rgb(255 255 255)', color: '#222' }}
                />
              </td>
              <td className="py-2 px-4 text-center">{item.score.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}