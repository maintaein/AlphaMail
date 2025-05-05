import React, { useState } from 'react';
import { Client } from '../../../types/clients';
import { clientService } from '../../../services/clientService';

interface ClientDetailTemplateProps {
  client?: Client;
  onSave?: (data: Partial<Client>) => void;
  onCancel: () => void;
}

export const ClientDetailTemplate: React.FC<ClientDetailTemplateProps> = ({
  client,
  onSave,
  onCancel,
}) => {
  const [form, setForm] = useState<Partial<Client>>(client || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (client && client.id) {
        // 수정
        const updateData = {
          id: client.id,
          name: form.name || '',
          ceo: form.ceo || '',
          business_no: form.business_no || '',
          contact: form.contact || '',
          email: form.email || '',
          address: form.address || '',
          item: form.item,
          type: form.type,
          address_detail: form.address_detail,
        };
        await clientService.updateClient(String(client.id), updateData);
      } else {
        // 등록
        const createData = {
          name: form.name || '',
          ceo: form.ceo || '',
          business_no: form.business_no || '',
          contact: form.contact || '',
          email: form.email || '',
          address: form.address || '',
          item: form.item,
          type: form.type,
          address_detail: form.address_detail,
        };
        await clientService.createClient(createData);
      }
      if (onSave) onSave(form);
    } catch (error) {
      alert('저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="mb-4 font-bold">거래처 {client ? '수정' : '등록'}</h2>
      <div className="mb-2">
        <label className="block mb-1">사업자등록증 첨부</label>
        <button type="button" className="px-2 py-1 border rounded">첨부파일</button>
      </div>
      <div className="mb-2">
        <label className="block mb-1">거래처명 *</label>
        <input name="name" value={form.name || ''} onChange={handleChange} required className="w-full border p-2" placeholder="거래처명을 입력하세요." />
      </div>
      <div className="mb-2">
        <label className="block mb-1">대표자명</label>
        <input name="ceo" value={form.ceo || ''} onChange={handleChange} className="w-full border p-2" placeholder="대표자명을 입력하세요." />
      </div>
      <div className="mb-2">
        <label className="block mb-1">사업자 번호</label>
        <input name="business_no" value={form.business_no || ''} onChange={handleChange} className="w-full border p-2" placeholder="사업자 번호를 입력하세요." />
      </div>
      <div className="mb-2">
        <label className="block mb-1">전화번호</label>
        <input name="contact" value={form.contact || ''} onChange={handleChange} className="w-full border p-2" placeholder="전화번호를 입력하세요." />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Email</label>
        <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border p-2" placeholder="Email" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">주소</label>
        <input name="address" value={form.address || ''} onChange={handleChange} className="w-full border p-2" placeholder="주소" />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isSubmitting}>
          {isSubmitting ? '처리중...' : (client ? '수정' : '등록')}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded" disabled={isSubmitting}>취소</button>
      </div>
    </form>
  );
};