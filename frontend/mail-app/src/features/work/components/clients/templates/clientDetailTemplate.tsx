import React, { useState } from 'react';
import { Client } from '../../../types/clients';

interface ClientDetailTemplateProps {
  client?: Client;
  onSave: (data: Partial<Client>) => void;
  onCancel: () => void;
}

export const ClientDetailTemplate: React.FC<ClientDetailTemplateProps> = ({
  client,
  onSave,
  onCancel,
}) => {
  const [form, setForm] = useState<Partial<Client>>(client || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="mb-4 font-bold">거래처 등록</h2>
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
        <label className="block mb-1">품목 *</label>
        <input name="item" value={form.item || ''} onChange={handleChange} required className="w-full border p-2" placeholder="품목을 입력하세요." />
      </div>
      <div className="mb-2">
        <label className="block mb-1">업태</label>
        <input name="type" value={form.type || ''} onChange={handleChange} className="w-full border p-2" placeholder="업태를 입력하세요." />
      </div>
      <div className="mb-2">
        <label className="block mb-1">담당자 전화번호</label>
        <input name="contact" value={form.contact || ''} onChange={handleChange} className="w-full border p-2" placeholder="전화번호" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">담당자 Email</label>
        <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border p-2" placeholder="Email" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">주소</label>
        <div className="flex gap-2 mb-1">
          <input name="address" value={form.address || ''} onChange={handleChange} className="flex-1 border p-2" placeholder="주소 검색" />
          <button type="button" className="border px-2">주소검색</button>
        </div>
        <input name="address_detail" value={form.address_detail || ''} onChange={handleChange} className="w-full border p-2" placeholder="상세 주소" />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">등록</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">취소</button>
      </div>
    </form>
  );
};