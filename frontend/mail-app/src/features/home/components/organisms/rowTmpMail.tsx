import React from 'react';
import { TmpMailSubject } from '../molecules/tmpMailSubject';
import { TmpMailSender } from '../molecules/tmpMailSender';
import { TmpMailRecipient } from '../molecules/tmpMailRecipient';
import { TmpMailDate } from '../molecules/tmpMailDate';
import { TmpMailAttachments } from '../molecules/tmpMailAttachments';
import { TmpMailContents } from '../molecules/tmpMailContents';

export const RowTmpMail: React.FC = () => {
  // 샘플 데이터
  const mailData = {
    subject: '[SSAFY] 디지털 회전레이저 레벨기 발주 해주세요.',
    sender: '김싸피',
    recipients: ['vostmfvostmf@naver.com', 'daumdaum005@gmail.com'],
    date: '2025/04/22 화요일 13:45:30',
    attachments: [
      { name: '[ssafy] 1분기 보고서.pdf', size: '23' }
    ],
    content: `안녕하세요
SSAFY 구매 2팀 박도아입니다 :)

디지털 회전레이저 레벨기 발주 부탁드립니다.

이전에 발송드린대로 납품 A형으로 부탁드리고요,
100개로 발주 넣어주세요.

바로 진행 부탁드립니다.

감사합니다.`
  };

  return (
    <div className="mt-3 bg-[#F6F7F7] rounded-md p-4">
      <div className="flex flex-col md:flex-row">
        {/* 왼쪽 영역: 메일 정보 */}
        <div className="md:w-1/2 pr-4 border-r border-gray-200">
          <TmpMailSubject subject={mailData.subject} />
          <TmpMailSender name={mailData.sender} />
          <TmpMailRecipient emails={mailData.recipients} />
          <TmpMailDate date={mailData.date} />
          <TmpMailAttachments attachments={mailData.attachments} />
        </div>
        
        {/* 오른쪽 영역: 메일 본문 */}
        <div className="md:w-1/2 pl-4 md:max-h-[300px]">
          <TmpMailContents content={mailData.content} />
        </div>
      </div>
    </div>
  );
};