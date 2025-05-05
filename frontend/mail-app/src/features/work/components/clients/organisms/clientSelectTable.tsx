import React from 'react';
import { Client } from '../../../types/clients';
import { ClientSelectTableRow } from '../molecules/clientSelectTableRow';

interface ClientSelectTableProps {
  clients: Client[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const ClientSelectTable: React.FC<ClientSelectTableProps> = ({
  clients, selectedId, onSelect
}) => (
  <table className="min-w-full border">
    <thead className="bg-gray-50">
      <tr>
        <th className="p-2"> </th>
        <th className="p-2">거래처코드</th>
        <th className="p-2">거래처명</th>
        <th className="p-2">대표자명</th>
        <th className="p-2">사업자 번호</th>
      </tr>
    </thead>
    <tbody>
      {clients.length > 0 ? (
        clients.map((client) => (
          <ClientSelectTableRow
            key={client.id}
            client={client}
            selected={selectedId === client.id}
            onSelect={onSelect}
          />
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center p-4">거래처가 없습니다.</td>
        </tr>
      )}
    </tbody>
  </table>
); 