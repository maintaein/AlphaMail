import React from 'react';
import { Client } from '../../../types/clients';

interface ClientTableRowProps {
  client: Client;
  onSelect: (id: number) => void;
  onClientClick?: (client: Client) => void;
}

export const ClientTableRow: React.FC<ClientTableRowProps> = ({
  client,
  onSelect,
  onClientClick,
}) => {
  return (
    <tr className={`border-b hover:bg-gray-50 ${client.isSelected ? 'bg-blue-50' : ''}`}>
      <td className="p-4">
        <input
          type="checkbox"
          checked={client.isSelected}
          onChange={() => onSelect(client.id)}
          className="rounded border-gray-300"
        />
      </td>
      <td className="p-4">{client.id}</td>
      <td className="p-4">
        {onClientClick ? (
          <button
            onClick={() => onClientClick(client)}
            className="text-left hover:text-blue-600 hover:underline"
          >
            {client.name}
          </button>
        ) : (
          <span>{client.name}</span>
        )}
      </td>
      <td className="p-4">{client.ceo}</td>
      <td className="p-4">{client.business_no}</td>
      <td className="p-4">{client.contact}</td>
      <td className="p-4">{client.email}</td>
      <td className="p-4">{client.address}</td>
    </tr>
  );
}; 